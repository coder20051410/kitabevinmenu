"use client";

import { Search, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { t } = useLanguage();

  return (
    <div className="sticky top-[57px] z-40 border-b border-card-border/50 bg-paper/95 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="relative mx-auto max-w-3xl">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-coffee-muted"
          strokeWidth={1.75}
        />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.searchPlaceholder}
          className="w-full rounded-xl border border-card-border bg-card py-2.5 pl-10 pr-10 text-sm text-coffee shadow-card outline-none transition-shadow placeholder:text-coffee-muted/70 focus:border-accent/40 focus:shadow-card-hover"
          aria-label={t.searchPlaceholder}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-coffee-muted transition-colors hover:bg-paper-dark hover:text-coffee"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" strokeWidth={1.75} />
          </button>
        )}
      </div>
    </div>
  );
}
