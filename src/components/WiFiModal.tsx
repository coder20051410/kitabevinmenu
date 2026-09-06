"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Copy, Wifi, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { siteConfig } from "@/lib/site";
import { useState } from "react";

interface WiFiModalProps {
  open: boolean;
  onClose: () => void;
}

export default function WiFiModal({ open, onClose }: WiFiModalProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const copyPassword = async () => {
    await navigator.clipboard.writeText(siteConfig.wifiPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-card-border bg-paper p-6 shadow-2xl dark:border-dark-border dark:bg-dark-bg"
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-accent dark:text-gold" />
                <h3 className="font-display text-lg font-semibold text-coffee dark:text-dark-text">
                  {t.wifiTitle}
                </h3>
              </div>
              <button type="button" onClick={onClose}>
                <X className="h-4 w-4 text-coffee-muted" />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-coffee-muted">{t.wifiName}</p>
                <p className="font-medium text-coffee dark:text-dark-text">
                  {siteConfig.wifiName}
                </p>
              </div>
              <div>
                <p className="text-xs text-coffee-muted">{t.wifiPassword}</p>
                <p className="font-mono font-medium text-coffee dark:text-dark-text">
                  {siteConfig.wifiPassword}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={copyPassword}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-white dark:bg-gold dark:text-dark-bg"
            >
              <Copy className="h-4 w-4" />
              {copied ? t.copied : t.copy}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
