export const siteConfig = {
  name: "Феникс Трейдинг",
  legalName: 'ООО "Феникс Трейдинг"',
  description:
    "Центр международной торговли стран БРИКС+. Оптовые поставки продуктов питания, специй и напитков из России, Китая, Индии и других стран.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://phoneixtraid.com",
  email: "info@phoneixtraid.com",
  phone: "+7 (495) 129-57-77",
  phoneHref: "+74951295777",
  address: {
    street: "Калужское шоссе, 22-й км, 10, павильон ОСТ24-028",
    city: "Москва",
    district: "поселение Коммунарка, НАО",
    country: "Россия",
    postalCode: "108802",
    full: "108802, Москва, Калужское шоссе, 22-й километр, 10, посе Коммунарка, Новомосковский административный округ, павильон ОСТ24-028",
  },
  addressTehran: {
    street: "бульвар Шахнаме, начало тупика Парванд (Parand), дом № 3, офис № 3",
    city: "Тегеран",
    district: "Саадат-Абад",
    country: "Иран",
    full: "г. Тегеран, район Саадат-Абад, бульвар Шахнаме, начало тупика Парванд (Parand), дом № 3, квартира (офис) № 3",
  },
  workingHours: "Пн–Пт: 9:00–18:00",
  social: {
    telegram: "https://t.me/phoenixtrading",
    whatsapp: "https://wa.me/74951295777",
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
