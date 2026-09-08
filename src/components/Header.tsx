"use client";

import Image from "next/image";
import { localeLabels, locales, type Locale } from "@/lib/i18n";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Moon, Sun, Wifi, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WiFiModal from "./WiFiModal";
import ReservationModal from "./ReservationModal";
import { siteConfig } from "@/lib/site";

export default function Header() {
  const { locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [wifiOpen, setWifiOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isOpen = (() => {
    const now = new Date();
    const hour = now.getHours();
    return hour >= 9 && hour < 23;
  })();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  const cycleLocale = () => {
    const currentIndex = locales.indexOf(locale);
    const nextIndex = (currentIndex + 1) % locales.length;
    setLocale(locales[nextIndex] as Locale);
  };

  return (
    <>
      <header className={`sticky top-0 z-40 border-b border-card-border/60 backdrop-blur-md transition-all duration-300 dark:border-dark-border ${scrolled ? "bg-paper/95 shadow-sm dark:bg-dark-bg/95" : "bg-paper/80 dark:bg-dark-bg/80"}`}>
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center" aria-label="Kitab Evin Bookcafe">
              <div className="relative h-11 w-11 overflow-hidden rounded-full ring-1 ring-card-border sm:h-12 sm:w-12">
                <Image
                  src="/logo.png"
                  alt="Kitab Evin Bookcafe"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </a>
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                {isOpen ? (
                  <>
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </>
                ) : (
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                )}
              </span>
              {isOpen ? "Açıqdır" : "Bağlıyıq"}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-card-border bg-card text-coffee transition-colors hover:border-accent/30 hover:bg-paper-light active:scale-95 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href={siteConfig.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-card-border bg-card text-coffee transition-colors hover:border-accent/30 hover:bg-paper-light active:scale-95 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
                <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <button
              type="button"
              onClick={() => setWifiOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-card-border bg-card text-coffee transition-colors hover:border-accent/30 hover:bg-paper-light active:scale-95 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
              aria-label="WiFi info"
            >
              <Wifi className="h-3.5 w-3.5" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={() => setReservationOpen(true)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-card-border bg-card text-coffee transition-colors hover:border-accent/30 hover:bg-paper-light active:scale-95 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
              aria-label="Reservation"
            >
              <Calendar className="h-3.5 w-3.5" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={(e) => toggleTheme(e)}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-card-border bg-card text-coffee transition-colors hover:border-accent/30 hover:bg-paper-light active:scale-95 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                >
                  {theme === "dark" ? <Moon className="h-3.5 w-3.5" strokeWidth={2} /> : <Sun className="h-3.5 w-3.5" strokeWidth={2} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              type="button"
              onClick={cycleLocale}
              className="rounded-full border border-card-border bg-card px-3 py-1.5 text-xs font-semibold tracking-wide text-coffee transition-colors hover:border-accent/30 hover:bg-paper-light active:scale-95 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
              aria-label="Change language"
            >
              {localeLabels[locale]}
            </button>
          </div>
        </div>
      </header>
      <WiFiModal open={wifiOpen} onClose={() => setWifiOpen(false)} />
      <ReservationModal open={reservationOpen} onClose={() => setReservationOpen(false)} />
    </>
  );
}
