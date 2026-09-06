"use client";

import type { MenuTag } from "@/data/menu";
import { useLanguage } from "@/context/LanguageContext";
import { useFavorites } from "@/context/FavoritesContext";
import { Heart } from "lucide-react";

export type FilterKey = MenuTag | "cheapest" | null;

interface FilterChipsProps {
  activeFilter: FilterKey;
  onFilterChange: (filter: FilterKey) => void;
}

const FILTER_OPTIONS: { key: FilterKey; emoji: string }[] = [
  { key: "popular", emoji: "🔥" },
  { key: "spicy", emoji: "🌶️" },
  { key: "vegetarian", emoji: "🥗" },
  { key: "new", emoji: "🆕" },
  { key: "cheapest", emoji: "💰" },
];

export default function FilterChips({
  activeFilter,
  onFilterChange,
}: FilterChipsProps) {
  const { t } = useLanguage();
  const { showFavoritesOnly, setShowFavoritesOnly } = useFavorites();

  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-2 scrollbar-hide sm:px-6">
      <div className="mx-auto flex max-w-3xl gap-2">
        <button
          type="button"
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={`flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
            showFavoritesOnly
              ? "border-rose-400 bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-300"
              : "border-card-border bg-card text-coffee-light dark:border-dark-border dark:bg-dark-card dark:text-dark-muted"
          }`}
        >
          <Heart className={`h-3 w-3 ${showFavoritesOnly ? "fill-current" : ""}`} />
          {t.favorites}
        </button>

        {FILTER_OPTIONS.map(({ key, emoji }) => (
          <button
            key={key}
            type="button"
            onClick={() => onFilterChange(activeFilter === key ? null : key)}
            className={`flex shrink-0 items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
              activeFilter === key
                ? "border-accent bg-accent text-white"
                : "border-card-border bg-card text-coffee-light dark:border-dark-border dark:bg-dark-card dark:text-dark-muted"
            }`}
          >
            <span>{emoji}</span>
            {key && t.filters[key]}
          </button>
        ))}
      </div>
    </div>
  );
}
