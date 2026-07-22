"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { useDictionary, useLocale } from "@/components/i18n/LocaleProvider";

const LOCALES: { code: Locale; labelKey: "ru" | "en" | "fa"; short: string }[] = [
  { code: "ru", labelKey: "ru", short: "RU" },
  { code: "fa", labelKey: "fa", short: "FA" },
  { code: "en", labelKey: "en", short: "EN" },
];

function setLocaleCookie(code: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${code};path=/;max-age=31536000;SameSite=Lax`;
  window.localStorage.setItem(LOCALE_COOKIE, code);
}

interface LanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function LanguageSwitcher({
  className,
  compact = false,
}: LanguageSwitcherProps) {
  const { locale } = useLocale();
  const dict = useDictionary();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    const saved = window.localStorage.getItem(LOCALE_COOKIE);
    if (
      (saved === "ru" || saved === "en" || saved === "fa") &&
      saved !== locale
    ) {
      setLocaleCookie(saved);
      window.location.reload();
    }
  }, [locale]);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const select = (code: Locale) => {
    if (code === locale) {
      setOpen(false);
      return;
    }
    setLocaleCookie(code);
    setOpen(false);
    window.location.reload();
  };

  const current = LOCALES.find((item) => item.code === locale) ?? LOCALES[0];

  return (
    <div ref={rootRef} className={cn("relative shrink-0", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={dict.language.choose}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg border border-gold/30 bg-green-darker/60 text-gold transition-colors hover:border-gold hover:bg-gold/10",
          compact ? "h-10 w-10 justify-center" : "h-9 px-2.5"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn(compact ? "h-5 w-5" : "h-4 w-4")}
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
        {!compact && (
          <>
            <span className="text-xs font-semibold tracking-wide text-cream">
              {current.short}
            </span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={cn(
                "h-3.5 w-3.5 text-cream/70 transition-transform",
                open && "rotate-180"
              )}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
            </svg>
          </>
        )}
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={dict.language.languages}
          className="absolute end-0 top-full z-[70] mt-2 min-w-[220px] overflow-hidden rounded-xl border border-gold/30 bg-green-darker py-1 shadow-xl"
        >
          {LOCALES.map((item) => (
            <li key={item.code} role="option" aria-selected={locale === item.code}>
              <button
                type="button"
                onClick={() => select(item.code)}
                className={cn(
                  "flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-start text-sm transition-colors",
                  locale === item.code
                    ? "bg-gold/15 text-gold"
                    : "text-cream/85 hover:bg-gold/10 hover:text-gold"
                )}
              >
                <span>{dict.language[item.labelKey]}</span>
                <span className="text-xs font-semibold tracking-wide opacity-70">
                  {item.short}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
