"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { DrivingKamaz } from "@/components/home/DrivingKamaz";
import { RouteMotion } from "@/components/home/RouteMotion";
import { benefits } from "@/data/benefits";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import heroBanner from "@/assets/hero-banner.png";
import worldMap from "@/assets/world-map.png";

const stats = [
  {
    value: "20+",
    label: "Стран-партнёров",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    value: "1000+",
    label: "Поставщиков",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9.5" cy="7" r="3.5" />
        <path d="M22 21v-2a3.5 3.5 0 0 0-2.5-3.3M16.5 3.7a3.5 3.5 0 0 1 0 6.6" />
      </svg>
    ),
  },
  {
    value: "5000+",
    label: "Тонн товаров ежемесячно",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M3 7h13v10H3z" />
        <path d="M16 10h3l2 3v4h-5V10z" />
        <circle cx="7" cy="19" r="1.5" />
        <circle cx="18" cy="19" r="1.5" />
      </svg>
    ),
  },
  {
    value: "10+",
    label: "Лет успешной работы",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
];

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function benefitOpacity(progress: number, index: number): number {
  const from = 0.26;
  const to = 0.88;
  const slot = (to - from) / 5;
  const start = from + index * slot;
  const end = start + slot;
  if (progress < start || progress >= end) return 0;
  const t = (progress - start) / slot;
  if (t < 0.15) return clamp01(t / 0.15);
  if (t > 0.85) return clamp01(1 - (t - 0.85) / 0.15);
  return 1;
}

function HeroIntro({ compact }: { compact?: boolean }) {
  return (
    <>
      <div className={compact ? "max-w-xl" : "mt-8 md:mt-16 lg:mt-[100px] max-w-lg lg:max-w-[560px]"}>
        <h1
          className={
            compact
              ? "font-serif font-bold text-[1.65rem] sm:text-3xl tracking-[0.04em] uppercase text-gold leading-[1.2] mb-3"
              : "font-serif font-bold text-3xl sm:text-4xl md:text-[2.5rem] lg:text-[2.85rem] tracking-[0.05em] uppercase text-gold leading-[1.2] mb-3 md:mb-4"
          }
        >
          Центр международной торговли стран БРИКС+
        </h1>
        <p
          className={
            compact
              ? "text-cream/90 text-[15px] leading-relaxed mb-5 max-w-md"
              : "text-cream/90 text-base md:text-lg font-normal leading-relaxed mb-5 md:mb-6 max-w-md"
          }
        >
          Объединяем рынки, создаём возможности, строим будущее вместе
        </p>
        <div className={compact ? "flex flex-col gap-3 sm:flex-row sm:flex-wrap" : "flex flex-wrap gap-3"}>
          <Button href="/o-kompanii" size="md" className={compact ? "w-full sm:w-auto" : undefined}>
            О компании
          </Button>
          <Button
            href="/napravleniya"
            variant="outline"
            size="md"
            className={compact ? "w-full sm:w-auto" : undefined}
          >
            Наши направления
          </Button>
        </div>
      </div>

      <div className={compact ? "mt-10" : "max-w-3xl"}>
        <div
          className={
            compact
              ? "grid grid-cols-2 gap-x-4 gap-y-5"
              : "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-gold/40"
          }
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={
                compact
                  ? "flex flex-col items-start"
                  : "flex flex-col items-start md:items-center md:px-4 first:md:pl-0"
              }
            >
              <div
                className={
                  compact
                    ? "flex items-center gap-2 text-gold"
                    : "contents"
                }
              >
                <span className={compact ? "shrink-0" : "text-gold mb-1"}>
                  {stat.icon}
                </span>
                <p
                  className={
                    compact
                      ? "font-serif font-bold text-2xl text-gold tracking-wide"
                      : "font-serif font-bold text-xl md:text-2xl text-gold tracking-wide"
                  }
                >
                  {stat.value}
                </p>
              </div>
              <p
                className={
                  compact
                    ? "mt-1 text-[11px] font-medium text-cream/75 tracking-[0.08em] uppercase leading-snug"
                    : "mt-0.5 text-[9px] md:text-[10px] font-medium text-cream/70 tracking-[0.14em] uppercase"
                }
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/** Мобильный hero: один экран, без sticky-сцены */
function HeroMobile() {
  return (
    <section className="relative overflow-hidden bg-[#06261b]">
      <div className="absolute inset-0 z-0">
        <Image
          src={heroBanner}
          alt="Феникс Трейдинг — международная логистика, КамАЗ и морские перевозки"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[72%_center] opacity-55"
          placeholder="blur"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(6,38,27,0.88) 0%, rgba(6,38,27,0.72) 45%, rgba(6,38,27,0.92) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.18] pointer-events-none">
          <Image
            src={worldMap}
            alt=""
            width={1857}
            height={985}
            className="h-auto w-[120%] max-w-none object-contain brightness-125"
            sizes="100vw"
            aria-hidden
          />
        </div>
      </div>

      <Container className="relative z-10 flex min-h-[min(100svh,760px)] flex-col justify-between py-8 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
        <HeroIntro compact />
      </Container>
    </section>
  );
}

/** Desktop: sticky scroll-сцена */
function HeroDesktop() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const stickyH = Math.min(window.innerHeight, 900);
      const travel = Math.max(track.offsetHeight - stickyH, 1);
      setProgress(clamp01(Math.min(Math.max(-rect.top, 0), travel) / travel));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const detailsOpacity = clamp01(1 - (progress - 0.08) / 0.14);
  const darken = clamp01((progress - 0.08) / 0.14);
  const enterProgress = clamp01((progress - 0.08) / 0.16);

  const benefitsEnd = 0.88;
  const driveDuring = clamp01((progress - 0.26) / (benefitsEnd - 0.26));
  const driveProgress =
    progress < benefitsEnd
      ? driveDuring * 0.55
      : clamp01(0.55 + ((progress - benefitsEnd) / 0.08) * 0.45);

  const exitOpacity = progress < 0.96 ? 1 : clamp01(1 - (progress - 0.96) / 0.04);
  const storyOpacity =
    progress < 0.9
      ? clamp01((progress - 0.24) / 0.04)
      : clamp01(1 - (progress - 0.9) / 0.06);
  const routesOpacity = clamp01(darken) * exitOpacity;

  return (
    <div ref={trackRef} className="relative h-[220vh] bg-cream">
      <section className="sticky top-0 h-[900px] max-h-[100svh] overflow-hidden bg-[#06261b]">
        <div
          className="absolute inset-0 z-[1]"
          style={{ opacity: detailsOpacity }}
          aria-hidden={detailsOpacity < 0.05}
        >
          <div className="absolute inset-y-0 right-0 w-[70%] lg:w-[66%]">
            <Image
              src={heroBanner}
              alt="Феникс Трейдинг — международная логистика, КамАЗ и морские перевозки"
              fill
              priority
              sizes="70vw"
              className="object-contain object-right object-center scale-105 origin-right"
              placeholder="blur"
            />
          </div>

          <div className="absolute inset-y-0 left-0 w-[55%] pointer-events-none overflow-hidden">
            <div className="absolute left-[2%] top-1/2 w-[100%] max-w-[640px] -translate-y-1/2 opacity-[0.22]">
              <Image
                src={worldMap}
                alt=""
                width={1857}
                height={985}
                className="h-auto w-full object-contain scale-100 brightness-125 contrast-110"
                sizes="50vw"
                aria-hidden="true"
              />
            </div>
          </div>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, #06261b 0%, #06261b 30%, rgba(6,38,27,0.96) 40%, rgba(6,38,27,0.7) 52%, rgba(6,38,27,0.35) 62%, rgba(6,38,27,0.1) 72%, transparent 82%)",
            }}
          />
        </div>

        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: `rgba(6, 38, 27, ${0.12 + darken * 0.88})`,
          }}
        />

        <div className="absolute inset-0 z-[2]">
          <RouteMotion opacity={routesOpacity} />
        </div>

        <div className="absolute inset-0 z-[3]" aria-hidden>
          <DrivingKamaz
            enterProgress={enterProgress}
            driveProgress={driveProgress}
            opacity={exitOpacity}
          />
        </div>

        <div
          className="relative z-[4] flex h-full w-full flex-col"
          style={{
            opacity: detailsOpacity,
            pointerEvents: detailsOpacity < 0.35 ? "none" : "auto",
          }}
        >
          <Container className="flex h-full flex-col justify-between py-7 md:py-9 lg:py-10 pb-6 md:pb-8">
            <HeroIntro />
          </Container>
        </div>

        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{ opacity: storyOpacity }}
        >
          <Container className="relative flex h-full items-center py-8 md:py-10">
            <div className="relative min-h-[220px] md:min-h-[240px] max-w-md w-full">
              {benefits.map((benefit, index) => {
                const opacity = benefitOpacity(progress, index);
                return (
                  <div
                    key={benefit.title}
                    className="absolute left-0 top-0 w-full max-w-md rounded-xl border border-white/15 bg-white/10 px-5 py-5 md:px-6 md:py-6 shadow-[0_8px_32px_rgba(0,0,0,0.28)] backdrop-blur-md"
                    style={{
                      opacity,
                      transform: `translateY(${(1 - opacity) * 20}px)`,
                      background:
                        "linear-gradient(145deg, rgba(247,243,236,0.14) 0%, rgba(255,255,255,0.06) 50%, rgba(6,38,27,0.35) 100%)",
                    }}
                    aria-hidden={opacity < 0.08}
                  >
                    <p className="text-gold text-xs tracking-[0.25em] uppercase mb-3">
                      {String(index + 1).padStart(2, "0")} / 05
                    </p>
                    <div className="text-gold mb-4">{benefit.icon}</div>
                    <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl tracking-[0.08em] uppercase text-cream leading-tight mb-3">
                      {benefit.title}
                    </h2>
                    <p className="text-cream/85 text-base md:text-lg leading-relaxed max-w-sm">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>
      </section>
    </div>
  );
}

export function Hero() {
  const isDesktop = useIsDesktop();
  return isDesktop ? <HeroDesktop /> : <HeroMobile />;
}
