"use client";
import { useState } from "react";
import { X, Calendar } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function ReservationModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("2");

  if (!open) return null;

  const canSubmit = name.trim() && phone.trim() && date && time;

  const buildUrl = () => {
    const text = [
      `📅 Masa Rezervasiyası`,
      `Ad: ${name}`,
      `Telefon: ${phone}`,
      `Tarix: ${date}`,
      `Saat: ${time}`,
      `Nəfər sayı: ${guests}`,
    ].join("\n");
    return `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-coffee/40 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <div
        className="w-full max-w-sm rounded-t-2xl bg-paper p-5 shadow-2xl dark:bg-dark-bg sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-coffee dark:text-dark-text">
            Masa Rezervasiyası
          </h2>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-full bg-card dark:bg-dark-card">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <input placeholder="Adınız" value={name} onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent/40 dark:border-dark-border dark:bg-dark-card dark:text-dark-text" />
          <input placeholder="Telefon nömrəsi" value={phone} onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent/40 dark:border-dark-border dark:bg-dark-card dark:text-dark-text" />
          <div className="flex gap-2">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              className="w-1/2 rounded-xl border border-card-border bg-card px-3 py-2.5 text-sm outline-none focus:border-accent/40 dark:border-dark-border dark:bg-dark-card dark:text-dark-text" />
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)}
              className="w-1/2 rounded-xl border border-card-border bg-card px-3 py-2.5 text-sm outline-none focus:border-accent/40 dark:border-dark-border dark:bg-dark-card dark:text-dark-text" />
          </div>
          <select value={guests} onChange={(e) => setGuests(e.target.value)}
            className="w-full rounded-xl border border-card-border bg-card px-4 py-2.5 text-sm outline-none focus:border-accent/40 dark:border-dark-border dark:bg-dark-card dark:text-dark-text">
            {[1,2,3,4,5,6,"7+"].map((n) => <option key={n} value={n}>{n} nəfər</option>)}
          </select>

          <a
            href={canSubmit ? buildUrl() : undefined}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={!canSubmit}
            className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold text-white shadow-md transition-transform active:scale-[0.98] ${
              canSubmit ? "bg-[#25D366]" : "pointer-events-none bg-coffee-muted/40"
            }`}
          >
            <Calendar className="h-4 w-4" />
            WhatsApp ilə Göndər
          </a>
        </div>
      </div>
    </div>
  );
}
