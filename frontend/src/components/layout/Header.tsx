"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { mainNav } from "@/data/navigation";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Container } from "./Container";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [pinned, setPinned] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const [navHeight, setNavHeight] = useState(52);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const measure = () => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    };

    const onScroll = () => {
      const topH = topRef.current?.offsetHeight ?? 0;
      setPinned(window.scrollY >= topH);
    };

    measure();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <header className="z-50 relative">
      {/* Верх: лого + контакты (desktop) / лого + телефон + бургер (mobile) */}
      <div ref={topRef} className="bg-green-dark border-b border-gold/10">
        <Container>
          <div className="flex items-center justify-between gap-3 py-2.5 sm:py-3">
            <Logo priority height={144} className="min-w-0" />

            <div className="hidden lg:flex items-center gap-6 text-sm text-cream/80">
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="inline-flex items-center gap-2 hover:text-gold transition-colors whitespace-nowrap"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 text-gold"
                  aria-hidden="true"
                >
                  <path d="M6.5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.5 6.5a2 2 0 0 1 2-2z" />
                </svg>
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 hover:text-gold transition-colors whitespace-nowrap"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 text-gold"
                  aria-hidden="true"
                >
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                  <path d="m4 7 8 6 8-6" />
                </svg>
                {siteConfig.email}
              </a>
              <a
                href="/kontakty"
                className="inline-flex items-center gap-2 hover:text-gold transition-colors whitespace-nowrap"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 text-gold"
                  aria-hidden="true"
                >
                  <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z" />
                  <circle cx="12" cy="11" r="2" />
                </svg>
                г. Москва, Товарищеский пер., 8 стр. 1
              </a>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-lg text-gold hover:bg-gold/10 transition-colors"
                aria-label="Позвонить"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <path d="M6.5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.5 6.5a2 2 0 0 1 2-2z" />
                </svg>
              </a>

              <div className="hidden md:block">
                <Button href="/partneram" size="sm">
                  Стать партнёром
                </Button>
              </div>

              {/* Бургер только на мобилке/планшете — в одной полоске с лого */}
              <button
                type="button"
                className="lg:hidden flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gold/10 transition-colors"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
                aria-expanded={menuOpen}
              >
                <span
                  className={cn(
                    "block h-0.5 w-6 bg-gold transition-all duration-300",
                    menuOpen && "translate-y-2 rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-6 bg-gold transition-all duration-300",
                    menuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-6 bg-gold transition-all duration-300",
                    menuOpen && "-translate-y-2 -rotate-45"
                  )}
                />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {pinned && <div className="hidden lg:block" style={{ height: navHeight }} aria-hidden />}

      {/* Десктоп-навигация — на мобилке полностью скрыта */}
      <div
        ref={navRef}
        className={cn(
          "hidden lg:block z-50 bg-green-dark/95 backdrop-blur-sm border-b border-gold/20",
          pinned ? "fixed top-0 left-0 right-0" : "relative"
        )}
      >
        <Container>
          <nav
            className="flex items-center justify-start gap-1 py-3"
            aria-label="Основная навигация"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 text-sm tracking-wide uppercase transition-colors",
                  pathname === item.href
                    ? "text-gold"
                    : "text-cream/80 hover:text-gold"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>

      {/* Мобильное меню — оверлей, только по кнопке */}
      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[60]"
          role="dialog"
          aria-modal="true"
          aria-label="Мобильное меню"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            aria-label="Закрыть меню"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-green-dark shadow-2xl border-l border-gold/20 pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center justify-between gap-3 border-b border-gold/15 px-4 py-3">
              <span className="font-serif text-sm tracking-[0.2em] uppercase text-gold">
                Меню
              </span>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-gold hover:bg-gold/10"
                onClick={() => setMenuOpen(false)}
                aria-label="Закрыть меню"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col overflow-y-auto overscroll-contain p-4 sm:p-5 gap-1"
              aria-label="Мобильная навигация"
            >
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "min-h-12 flex items-center px-4 py-3 text-base tracking-wide uppercase border-b border-gold/10 transition-colors",
                    pathname === item.href
                      ? "text-gold"
                      : "text-cream/80 hover:text-gold"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-4 px-1">
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="text-cream/80 hover:text-gold text-base"
                >
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-cream/80 hover:text-gold text-sm break-all"
                >
                  {siteConfig.email}
                </a>
                <Button href="/partneram" className="w-full min-h-12">
                  Стать партнёром
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
