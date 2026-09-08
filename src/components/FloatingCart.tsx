"use client";

import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

export default function FloatingCart({ tableFromQR }: { tableFromQR?: boolean }) {
  const { totalItems } = useCart();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            type="button"
            onClick={() => setOpen(true)}
            className="fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full bg-accent px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/30 transition-transform active:scale-95"
          >
            <ShoppingBag className="h-4 w-4" />
            {t.myCart} ({totalItems})
          </motion.button>
        )}
      </AnimatePresence>
      <CartDrawer open={open} onClose={() => setOpen(false)} tableFromQR={tableFromQR} />
    </>
  );
}
