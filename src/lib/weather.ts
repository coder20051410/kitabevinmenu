const BAKU_LAT = 40.4093;
const BAKU_LON = 49.8671;

export async function getBakuTemperature(): Promise<number | null> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${BAKU_LAT}&longitude=${BAKU_LON}&current=temperature_2m`,
      { next: { revalidate: 1800 } } // 30 dəqiqə cache
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data?.current?.temperature_2m ?? null;
  } catch {
    return null;
  }
}

export function getCategoryPriorityByTemp(temp: number | null): string[] {
  if (temp === null) return [];
  if (temp >= 24) {
    // İsti — soyuq içkilər/desertlər yuxarı
    return ["cold-coffee", "cold-drinks", "milkshake", "desserts"];
  }
  if (temp <= 10) {
    // Soyuq — isti içkilər/şorbalar yuxarı
    return ["hot-coffee", "teas", "soups", "kebab-doner"];
  }
  return []; // Orta temperatur — sıralamaya toxunma
}
