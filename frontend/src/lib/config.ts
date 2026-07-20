export const siteConfig = {
  name: "Феникс Трейдинг",
  legalName: 'ООО "Феникс Трейдинг"',
  description:
    "Центр международной торговли стран БРИКС+. Оптовые поставки продуктов питания, специй и напитков из России, Китая, Индии и других стран.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://phoenix-trading.ru",
  email: "info@phoneixtraid.com",
  phone: "+7 (495) 123-45-67",
  phoneHref: "+74951234567",
  address: {
    street: "Товарищеский пер., 8 стр. 1",
    city: "Москва",
    country: "Россия",
    postalCode: "105005",
    full: "105005, г. Москва, Товарищеский пер., 8 стр. 1",
  },
  workingHours: "Пн–Пт: 9:00–18:00",
  social: {
    telegram: "https://t.me/phoenixtrading",
    whatsapp: "https://wa.me/74951234567",
  },
  keywords: [
    "торговля БРИКС",
    "оптовые поставки",
    "импорт экспорт",
    "Феникс Трейдинг",
    "международная торговля",
    "Россия Китай Индия",
    "опт орехи",
    "сухофрукты оптом",
  ],
  revalidate: 3600,
} as const;

export const analyticsConfig = {
  yandexMetrikaId: process.env.NEXT_PUBLIC_YM_ID || "",
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || "",
} as const;
