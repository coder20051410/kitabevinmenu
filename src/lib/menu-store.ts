import { list, put } from "@vercel/blob";
import { menuCategories, type MenuCategory } from "@/data/menu";

const MENU_DATA_BLOB_KEY = "menu-data.json";

async function readMenuFromBlob(): Promise<MenuCategory[] | null> {
  try {
    const result = await list({ prefix: MENU_DATA_BLOB_KEY, limit: 1, token: process.env.BLOB_READ_WRITE_TOKEN || undefined });
    const blob = result.blobs[0];
    if (blob) {
      const data = await fetch(blob.url, { cache: "no-store" }).then((response) => response.json());
      console.log("Menu loaded from Blob:", MENU_DATA_BLOB_KEY);
      return data as MenuCategory[];
    }
  } catch (blobError) {
    console.error("Blob read error:", blobError);
  }
  return null;
}

export async function getMenu(): Promise<MenuCategory[]> {
  const blobData = await readMenuFromBlob();
  if (blobData && Array.isArray(blobData) && blobData.length > 0) {
    return blobData;
  }
  console.log("Using default menu (no Blob data found)");
  return menuCategories;
}

export async function saveMenu(categories: MenuCategory[]): Promise<void> {
  try {
    await put(MENU_DATA_BLOB_KEY, JSON.stringify(categories, null, 2), {
      access: "public",
      token: process.env.BLOB_READ_WRITE_TOKEN || undefined,
      addRandomSuffix: false,
      contentType: "application/json",
      allowOverwrite: true,
    });
    console.log("Menu saved to Blob:", MENU_DATA_BLOB_KEY);
  } catch (error) {
    console.error("Failed to save menu to Blob:", error);
    throw new Error(`Failed to save menu to Blob: ${error instanceof Error ? error.message : String(error)}`);
  }
}
