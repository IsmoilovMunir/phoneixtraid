import type { Country } from "@/types";

export const countries: Country[] = [
  {
    slug: "rossiya",
    name: "Россия",
    flag: "🇷🇺",
    region: "brics",
    description:
      "Ключевой партнёр и база операций. Экспорт зерна, орехов, мёда и другой сельхозпродукции.",
    products: ["Орехи", "Зерно", "Мёд", "Масло"],
  },
  {
    slug: "kitay",
    name: "Китай",
    flag: "🇨🇳",
    region: "brics",
    description:
      "Крупнейший торговый партнёр. Импорт чая, специй, электроники и экспорт продовольствия.",
    products: ["Чай", "Специи", "Кофе", "Сладости"],
  },
  {
    slug: "indiya",
    name: "Индия",
    flag: "🇮🇳",
    region: "brics",
    description:
      "Поставщик специй, чая, риса и текстиля. Развивающееся направление торговли.",
    products: ["Специи", "Чай", "Рис", "Орехи"],
  },
  {
    slug: "braziliya",
    name: "Бразилия",
    flag: "🇧🇷",
    region: "brics",
    description:
      "Экспорт кофе, сои, мяса и сахара. Стратегический партнёр в Латинской Америке.",
    products: ["Кофе", "Сахар", "Соя", "Мясо"],
  },
  {
    slug: "yuar",
    name: "ЮАР",
    flag: "🇿🇦",
    region: "brics",
    description:
      "Поставщик фруктов, вина и минеральных ресурсов. Точка входа в Африку.",
    products: ["Фрукты", "Вино", "Цитрусовые"],
  },
  {
    slug: "iran",
    name: "Иран",
    flag: "🇮🇷",
    region: "plus",
    description:
      "Поставщик фиников, изюма, орехов и специй. Развивающееся направление.",
    products: ["Финики", "Изюм", "Орехи", "Шафран"],
  },
  {
    slug: "egipet",
    name: "Египет",
    flag: "🇪🇬",
    region: "plus",
    description:
      "Экспорт цитрусовых, овощей и текстиля. Важный партнёр на Ближнем Востоке.",
    products: ["Цитрусовые", "Овощи", "Хлопок"],
  },
  {
    slug: "uae",
    name: "ОАЭ",
    flag: "🇦🇪",
    region: "plus",
    description:
      "Транзитный хаб и торговый центр. Логистика и реэкспорт в регион.",
    products: ["Специи", "Финики", "Орехи"],
  },
  {
    slug: "uzbekistan",
    name: "Узбекистан",
    flag: "🇺🇿",
    region: "plus",
    description:
      "Поставщик сухофруктов, орехов и хлопка. Традиционные торговые связи.",
    products: ["Сухофрукты", "Орехи", "Хлопок"],
  },
  {
    slug: "turtsiya",
    name: "Турция",
    flag: "🇹🇷",
    region: "plus",
    description:
      "Поставщик кураги, орехов, специй и текстиля. Мост между Европой и Азией.",
    products: ["Курага", "Орехи", "Специи"],
  },
  {
    slug: "vetnam",
    name: "Вьетнам",
    flag: "🇻🇳",
    region: "plus",
    description:
      "Экспорт кофе, кешью, перца и риса. Быстрорастущий торговый партнёр.",
    products: ["Кофе", "Кешью", "Перец", "Рис"],
  },
  {
    slug: "indoneziya",
    name: "Индонезия",
    flag: "🇮🇩",
    region: "plus",
    description:
      "Поставщик специй, кофе и какао. Крупнейшая экономика Юго-Восточной Азии.",
    products: ["Специи", "Кофе", "Какао"],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return countries.find((c) => c.slug === slug);
}
