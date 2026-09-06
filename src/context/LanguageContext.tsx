"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, categoryTitles, type Locale } from "@/lib/i18n";
import { address } from "@/lib/site";

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (typeof translations)["az"];
  address: string;
  getCategoryTitle: (id: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("az");

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && translations[saved]) setLocaleState(saved);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem("locale", next);
  }, []);

  const getCategoryTitle = useCallback(
    (id: string) => categoryTitles[locale][id] ?? id,
    [locale]
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
      address: address[locale],
      getCategoryTitle,
    }),
    [locale, setLocale, getCategoryTitle]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
