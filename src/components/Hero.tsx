"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Clock, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { InstagramIcon } from "./icons/InstagramIcon";
import { siteConfig } from "@/lib/site";

export default function Hero({ image }: { image?: string }) {
  const { t, address } = useLanguage();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <section className="relative min-h-[540px] overflow-hidden border-b border-card-border/50 bg-gradient-to-b from-[#5a3929] to-[#241813] px-4 py-16 sm:px-6 sm:py-24">
      {image && <motion.div style={{ y }}><Image src={image} alt="Kitab Evin Bookcafe" fill priority sizes="100vw" className="object-cover" unoptimized={image.startsWith("/")} /></motion.div>}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#21130f] via-[#21130f]/60 to-[#21130f]/20" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto max-w-3xl text-center text-paper"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          QR Menyu
        </p>

        <div className="mx-auto mb-4 flex justify-center">
          <Image
            src="/logo.png"
            alt="Kitab Evin Bookcafe"
            width={280}
            height={84}
            className="h-16 w-auto object-contain sm:h-20"
            priority
          />
        </div>

        <p className="mx-auto max-w-md text-sm leading-relaxed text-paper/85 sm:text-base">
          {t.tagline}
        </p>

        <div className="mt-5 flex flex-col items-center gap-3 text-sm text-paper/75">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-accent"
          >
            <InstagramIcon className="h-4 w-4" />
            <span>{siteConfig.instagramHandle}</span>
          </a>

          <a
            href={siteConfig.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-1.5 text-center transition-colors hover:text-accent"
          >
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
            <span>{address}</span>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.75} />
              {t.hours}
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-coffee-muted/40 sm:inline-block" />
            <span className="font-medium text-accent">{t.lunchHours}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
