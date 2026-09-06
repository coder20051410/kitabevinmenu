"use client";

import { MapPin, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { InstagramIcon } from "./icons/InstagramIcon";
import { siteConfig } from "@/lib/site";
import { getDailyQuote } from "@/data/quotes";

export default function Footer() {
  const { t, locale, address } = useLanguage();
  const [dailyQuote, setDailyQuote] = useState(getDailyQuote("az"));

  useEffect(() => {
    setDailyQuote(getDailyQuote(locale));
  }, [locale]);

  return (
    <footer className="border-t border-card-border bg-paper-dark/50 px-4 py-8 sm:px-6 dark:border-dark-border dark:bg-dark-bg/50">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Quote */}
        <div className="rounded-xl border border-accent/20 bg-accent/5 p-4 dark:border-gold/20 dark:bg-gold/5">
          <p className="text-center text-sm italic text-coffee dark:text-dark-text">
            &quot;{dailyQuote}&quot;
          </p>
        </div>

        <div className="space-y-3 text-sm text-coffee-light dark:text-dark-muted">
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-2 transition-colors hover:text-accent"
          >
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
            <span>{address}</span>
          </a>
          <p className="inline-flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
            <a
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              className="hover:text-accent"
            >
              {siteConfig.phone}
            </a>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-coffee transition-colors hover:border-accent/30 hover:text-accent"
          >
            <InstagramIcon className="h-4 w-4" />
            Instagram
          </a>
          <a
            href={siteConfig.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card px-4 py-2 text-sm font-medium text-coffee transition-colors hover:border-accent/30 hover:text-accent"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
            TikTok
          </a>
          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
          >
            <MapPin className="h-4 w-4" strokeWidth={1.75} />
            {t.openMap}
          </a>
        </div>

        <p className="font-display text-sm text-coffee-muted">
          {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
