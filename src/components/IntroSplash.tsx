"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function IntroSplash() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("intro-seen");
    if (!seen) setShow(true);
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("intro-seen", "1");
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-paper dark:bg-dark-bg"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              animate={{ rotateY: [0, 15, 0] }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <Image
                src="/logo.png"
                alt="Kitab Evin Bookcafe"
                width={240}
                height={72}
                className="mx-auto h-20 w-auto object-contain"
                priority
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-4 font-display text-lg text-coffee dark:text-dark-text"
            >
              {t.tagline}
            </motion.p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            type="button"
            onClick={dismiss}
            className="absolute bottom-12 rounded-full border border-accent/30 px-6 py-2 text-sm font-medium text-accent dark:text-gold"
          >
            {t.introSkip}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
