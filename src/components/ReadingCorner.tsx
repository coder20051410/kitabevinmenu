"use client";

import { motion } from "framer-motion";
import { recommendedBooks } from "@/data/books";
import { useLanguage } from "@/context/LanguageContext";

export default function ReadingCorner() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-y border-card-border bg-[#EDE6DA] px-4 py-10 dark:border-dark-border dark:bg-[#1a1410] sm:px-6">
      {/* bookshelf lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 48px, #3B2A1E 48px, #3B2A1E 49px)",
        }}
      />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent dark:text-gold">
            📚 {t.readingCorner}
          </p>
          <h2 className="font-display text-2xl font-semibold text-coffee dark:text-dark-text">
            {t.recommendedBooks}
          </h2>
          <p className="mt-2 text-sm text-coffee-light dark:text-dark-muted">
            {t.readingPromo}
          </p>
        </motion.div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {recommendedBooks.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-card-border/80 bg-card/80 p-4 text-center shadow-card backdrop-blur-sm dark:border-dark-border dark:bg-dark-card/80"
            >
              <span className="text-3xl" role="img" aria-hidden>
                {book.emoji}
              </span>
              <h3 className="mt-2 text-sm font-semibold leading-tight text-coffee dark:text-dark-text">
                {book.title}
              </h3>
              <p className="mt-1 text-xs text-coffee-muted dark:text-dark-muted">
                {book.author}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
