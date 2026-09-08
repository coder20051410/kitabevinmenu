"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/lib/site";
import { formatPrice } from "@/lib/utils";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { t } = useLanguage();
  const { items, updateQuantity, removeItem, totalPrice, clearCart, tableNumber, setTableNumber, tableFromQR } = useCart();

  const buildWhatsAppUrl = () => {
    const lines = items.map(
      (i) => `• ${i.name} x${i.quantity} — ${formatPrice(i.price * i.quantity)} AZN`
    );
    const table = tableNumber.trim() || "?";
    const text = [
      `🍽️ ${siteConfig.name}`,
      `Masa: ${table}`,
      "",
      ...lines,
      "",
      `Cəmi: ${formatPrice(totalPrice)} AZN`,
    ].join("\n");

    return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-coffee/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border-t border-card-border bg-paper p-5 shadow-2xl dark:border-dark-border dark:bg-dark-bg"
          >
            <div className="mx-auto mb-4 flex max-w-3xl items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-coffee dark:text-dark-text">
                {t.myCart}
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-card dark:bg-dark-card"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mx-auto max-w-3xl space-y-4">
              {items.length === 0 ? (
                <p className="py-8 text-center text-sm text-coffee-muted">
                  {t.emptyCart}
                </p>
              ) : (
                <>
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center gap-3 rounded-xl border border-card-border bg-card p-3 dark:border-dark-border dark:bg-dark-card"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-coffee dark:text-dark-text">
                            {item.name}
                          </p>
                          <p className="text-xs text-coffee-muted">
                            {formatPrice(item.price)} AZN
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-paper-dark dark:bg-dark-paper"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-5 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full bg-paper-dark dark:bg-dark-paper"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-coffee-muted hover:text-accent"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between border-t border-card-border pt-3 dark:border-dark-border">
                    <span className="font-medium text-coffee dark:text-dark-text">
                      {t.total}
                    </span>
                    <span className="font-display text-xl font-bold text-accent">
                      {formatPrice(totalPrice)} AZN
                    </span>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-coffee-muted">
                      {t.tableNumber}
                    </label>
                    {tableFromQR ? (
                      <div className="flex items-center gap-2 rounded-xl border border-green-300 bg-green-50 px-4 py-2.5 text-sm text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-300">
                        ✓ Masa {tableNumber} təsdiqləndi
                      </div>
                    ) : (
                      <input
                        type="text"
                        inputMode="numeric"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder={t.tablePlaceholder}
                        className="w-full rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent/40 dark:border-dark-border dark:bg-dark-card dark:text-dark-text"
                      />
                    )}
                  </div>

                  <a
                    href={buildWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-semibold text-white shadow-md transition-transform active:scale-[0.98]"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    {t.callWaiter}
                  </a>

                  <button
                    type="button"
                    onClick={clearCart}
                    className="w-full py-2 text-xs text-coffee-muted hover:text-accent"
                  >
                    Səbəti təmizlə
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
