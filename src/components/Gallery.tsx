"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useState } from "react";
import { BLUR_DATA_URL } from "@/lib/images";

export default function Gallery({ images }: { images: string[] }) {
  const [selected, setSelected] = useState<number | null>(null);
  if (!images.length) return null;

  const move = (direction: number) => {
    setSelected((current) => current === null ? null : (current + direction + images.length) % images.length);
  };

  return (
    <section className="venue-gallery border-y border-accent/10 bg-[#efe5d7] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-5xl">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-accent">Bookcafe</p><h2 className="font-display text-3xl font-bold text-coffee sm:text-4xl">Məkanımız</h2></div>
          <p className="max-w-xs text-right text-sm text-coffee-muted">Bizi tanı, kitabların və qəhvənin arasında yerini tap.</p>
        </div>
        <div className="columns-2 gap-3 sm:columns-3 sm:gap-4">
          {images.map((image, index) => (
            <motion.button key={image} type="button" onClick={() => setSelected(index)} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: index * 0.06 }} className="group relative mb-3 block w-full overflow-hidden rounded-xl text-left sm:mb-4" aria-label={`Məkan şəklini aç ${index + 1}`}>
              <Image src={image} alt="Kitab Evin Bookcafe məkanı" width={800} height={600} sizes="(max-width: 640px) 50vw, 33vw" className="h-auto w-full object-cover transition duration-500 group-hover:scale-105" placeholder="blur" blurDataURL={BLUR_DATA_URL} unoptimized={image.startsWith("/")} />
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected !== null && <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-coffee/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}>
          <button type="button" onClick={() => setSelected(null)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-white" aria-label="Bağla"><X /></button>
          <button type="button" onClick={(event) => { event.stopPropagation(); move(-1); }} className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 text-white" aria-label="Əvvəlki şəkil"><ChevronLeft /></button>
          <Image src={images[selected]} alt="Kitab Evin Bookcafe məkanı" width={1400} height={1000} sizes="90vw" className="max-h-[88vh] w-auto max-w-[86vw] object-contain" unoptimized={images[selected].startsWith("/")} />
          <button type="button" onClick={(event) => { event.stopPropagation(); move(1); }} className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 text-white" aria-label="Növbəti şəkil"><ChevronRight /></button>
        </motion.div>}
      </AnimatePresence>
    </section>
  );
}