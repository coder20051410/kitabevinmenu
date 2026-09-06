"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  BLUR_DATA_URL,
  getCategoryEmoji,
  getCategoryGradient,
} from "@/lib/images";

type ImageStage = "image" | "emoji";

interface MenuItemImageProps {
  name: string;
  categoryId: string;
  image?: string;
  className?: string;
}

export default function MenuItemImage({
  name,
  categoryId,
  image,
  className = "",
}: MenuItemImageProps) {
  const [stage, setStage] = useState<ImageStage>(image ? "image" : "emoji");
  const emoji = getCategoryEmoji(categoryId);
  const gradient = getCategoryGradient(categoryId);

  useEffect(() => {
    setStage(image ? "image" : "emoji");
  }, [image]);

  if (stage === "emoji") {
    return (
      <div
        className={`relative flex h-36 w-full items-center justify-center overflow-hidden rounded-t-xl bg-gradient-to-br ${gradient} ${className}`}
      >
        <span className="text-5xl drop-shadow-sm" role="img" aria-hidden>
          {emoji}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative h-36 w-full overflow-hidden rounded-t-xl ${className}`}>
      <Image
        src={image as string}
        alt={name}
        fill
        unoptimized={image?.startsWith("/images/")}
        sizes="(max-width: 640px) 100vw, 400px"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        loading="lazy"
        onError={() => {
          setStage("emoji");
        }}
      />
    </div>
  );
}
