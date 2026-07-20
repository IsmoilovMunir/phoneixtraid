"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import ctaBanner from "@/assets/cta-banner.png";

const routes = [
  { from: { x: 120, y: 140 }, to: { x: 280, y: 110 }, delay: 0 },
  { from: { x: 180, y: 100 }, to: { x: 320, y: 130 }, delay: 0.8 },
  { from: { x: 90, y: 160 }, to: { x: 240, y: 90 }, delay: 1.4 },
  { from: { x: 200, y: 150 }, to: { x: 360, y: 120 }, delay: 0.4 },
  { from: { x: 150, y: 80 }, to: { x: 300, y: 160 }, delay: 1.8 },
];

const hubs = [
  [120, 140],
  [180, 100],
  [240, 90],
  [280, 110],
  [320, 130],
  [200, 150],
  [90, 160],
  [360, 120],
];

export function CtaBanner() {
  return (
    <section className="relative bg-green-darker py-8 sm:py-10 md:py-14 overflow-hidden">
      <Container>
        <div className="relative w-full max-w-[1800px] mx-auto min-h-[280px] sm:min-h-[220px] md:min-h-[240px] lg:min-h-[300px] md:aspect-[1800/300] overflow-hidden rounded-2xl border border-gold/30">
          <Image
            src={ctaBanner}
            alt="Феникс Трейдинг — международные торговые маршруты и логистика"
            fill
            sizes="(max-width: 1800px) 100vw, 1800px"
            className="object-cover object-[70%_center] md:object-center"
            priority={false}
          />

          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background:
                "linear-gradient(180deg, rgba(6,38,27,0.92) 0%, rgba(6,38,27,0.78) 55%, rgba(6,38,27,0.55) 100%)",
            }}
          />
          <div
            className="absolute inset-0 z-[1] pointer-events-none hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(6,38,27,0.95) 0%, rgba(6,38,27,0.85) 30%, rgba(6,38,27,0.45) 50%, rgba(6,38,27,0.12) 65%, transparent 80%)",
            }}
          />

          <svg
            viewBox="0 0 400 200"
            className="absolute inset-0 z-[2] w-full h-full pointer-events-none opacity-40 md:opacity-100"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
          >
            <g transform="translate(36, -20) scale(0.84)">
              {routes.map((route, i) => (
                <g key={`route-${i}`}>
                  <line
                    x1={route.from.x}
                    y1={route.from.y}
                    x2={route.to.x}
                    y2={route.to.y}
                    stroke="#c9a24b"
                    strokeWidth="0.9"
                    opacity="0.35"
                    strokeDasharray="3.5,3.5"
                  />
                  <circle r="2.2" fill="#d4af37">
                    <animateMotion
                      dur="3.2s"
                      repeatCount="indefinite"
                      begin={`${route.delay}s`}
                      path={`M${route.from.x},${route.from.y} L${route.to.x},${route.to.y}`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      dur="3.2s"
                      repeatCount="indefinite"
                      begin={`${route.delay}s`}
                    />
                  </circle>
                </g>
              ))}

              {hubs.map(([cx, cy], i) => (
                <g key={`hub-${i}`}>
                  <circle cx={cx} cy={cy} r="2.6" fill="#c9a24b" opacity="0.85">
                    <animate
                      attributeName="r"
                      values="2.6;4;2.6"
                      dur="2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.25}s`}
                    />
                  </circle>
                  <circle cx={cx} cy={cy} r="6" fill="#c9a24b" opacity="0.18">
                    <animate
                      attributeName="r"
                      values="6;10;6"
                      dur="2s"
                      repeatCount="indefinite"
                      begin={`${i * 0.25}s`}
                    />
                  </circle>
                </g>
              ))}
            </g>
          </svg>

          <div className="absolute inset-0 z-[3] flex items-end md:items-center">
            <div className="w-full px-5 py-6 sm:px-6 md:px-10 lg:px-14 max-w-lg">
              <h2 className="font-serif font-semibold text-xl sm:text-2xl md:text-3xl tracking-[0.08em] sm:tracking-[0.1em] uppercase text-gold mb-2 md:mb-3">
                Станьте нашим партнёром
              </h2>
              <p className="text-cream/85 text-sm md:text-base leading-relaxed mb-1.5">
                Феникс Трейдинг — ваш надёжный партнёр в международной торговле.
              </p>
              <p className="text-cream/85 text-sm md:text-base leading-relaxed mb-5">
                Вместе мы достигнем большего!
              </p>
              <Button href="/kontakty" size="md" className="w-full sm:w-auto min-h-12">
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
