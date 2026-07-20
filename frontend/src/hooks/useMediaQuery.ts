"use client";

import { useSyncExternalStore } from "react";

function subscribe(query: string, onStoreChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

/**
 * SSR-safe media query. Server + first paint use `false` (mobile-first).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => subscribe(query, onStoreChange),
    () => window.matchMedia(query).matches,
    () => false
  );
}

export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 768px)");
}
