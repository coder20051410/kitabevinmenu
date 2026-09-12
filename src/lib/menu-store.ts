import { promises as fs } from "node:fs";
import path from "node:path";
import { list, put } from "@vercel/blob";
import { menuCategories, type MenuCategory, type MenuItem } from "@/data/menu";
import { getSupabaseServer } from "@/lib/supabase-server";

export type MenuOverrides = Record<string, {
  title?: string;
  items?: Record<string, Partial<MenuItem>>;
}>;

const storePath = path.join(process.cwd(), ".data", "menu-overrides.json");

async function readOverrides(): Promise<MenuOverrides> {
  // Try Blob first (OIDC works automatically in Vercel)
  try {
    const result = await list({ prefix: "menu-overrides.json", limit: 1 });
    const blob = result.blobs[0];
    if (blob) {
      return (await fetch(blob.url, { cache: "no-store" }).then((response) => response.json())) as MenuOverrides;
    }
  } catch (blobError) {
    console.error("Blob read error, falling back to local filesystem:", blobError);
  }

  // Fallback to local filesystem (for local development or if Blob is empty)
  try {
    return JSON.parse(await fs.readFile(storePath, "utf8")) as MenuOverrides;
  } catch {
    return {};
  }
}

export async function getMenu(): Promise<MenuCategory[]> {
  const supabase = getSupabaseServer();
  if (supabase) {
    const { data: categories, error } = await supabase
      .from("categories")
      .select("id, title, icon, sort_order, menu_items(*)")
      .order("sort_order");
    if (!error && categories?.length) {
      return categories.map((category) => ({
        id: category.id as string,
        title: category.title as string,
        icon: (category.icon as string | null) ?? undefined,
        items: ((category.menu_items as Array<Record<string, unknown>>) ?? [])
          .sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
          .map((item) => ({
            name: item.name as string,
            price: Number(item.price),
            image: (item.image_url as string | null) ?? undefined,
            tags: (item.tags as MenuItem["tags"]) ?? [],
          })),
      }));
    }
  }
  const overrides = await readOverrides();
  return menuCategories.map((category) => {
    const categoryOverride = overrides[category.id];
    return {
      ...category,
      title: categoryOverride?.title ?? category.title,
      items: category.items.map((item) => ({
        ...item,
        ...(categoryOverride?.items?.[item.name] ?? {}),
      })),
    };
  });
}

export async function saveOverrides(overrides: MenuOverrides) {
  // Try Blob first (OIDC works automatically in Vercel)
  try {
    await put("menu-overrides.json", JSON.stringify(overrides, null, 2), {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
    return;
  } catch (blobError) {
    console.error("Blob write error, falling back to local filesystem:", blobError);
  }

  // Fallback to local filesystem (for local development)
  try {
    await fs.mkdir(path.dirname(storePath), { recursive: true });
    await fs.writeFile(storePath, JSON.stringify(overrides, null, 2), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "EROFS") {
      throw new Error("Cannot save menu overrides: read-only filesystem. Please configure Vercel Blob connection.");
    }
    throw error;
  }
}

export async function updateMenu(categories: MenuCategory[]) {
  const supabase = getSupabaseServer();
  if (supabase) {
    for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex += 1) {
      const category = categories[categoryIndex];
      const original = menuCategories[categoryIndex];
      if (!original) continue;
      const categoryResult = await supabase
        .from("categories")
        .upsert({ id: category.id, title: category.title, sort_order: categoryIndex }, { onConflict: "id" });
      if (categoryResult.error) throw new Error(categoryResult.error.message);

      const existing = await supabase
        .from("menu_items")
        .select("id")
        .eq("category_id", category.id)
        .order("sort_order");
      if (existing.error) throw new Error(existing.error.message);
      for (let itemIndex = 0; itemIndex < category.items.length; itemIndex += 1) {
        const item = category.items[itemIndex];
        const itemId = existing.data?.[itemIndex]?.id;
        const result = await supabase.from("menu_items").upsert({
          ...(itemId ? { id: itemId } : {}),
          category_id: category.id,
          name: item.name,
          price: item.price,
          image_url: item.image || null,
          tags: item.tags ?? [],
          sort_order: itemIndex,
          updated_at: new Date().toISOString(),
        });
        if (result.error) throw new Error(result.error.message);
      }
    }
    return;
  }

  const overrides: MenuOverrides = {};
  for (const category of categories) {
    const original = menuCategories.find((item) => item.id === category.id);
    if (!original) continue;
    const categoryOverride: MenuOverrides[string] = {};
    if (category.title !== original.title) categoryOverride.title = category.title;
    const items: Record<string, Partial<MenuItem>> = {};
    category.items.forEach((item, index) => {
      const originalItem = original.items[index];
      if (!originalItem) return;
      const changes: Partial<MenuItem> = {};
      if (item.name !== originalItem.name) changes.name = item.name;
      if (item.price !== originalItem.price) changes.price = item.price;
      if (item.image !== originalItem.image) changes.image = item.image;
      if (Object.keys(changes).length) items[originalItem.name] = changes;
    });
    if (Object.keys(items).length) categoryOverride.items = items;
    if (Object.keys(categoryOverride).length) overrides[category.id] = categoryOverride;
  }
  await saveOverrides(overrides);
}
