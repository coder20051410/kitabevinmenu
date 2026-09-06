import type { LucideIcon } from "lucide-react";
import {
  Beef,
  BookOpen,
  Cake,
  Coffee,
  Cookie,
  Droplets,
  Egg,
  GlassWater,
  Leaf,
  Pizza,
  Salad,
  Sandwich,
  Snowflake,
  Soup,
  UtensilsCrossed,
  Wine,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  burgers: Sandwich,
  "kebab-doner": Beef,
  shawarma: UtensilsCrossed,
  pide: BookOpen,
  lahmacun: Pizza,
  pizza: Pizza,
  salads: Salad,
  soups: Soup,
  breakfast: Egg,
  teas: Leaf,
  "cold-coffee": Snowflake,
  "hot-coffee": Coffee,
  milkshake: GlassWater,
  cocktails: Wine,
  "cold-drinks": Droplets,
  desserts: Cake,
  "diet-desserts": Cookie,
  "lunch-combo": UtensilsCrossed,
};

export function formatPrice(price: number): string {
  return price.toFixed(2).replace(/\.00$/, "");
}
