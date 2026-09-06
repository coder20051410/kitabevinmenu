"use client";

import { motion } from "framer-motion";
import { categoryIcons } from "@/lib/utils";
import { categoryTitles } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageContext";
import MenuItemCard from "./MenuItemCard";
import type { MenuCategory } from "@/data/menu";

interface MenuSectionProps {
  category: MenuCategory;
}

export default function MenuSection({ category }: MenuSectionProps) {
  const { t, locale } = useLanguage();
  const Icon = categoryIcons[category.id];

  return (
    <section
      id={category.id}
      className="scroll-mt-[170px] sm:scroll-mt-[180px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.4 }}
        className="mb-4 flex items-center gap-2.5"
      >
        {Icon && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
          </div>
        )}
        <div>
          <h2 className="font-display text-xl font-semibold text-coffee sm:text-2xl">
            {categoryTitles[locale]?.[category.id] ?? category.title}
          </h2>
          {category.id === "cocktails" && (
            <p className="text-xs text-coffee-muted">{t.nonAlcoholic}</p>
          )}
        </div>
      </motion.div>

      <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
        {category.items.map((item, index) => (
          <MenuItemCard
            key={`${category.id}-${item.name}`}
            item={item}
            categoryId={category.id}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
