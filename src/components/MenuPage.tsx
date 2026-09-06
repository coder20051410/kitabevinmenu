"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { menuCategories as defaultMenuCategories, type MenuCategory } from "@/data/menu";
import { useLanguage } from "@/context/LanguageContext";
import { useFavorites } from "@/context/FavoritesContext";
import { slugify } from "@/lib/images";
import Hero from "./Hero";
import SearchBar from "./SearchBar";
import CategoryNav from "./CategoryNav";
import MenuSection from "./MenuSection";
import MenuItemCard from "./MenuItemCard";
import Footer from "./Footer";
import FilterChips, { type FilterKey } from "./FilterChips";
import Gallery from "./Gallery";

const Header = dynamic(() => import("./Header"), {
  ssr: false,
});

const TimeBanner = dynamic(() => import("./TimeBanner"), {
  ssr: false,
});

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

export default function MenuPage() {
  const { t } = useLanguage();
  const { favorites, showFavoritesOnly } = useFavorites();
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>(defaultMenuCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterKey>(null);
  const debouncedQuery = useDebouncedValue(searchQuery, 200);
  const [activeCategory, setActiveCategory] = useState(defaultMenuCategories[0].id);
  const [venueImages, setVenueImages] = useState<{ hero?: string; gallery: string[] }>({ gallery: [] });
  const isScrollingRef = useRef(false);

  useEffect(() => {
    fetch(`/api/menu?updated=${Date.now()}`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: MenuCategory[] | null) => {
        if (data?.length) setMenuCategories(data);
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    fetch(`/api/venue-images?updated=${Date.now()}`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => { if (data) setVenueImages(data); })
      .catch(() => undefined);
  }, []);

  const filteredCategories = useMemo((): MenuCategory[] => {
    const query = debouncedQuery.trim().toLowerCase();

    return menuCategories
      .map((category) => {
        let items = category.items;

        // Search filter
        if (query) {
          items = items.filter((item) =>
            item.name.toLowerCase().includes(query)
          );
        }

        // Tag filter
        if (activeFilter === "cheapest") {
          const minPrice = Math.min(...category.items.map((i) => i.price));
          items = items.filter((item) => item.price === minPrice);
        } else if (activeFilter && (activeFilter === "popular" || activeFilter === "spicy" || activeFilter === "vegetarian" || activeFilter === "new")) {
          items = items.filter((item) => item.tags?.includes(activeFilter));
        }

        // Favorites filter
        if (showFavoritesOnly) {
          items = items.filter((item) => {
            const itemId = `${category.id}-${slugify(item.name)}`;
            return favorites.has(itemId);
          });
        }

        return { ...category, items };
      })
      .filter((category) => category.items.length > 0);
  }, [menuCategories, debouncedQuery, activeFilter, showFavoritesOnly, favorites]);

  const isSearching = debouncedQuery.trim().length > 0 || activeFilter !== null || showFavoritesOnly;
  const totalResults = filteredCategories.reduce(
    (sum, cat) => sum + cat.items.length,
    0
  );

  const handleCategoryClick = useCallback((id: string) => {
    isScrollingRef.current = true;
    setActiveCategory(id);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 800);
    } else {
      isScrollingRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (isSearching) return;

    const sections = menuCategories
      .map((category) => document.getElementById(category.id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingRef.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveCategory(visible[0].target.id);
        }
      },
      {
        rootMargin: "-180px 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [isSearching, menuCategories]);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero image={venueImages.hero} />
      <Gallery images={venueImages.gallery} />
      <SearchBar value={searchQuery} onChange={setSearchQuery} />
      <TimeBanner />
      <FilterChips
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <CategoryNav
        categories={menuCategories}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        isSearching={isSearching}
      />

      <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
        {isSearching ? (
          <div className="space-y-6">
            {totalResults === 0 ? (
              <p className="py-12 text-center text-sm text-coffee-muted">
                {t.noResults}
              </p>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.id}>
                  <h2 className="mb-3 font-display text-lg font-semibold text-coffee">
                    {category.title}
                  </h2>
                  <div className="grid gap-2.5 sm:grid-cols-2">
                    {category.items.map((item, index) => (
                      <MenuItemCard
                        key={`search-${category.id}-${item.name}`}
                        item={item}
                        categoryId={category.id}
                        index={index}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-10 sm:space-y-12">
            {menuCategories.map((category) => (
              <MenuSection key={category.id} category={category} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
