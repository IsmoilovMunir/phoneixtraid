export const locales = ["ru", "en", "fa"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";
export const LOCALE_COOKIE = "phoenix-locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "ru" || value === "en" || value === "fa";
}
