"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ThemeProvider } from "@/context/ThemeContext";
import BackToTop from "./BackToTop";
import ScrollProgress from "./ScrollProgress";
import ServiceWorkerRegister from "./ServiceWorkerRegister";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <CartProvider>
          <FavoritesProvider>
            <ServiceWorkerRegister />
            <ScrollProgress />
            {children}
            <BackToTop />
          </FavoritesProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
