"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/types";

type LocaleContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  t: Dictionary;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({ locale, dictionary, t: dictionary }),
    [locale, dictionary]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useDictionary() {
  return useLocale().dictionary;
}

/** Dot-path helper: t("nav.home") */
export function useT() {
  const { dictionary } = useLocale();

  return useCallback(
    (path: string): string => {
      const parts = path.split(".");
      let cur: unknown = dictionary;
      for (const part of parts) {
        if (cur && typeof cur === "object" && part in cur) {
          cur = (cur as Record<string, unknown>)[part];
        } else {
          return path;
        }
      }
      return typeof cur === "string" ? cur : path;
    },
    [dictionary]
  );
}
