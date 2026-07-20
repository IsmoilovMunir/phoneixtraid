"use client";

import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import orehiImg from "@/assets/orehi.png";
import sukhofruktyImg from "@/assets/sukhofrukty.png";
import spetsiiImg from "@/assets/spetsii.png";
import napitkiImg from "@/assets/napitki.png";
import sladostiImg from "@/assets/sladosti.png";

const categories: {
  slug: string;
  title: string;
  description: string;
  image: StaticImageData;
}[] = [
  {
    slug: "orehi",
    title: "Орехи",
    description: "Фисташки, миндаль, грецкий орех и др.",
    image: orehiImg,
  },
  {
    slug: "sukhofrukty",
    title: "Сухофрукты",
    description: "Финики, изюм, курага и др.",
    image: sukhofruktyImg,
  },
  {
    slug: "spetsii",
    title: "Специи",
    description: "Шафран, куркума, кардамон и др.",
    image: spetsiiImg,
  },
  {
    slug: "napitki",
    title: "Напитки",
    description: "Безалкогольные напитки, соки, вода и др.",
    image: napitkiImg,
  },
  {
    slug: "sladosti",
    title: "Сладости",
    description: "Восточные сладости, шоколад, халва и др.",
    image: sladostiImg,
  },
];

function getCardStyle(index: number, active: number | null) {
  if (active === null) {
    return {
      transform: "translateX(0) translateY(0) scale(1)",
      zIndex: 1,
    };
  }

  const dist = index - active;

  if (dist === 0) {
    return {
      transform: "translateX(0) translateY(-6px) scale(1.16)",
      zIndex: 30,
    };
  }

  const direction = dist > 0 ? 1 : -1;
  const abs = Math.abs(dist);
  const pull = 10 + abs * 8;
  const scale = 1.06;

  return {
    transform: `translateX(${-direction * pull}px) translateY(0) scale(${scale})`,
    zIndex: 10 - abs,
  };
}

export function ProductCards() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div
      className="relative mt-2 overflow-visible px-0.5 py-2"
      onMouseLeave={() => setActive(null)}
    >
      {/* Mobile: 2-col grid */}
      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/produktsiya/${cat.slug}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-gold/25 bg-green-dark active:border-gold"
          >
            <div className="relative aspect-[4/3] bg-green-dark overflow-hidden">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                sizes="45vw"
                className="object-cover object-center transition-transform duration-500 group-active:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-darker/70 to-transparent" />
            </div>
            <div className="flex flex-1 flex-col px-2.5 py-3 border-t border-gold/20 bg-green-darker">
              <h3 className="font-serif text-sm tracking-[0.08em] uppercase text-gold text-center leading-tight">
                {cat.title}
              </h3>
              <p className="mt-1 text-[11px] text-cream/65 leading-snug text-center line-clamp-2">
                {cat.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Tablet+: hover row */}
      <div className="relative hidden sm:flex items-stretch gap-2 md:gap-3 min-h-[200px] md:min-h-[240px]">
        {categories.map((cat, index) => {
          const style = getCardStyle(index, active);
          const isActive = active === index;

          return (
            <Link
              key={cat.slug}
              href={`/produktsiya/${cat.slug}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onBlur={() => setActive(null)}
              className={cn(
                "group relative flex-1 min-w-0 flex flex-col overflow-hidden rounded-xl border bg-green-dark",
                "will-change-transform",
                isActive
                  ? "border-gold shadow-[0_18px_36px_rgba(0,0,0,0.4)]"
                  : "border-gold/25"
              )}
              style={{
                transform: style.transform,
                zIndex: style.zIndex,
                transition:
                  "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease, border-color 0.3s ease",
              }}
            >
              <div className="relative aspect-square bg-green-dark overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 1024px) 18vw, 15vw"
                  className={cn(
                    "object-cover object-center transition-transform duration-500",
                    isActive ? "scale-110" : "scale-100"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-darker/60 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col px-2 py-2.5 md:px-3 md:py-3.5 border-t border-gold/20 bg-green-darker">
                <h3 className="font-serif text-xs md:text-sm tracking-[0.1em] uppercase text-gold mb-1 text-center leading-tight">
                  {cat.title}
                </h3>
                <p className="hidden md:block text-[11px] md:text-xs text-cream/70 leading-snug text-center line-clamp-2">
                  {cat.description}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
