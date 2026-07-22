import type { NavItem } from "@/types";
import type { Dictionary } from "@/i18n/dictionaries/types";

const navHrefs = [
  { href: "/", key: "home" },
  { href: "/o-kompanii", key: "about" },
  { href: "/napravleniya", key: "directions" },
  { href: "/produktsiya", key: "products" },
  { href: "/strany-briks", key: "countries" },
  { href: "/novosti", key: "export" },
  { href: "/partneram", key: "partners" },
  { href: "/kontakty", key: "contacts" },
] as const;

export function getMainNav(nav: Dictionary["nav"]): NavItem[] {
  return navHrefs.map((item) => ({
    href: item.href,
    label: nav[item.key],
  }));
}

/** @deprecated Use getMainNav(dictionary.nav) for i18n */
export const mainNav: NavItem[] = [
  { href: "/", label: "Главная" },
  { href: "/o-kompanii", label: "О компании" },
  { href: "/napravleniya", label: "Направления" },
  { href: "/produktsiya", label: "Продукция" },
  { href: "/strany-briks", label: "Страны БРИКС+" },
  { href: "/novosti", label: "Экспорт" },
  { href: "/partneram", label: "Партнёрам" },
  { href: "/kontakty", label: "Контакты" },
];
