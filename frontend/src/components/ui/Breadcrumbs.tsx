"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/components/i18n/LocaleProvider";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const dict = useDictionary();

  return (
    <nav aria-label={dict.common.breadcrumbs} className={cn("py-4", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-cream/70">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-gold/50">
                /
              </span>
            )}
            {item.href && index < items.length - 1 ? (
              <Link
                href={item.href}
                className="hover:text-gold transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-cream" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
