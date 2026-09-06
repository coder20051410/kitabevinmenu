"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface TimeBannerProps {
  onLunchClick?: () => void;
  onBreakfastClick?: () => void;
}

export function useTimePeriod() {
  const hour = new Date().getHours();
  if (hour >= 12 && hour < 16) return "lunch" as const;
  if (hour >= 7 && hour < 11) return "breakfast" as const;
  return null;
}

export default function TimeBanner({ onLunchClick, onBreakfastClick }: TimeBannerProps) {
  const { t } = useLanguage();
  const period = useTimePeriod();

  if (!period) return null;

  const isLunch = period === "lunch";

  return (
    <motion.button
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      type="button"
      onClick={isLunch ? onLunchClick : onBreakfastClick}
      className={`mx-auto block w-full max-w-3xl rounded-xl px-4 py-2.5 text-center text-sm font-semibold transition-transform active:scale-[0.99] ${
        isLunch
          ? "bg-white text-coffee border border-card-border shadow-sm dark:bg-dark-card dark:text-dark-text dark:border-dark-border"
          : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200"
      }`}
    >
      {isLunch ? t.lunchBanner : t.breakfastBanner}
    </motion.button>
  );
}
