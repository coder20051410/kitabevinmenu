const UNSPLASH_BY_CATEGORY: Record<string, string> = {
  burgers: "1568901346375-23c9450c58cd",
  "kebab-doner": "1529008758122-109a7467b9f0",
  shawarma: "1626700051175-6811343f0900",
  pide: "1517248135467-4c7edcad34c4",
  lahmacun: "1565299624946-b28f40a0ae38",
  pizza: "1513104830137-7c03ea6599e0",
  salads: "1512621776951-a57141f2eefd",
  soups: "1547592166-23ac45744acd",
  breakfast: "1533089861089-751a477da4f5",
  teas: "1556677413-1996830818e7",
  "cold-coffee": "1461023058943-94f2c4deb988",
  "hot-coffee": "1495474472287-4d71bcdd2085",
  milkshake: "1572490191228-1041164ee546",
  cocktails: "1544145941-f73a2c556a48",
  "cold-drinks": "1622483767028-59d66b3c7b39",
  desserts: "1565958011703-44f9829a187c",
  "diet-desserts": "1565958011703-44f9829a187c",
  "lunch-combo": "1504674900247-0877df9cc836",
};

const CATEGORY_EMOJI: Record<string, string> = {
  burgers: "🍔",
  "kebab-doner": "🥙",
  shawarma: "🌯",
  pide: "🫓",
  lahmacun: "🥟",
  pizza: "🍕",
  salads: "🥗",
  soups: "🍲",
  breakfast: "🍳",
  teas: "🍵",
  "cold-coffee": "🧊",
  "hot-coffee": "☕",
  milkshake: "🥤",
  cocktails: "🍹",
  "cold-drinks": "🧃",
  desserts: "🍰",
  "diet-desserts": "🥗",
  "lunch-combo": "🍽️",
};

const CATEGORY_GRADIENT: Record<string, string> = {
  burgers: "from-amber-100 to-orange-50",
  "kebab-doner": "from-orange-100 to-amber-50",
  shawarma: "from-yellow-100 to-orange-50",
  pide: "from-amber-50 to-yellow-100",
  lahmacun: "from-red-50 to-orange-100",
  pizza: "from-red-100 to-orange-50",
  salads: "from-green-100 to-emerald-50",
  soups: "from-orange-50 to-amber-100",
  breakfast: "from-yellow-50 to-amber-100",
  teas: "from-green-50 to-emerald-100",
  "cold-coffee": "from-sky-50 to-blue-100",
  "hot-coffee": "from-amber-100 to-yellow-50",
  milkshake: "from-pink-50 to-purple-100",
  cocktails: "from-cyan-50 to-teal-100",
  "cold-drinks": "from-blue-50 to-sky-100",
  desserts: "from-pink-100 to-rose-50",
  "diet-desserts": "from-lime-50 to-green-100",
  "lunch-combo": "from-amber-100 to-yellow-50",
};

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[ə]/g, "e")
    .replace(/[ı]/g, "i")
    .replace(/[ö]/g, "o")
    .replace(/[ü]/g, "u")
    .replace(/[ç]/g, "c")
    .replace(/[ş]/g, "s")
    .replace(/[ğ]/g, "g")
    .replace(/\+/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

export function getLocalImagePath(name: string, categoryId?: string): string {
  const suffix = categoryId ? `${categoryId}-${slugify(name)}` : slugify(name);
  return `/images/menu/${suffix}.jpg`;
}

export function getUnsplashUrl(categoryId: string, seed?: string): string {
  const photoId = UNSPLASH_BY_CATEGORY[categoryId] ?? UNSPLASH_BY_CATEGORY.burgers;
  const base = `https://images.unsplash.com/photo-${photoId}`;
  const params = new URLSearchParams({
    w: "400",
    h: "300",
    fit: "crop",
    q: "80",
    auto: "format",
  });
  if (seed) params.set("sig", seed.slice(0, 8));
  return `${base}?${params.toString()}`;
}

export function getCategoryEmoji(categoryId: string): string {
  return CATEGORY_EMOJI[categoryId] ?? "🍽️";
}

export function getCategoryGradient(categoryId: string): string {
  return CATEGORY_GRADIENT[categoryId] ?? "from-paper-dark to-paper";
}

export function resolveItemImage(
  categoryId: string,
  name: string,
  customImage?: string
): { primary: string; fallback: string; local: string } {
  const local = getLocalImagePath(name, categoryId);
  const fallback = getUnsplashUrl(categoryId, `${categoryId}-${slugify(name)}`);
  const primary = customImage ?? local;
  return { primary, fallback, local };
}

/** Tiny blur placeholder for next/image */
export const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAn/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAD8AVIAP/9k=";
