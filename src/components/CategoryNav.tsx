"use client";

import { useEffect, useRef } from "react";
import { categoryIcons } from "@/lib/utils";
import { categoryTitles } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageContext";
import type { MenuCategory } from "@/data/menu";

interface CategoryNavProps {
  categories: MenuCategory[];
  activeCategory: string;
  onCategoryClick: (id: string) => void;
  isSearching: boolean;
}

export default function CategoryNav({
  categories,
  activeCategory,
  onCategoryClick,
  isSearching,
}: CategoryNavProps) {
  const { locale } = useLanguage();
  const navRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  useEffect(() => {
    if (isSearching) return;
    const activeChip = chipRefs.current.get(activeCategory);
    const nav = navRef.current;
    if (activeChip && nav) {
      const chipLeft = activeChip.offsetLeft;
      const chipWidth = activeChip.offsetWidth;
      const navWidth = nav.offsetWidth;
      const scrollLeft = chipLeft - navWidth / 2 + chipWidth / 2;
      nav.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeCategory, isSearching]);

  if (isSearching) return null;

  return (
    <nav
      ref={navRef}
      className="scrollbar-hide sticky top-[114px] z-30 flex gap-2 overflow-x-auto border-b border-card-border/50 bg-paper/95 px-4 py-2.5 backdrop-blur-md sm:px-6"
      aria-label="Menu categories"
    >
      <div className="mx-auto flex max-w-3xl gap-2">
        {categories.map((category) => {
          const Icon = categoryIcons[category.id];
          const isActive = activeCategory === category.id;

          return (
            <button
              key={category.id}
              ref={(el) => {
                if (el) chipRefs.current.set(category.id, el);
              }}
              type="button"
              onClick={() => onCategoryClick(category.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all active:scale-95 sm:text-sm ${
                isActive
                  ? "border-accent bg-accent text-white shadow-sm"
                  : "border-card-border bg-card text-coffee-light hover:border-accent/25 hover:bg-paper-light"
              }`}
            >
              {Icon && (
                <Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
              )}
              <span className="whitespace-nowrap">{categoryTitles[locale]?.[category.id] ?? category.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
