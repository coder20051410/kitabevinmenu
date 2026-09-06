import { menuCategories, type MenuCategory, type MenuItem, type MenuTag } from "@/data/menu";

const POPULAR_NAMES = new Set([
  "bookcafe burger + kartof fri",
  "iskəndər",
  "tiramisu",
  "mərakeş çayı",
  "spanish latte",
  "ailə menyusu (1 ədəd 32sm pizza + 2 kartof fri + 2 naqets + 4 burger [2 toyuq, 2 ət] + 4 içki)",
]);

const NEW_NAMES = new Set([
  "matcha latte",
  "till the end",
  "barbie",
  "blue star",
  "mognoliya çiyələk",
  "mognoliya caramel brownie",
]);

const VEGETARIAN_KEYWORDS = [
  "pendirli",
  "margarita",
  "fincan çay",
  "çaynik çay",
  "kartof fri",
  "künəfə sadə",
  "dondurma",
  "kruassan",
  "muffin",
  "waffle",
  "hot chocolate",
  "türk qəhvəsi",
  "ayran",
  "meyvə şirəsi",
  "cola",
  "fanta",
  "pepsi",
  "sprite",
  "lipton",
  "fuse tea",
];

function inferTags(item: MenuItem, categoryId: string): MenuTag[] {
  const tags: MenuTag[] = [...(item.tags ?? [])];
  const lower = item.name.toLowerCase();

  if (item.note === "set" && !tags.includes("popular")) tags.push("popular");
  if (lower.includes("acılı") && !tags.includes("spicy")) tags.push("spicy");
  if (POPULAR_NAMES.has(lower) && !tags.includes("popular")) tags.push("popular");
  if (NEW_NAMES.has(lower) && !tags.includes("new")) tags.push("new");

  const isVegetarian =
    VEGETARIAN_KEYWORDS.some((k) => lower.includes(k)) &&
    !lower.includes("toyuq") &&
    !lower.includes("ət") &&
    !lower.includes("tuna") &&
    !lower.includes("sucuk") &&
    !lower.includes("qiymə");

  if (isVegetarian && !tags.includes("vegetarian")) tags.push("vegetarian");

  if (categoryId === "salads" && !lower.includes("tuna") && !lower.includes("toyuq")) {
    if (!tags.includes("vegetarian")) tags.push("vegetarian");
  }

  return tags;
}

function enrichItem(item: MenuItem, categoryId: string): MenuItem {
  const tags = inferTags(item, categoryId);
  const image = item.image;

  return { ...item, tags, image };
}

export function getEnrichedMenu(): MenuCategory[] {
  return menuCategories.map((category) => ({
    ...category,
    items: category.items.map((item) => enrichItem(item, category.id)),
  }));
}

export const enrichedMenuCategories = getEnrichedMenu();
