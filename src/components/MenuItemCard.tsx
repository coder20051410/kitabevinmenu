"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { formatPrice } from "@/lib/utils";
import { slugify } from "@/lib/images";
import { FAMILY_MENU_NAME } from "@/lib/site";
import MenuItemImage from "./MenuItemImage";
import type { MenuItem } from "@/data/menu";
import type { MenuTag } from "@/data/menu";
import { useState } from "react";

interface MenuItemCardProps {
  item: MenuItem;
  categoryId: string;
  index?: number;
}

function triggerConfetti() {
  import("canvas-confetti").then(({ default: confetti }) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#8B5E3C", "#F5EFE3", "#D4AF37", "#3B2A1E"],
    });
  });
}

export default function MenuItemCard({
  item,
  categoryId,
  index = 0,
}: MenuItemCardProps) {
  const { t } = useLanguage();
  const { addItem } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [showPop, setShowPop] = useState(false);

  const itemId = `${categoryId}-${slugify(item.name)}`;
  const favorited = isFavorite(itemId);

  const handleAdd = () => {
    addItem({ id: itemId, name: item.name, price: item.price });
    setShowPop(true);
    setTimeout(() => setShowPop(false), 600);
    if (item.name === FAMILY_MENU_NAME) triggerConfetti();
  };

  const tagLabel = (tag: MenuTag) => t.filters[tag];

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-card-border bg-card shadow-card transition-all hover:-translate-y-1 hover:border-accent/25 hover:shadow-card-hover dark:border-dark-border dark:bg-dark-card"
    >
      <div className="relative">
        <MenuItemImage
          name={item.name}
          categoryId={categoryId}
          image={item.image}
        />
        {item.tags?.some((tag) => tag === "popular" || tag === "new") && (
          <span className="absolute left-0 top-3 rounded-r-full bg-accent px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm">
            {item.tags.includes("new") ? t.filters.new : t.filters.popular}
          </span>
        )}
        <span className="absolute bottom-2 right-2 rounded-full bg-paper/95 px-2.5 py-1 font-display text-sm font-bold text-coffee shadow-md">
          {formatPrice(item.price)} AZN
        </span>
        <button
          type="button"
          onClick={() => toggleFavorite(itemId)}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-card/90 shadow-sm backdrop-blur-sm transition-transform active:scale-90 dark:bg-dark-card/90"
          aria-label={t.favorites}
        >
          <Star
            className={`h-4 w-4 ${favorited ? "fill-amber-400 text-amber-400" : "text-coffee-muted"}`}
            strokeWidth={1.75}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3.5">
        <div className="flex flex-wrap items-start gap-1.5">
          <h3 className="flex-1 text-sm font-medium leading-snug text-coffee dark:text-dark-text">
            {item.name}
          </h3>
        </div>

        <div className="flex flex-wrap gap-1">
          {item.note === "set" && (
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent">
              {t.set}
            </span>
          )}
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-paper-dark px-2 py-0.5 text-[10px] font-medium text-coffee-muted dark:bg-dark-paper dark:text-dark-muted"
            >
              {tagLabel(tag)}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div>
            <span className="font-display text-lg font-bold text-coffee dark:text-gold">{formatPrice(item.price)}</span>
            <span className="ml-0.5 text-[10px] font-medium uppercase tracking-wide text-coffee-muted">
              azn
            </span>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className="relative flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white shadow-sm transition-transform hover:bg-accent-light active:scale-90"
            aria-label={t.addToCart}
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            <AnimatePresence>
              {showPop && (
                <motion.span
                  initial={{ opacity: 1, y: 0, scale: 1 }}
                  animate={{ opacity: 0, y: -24, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute -top-1 text-xs font-bold text-accent"
                >
                  +1
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
