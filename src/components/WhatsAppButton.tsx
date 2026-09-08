"use client";

import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${siteConfig.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform active:scale-90 sm:right-6"
    >
      <MessageCircle className="h-6 w-6" fill="white" />
    </a>
  );
}
