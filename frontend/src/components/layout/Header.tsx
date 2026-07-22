"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { getMainNav } from "@/data/navigation";
import { ecosystemSites } from "@/data/ecosystem";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/components/i18n/LocaleProvider";
import { Container } from "./Container";
import { Button } from "../ui/Button";
import { Logo } from "../ui/Logo";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import bricsLogo from "@/assets/brics.png";
import inkLogo from "@/assets/logoink.png";

export function Header() {
  const dict = useDictionary();
  const mainNav = getMainNav(dict.nav);
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
      <div ref={topRef} className="bg-green-dark border-b border-gold/10">
        <Container>
          <div className="flex items-center justify-between gap-2.5 py-2 sm:py-2.5">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3 md:gap-3.5">
              <Logo priority height={112} className="min-w-0" />

              <div
                className="hidden h-12 w-px bg-gold/25 sm:block md:h-14 lg:h-16"
                aria-hidden
              />

              <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
                <Image
                  src={bricsLogo}
                  alt="BRICS International Consortium"
                  width={130}
                  height={106}
                  className="h-12 w-auto object-contain sm:h-14 md:h-16 lg:h-[76px]"
                  sizes="(max-width: 640px) 96px, 130px"
                  priority
                />
                <Image
                  src={inkLogo}
                  alt="INK International Consortium"
                  width={92}
                  height={116}
                  className="h-14 w-auto max-w-[64px] object-contain object-center sm:h-16 sm:max-w-[76px] md:h-[72px] md:max-w-[88px] lg:h-[84px] lg:max-w-[100px]"
                  sizes="(max-width: 640px) 64px, 100px"
                  priority
                />
              </div>

              <div
                className="hidden lg:flex items-center gap-2 shrink-0 ms-0.5"
                aria-label={dict.common.phoenixGroup}
              >
                {ecosystemSites.map((site) => (
                  <a
                    key={site.href}
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative inline-flex h-14 w-14 items-center justify-center rounded-xl border border-gold/25 bg-transparent p-0.5 transition-transform hover:scale-105 hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    <Image
                      src={site.icon}
                      alt={site.name}
                      width={52}
                      height={52}
                      className="h-[50px] w-[50px] rounded-lg object-contain"
                    />
                    <span
                      role="tooltip"
                      className="pointer-events-none absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-gold/30 bg-green-darker px-2.5 py-1.5 text-xs text-cream opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 group-active:opacity-100"
                    >
                      {site.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <div className="flex flex-col items-end gap-0.5 text-xs text-cream/80 text-end">
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="inline-flex items-center gap-1.5 hover:text-gold transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 shrink-0 text-gold"
                    aria-hidden="true"
                  >
                    <path d="M6.5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.5 6.5a2 2 0 0 1 2-2z" />
                  </svg>
                  {siteConfig.phone}
                </a>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-gold transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 shrink-0 text-gold"
                    aria-hidden="true"
                  >
                    <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                    <path d="m4 7 8 6 8-6" />
                  </svg>
                  {siteConfig.email}
                </a>
              </div>
              <LanguageSwitcher />
            </div>

            <div className="flex lg:hidden items-center gap-1 shrink-0">
              <LanguageSwitcher compact />
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gold hover:bg-gold/10 transition-colors"
                aria-label={dict.common.call}
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

              <button
                type="button"
                className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-gold/10 transition-colors"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={
                  menuOpen ? dict.common.closeMenu : dict.common.openMenu
                }
                aria-expanded={menuOpen}
              >
                <span
                  className={cn(
                    "block h-0.5 w-5 bg-gold transition-all duration-300",
                    menuOpen && "translate-y-[7px] rotate-45"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-5 bg-gold transition-all duration-300",
                    menuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "block h-0.5 w-5 bg-gold transition-all duration-300",
                    menuOpen && "-translate-y-[7px] -rotate-45"
                  )}
                />
              </button>
            </div>
          </div>
        </Container>
      </div>

      {pinned && <div className="hidden lg:block" style={{ height: navHeight }} aria-hidden />}

      <div
        ref={navRef}
        className={cn(
          "hidden lg:block z-50 bg-green-dark/95 backdrop-blur-sm border-b border-gold/20",
          pinned ? "fixed top-0 inset-x-0" : "relative"
        )}
      >
        <Container>
          <div className="flex items-center justify-between gap-4 py-2.5">
            <nav
              className="flex items-center justify-start gap-0.5 min-w-0"
              aria-label={dict.common.menu}
            >
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-3 py-1.5 text-sm tracking-wide uppercase transition-colors",
                    pathname === item.href
                      ? "text-gold"
                      : "text-cream/80 hover:text-gold"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Button href="/partneram" size="sm" className="shrink-0">
              {dict.header.partnerCta}
            </Button>
          </div>
        </Container>
      </div>

      {menuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[60]"
          role="dialog"
          aria-modal="true"
          aria-label={dict.common.menu}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            aria-label={dict.common.closeMenu}
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 end-0 flex w-full max-w-sm flex-col bg-green-dark shadow-2xl border-s border-gold/20 pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center justify-between gap-3 border-b border-gold/15 px-4 py-3">
              <span className="font-serif text-sm tracking-[0.2em] uppercase text-gold">
                {dict.common.menu}
              </span>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-lg text-gold hover:bg-gold/10"
                onClick={() => setMenuOpen(false)}
                aria-label={dict.common.closeMenu}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden>
                  <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav
              className="flex flex-1 flex-col overflow-y-auto overscroll-contain p-4 sm:p-5 gap-1"
              aria-label={dict.common.menu}
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
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-gold mb-2">
                    {dict.common.language}
                  </p>
                  <LanguageSwitcher />
                </div>
                <div>
                  <p className="text-xs tracking-[0.15em] uppercase text-gold mb-3">
                    {dict.common.phoenixGroup}
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {ecosystemSites.map((site) => (
                      <a
                        key={site.href}
                        href={site.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-1.5 rounded-xl border border-gold/20 bg-transparent p-2 text-center hover:border-gold"
                      >
                        <Image
                          src={site.icon}
                          alt=""
                          width={40}
                          height={40}
                          className="h-10 w-10 rounded-lg object-contain"
                        />
                        <span className="text-[10px] leading-tight text-cream/75 line-clamp-2">
                          {site.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
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
                  {dict.header.partnerCta}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
