import type { Product, ProductCategoryInfo } from "@/types";

export const productCategories: ProductCategoryInfo[] = [
  {
    slug: "orehi",
    title: "Орехи",
    description: "Фисташки, миндаль, грецкий орех и другие виды орехов оптом",
    image: "/images/products/orehi.png",
  },
  {
    slug: "sukhofrukty",
    title: "Сухофрукты",
    description: "Финики, изюм, курага и другие натуральные сухофрукты",
    image: "/images/products/sukhofrukty.png",
  },
  {
    slug: "bakaleya",
    title: "Бакалея",
    description:
      "Рис, крупы, мука, специи и другие бакалейные товары из стран БРИКС+",
    image: "/images/products/bakaleya.png",
  },
  {
    slug: "napitki",
    title: "Напитки",
    description: "Безалкогольные напитки, соки, вода и другие напитки оптом",
    image: "/images/products/napitki.png",
  },
  {
    slug: "sladosti",
    title: "Сладости",
    description: "Восточные сладости, шоколад, халва и кондитерские изделия",
    image: "/images/products/sladosti.png",
  },
];

export const products: Product[] = [
  {
    slug: "gretskiy-oreh",
    title: "Грецкий орех",
    category: "orehi",
    shortDescription: "Отборный грецкий орех в скорлупе и очищенный",
    description:
      "Высококачественный грецкий орех из регионов БРИКС+. Поставки в мешках и контейнерах. Полный пакет сертификатов качества.",
    image: "/images/products/gretskiy-oreh.jpg",
    origin: "Россия, Китай",
    packaging: "25 кг, 50 кг, контейнер",
    features: ["Экспортное качество", "Сертификация", "Прямые поставки"],
  },
  {
    slug: "mindal",
    title: "Миндаль",
    category: "orehi",
    shortDescription: "Миндаль сладкий и горький, целый и дроблёный",
    description:
      "Миндаль премиального качества из Ирана и Китая. Идеален для кондитерской промышленности и розничных сетей.",
    image: "/images/products/mindal.jpg",
    origin: "Иран, Китай",
    packaging: "10 кг, 25 кг",
    features: ["Калибровка", "Низкая влажность", "Долгий срок хранения"],
  },
  {
    slug: "keshyu",
    title: "Кешью",
    category: "orehi",
    shortDescription: "Кешью целый W320, W240, жареный и сырой",
    description:
      "Отборный кешью из Вьетнама и Индии. Различные калибры для оптовых закупок.",
    image: "/images/products/keshyu.jpg",
    origin: "Вьетнам, Индия",
    packaging: "11.34 кг, 22.68 кг",
    features: ["Разные калибры", "Жареный и сырой", "Vacuum упаковка"],
  },
  {
    slug: "kuraga",
    title: "Курага",
    category: "sukhofrukty",
    shortDescription: "Курага турецкая и узбекская, крупная и средняя",
    description:
      "Натуральная курага без серы. Прямые поставки из Турции и Узбекистана.",
    image: "/images/products/kuraga.jpg",
    origin: "Турция, Узбекистан",
    packaging: "5 кг, 10 кг, 25 кг",
    features: ["Без серы", "Яркий цвет", "Сочная текстура"],
  },
  {
    slug: "izyum",
    title: "Изюм",
    category: "sukhofrukty",
    shortDescription: "Изюм золотистый, чёрный, без косточек",
    description:
      "Изюм различных сортов из Узбекистана, Ирана и Афганистана для оптовых поставок.",
    image: "/images/products/izyum.jpg",
    origin: "Узбекистан, Иран",
    packaging: "10 кг, 25 кг",
    features: ["Без косточек", "Разные сорта", "Конкурентные цены"],
  },
  {
    slug: "kurkuma",
    title: "Куркума",
    category: "bakaleya",
    shortDescription: "Куркума молотая высшего качества",
    description:
      "Куркума из Индии с высоким содержанием куркумина. Для пищевой промышленности и HoReCa.",
    image: "/images/products/kurkuma.jpg",
    origin: "Индия",
    packaging: "25 кг, 50 кг",
    features: ["Высокий куркумин", "Яркий цвет", "Сертификаты"],
  },
  {
    slug: "chernyy-perets",
    title: "Чёрный перец",
    category: "bakaleya",
    shortDescription: "Чёрный перец горошком и молотый",
    description:
      "Чёрный перец из Индии и Вьетнама. Различные сорта для оптовых закупок.",
    image: "/images/products/chernyy-perets.jpg",
    origin: "Индия, Вьетнам",
    packaging: "25 кг, 50 кг",
    features: ["Ароматный", "Разные фракции", "Экспортное качество"],
  },
  {
    slug: "chay",
    title: "Чай",
    category: "napitki",
    shortDescription: "Чёрный и зелёный чай из Китая и Индии",
    description:
      "Широкий ассортимент чая для оптовых поставок. Чёрный, зелёный, травяной.",
    image: "/images/products/chay.jpg",
    origin: "Китай, Индия, Шри-Ланка",
    packaging: "20 кг, 40 кг",
    features: ["Разные сорта", "Private label", "Стабильное качество"],
  },
  {
    slug: "kofe",
    title: "Кофе",
    category: "napitki",
    shortDescription: "Зелёный и жареный кофе арабика и робуста",
    description:
      "Кофе из Бразилии, Вьетнама и Эthiopia. Зелёное зерно и обжаренный кофе.",
    image: "/images/products/kofe.jpg",
    origin: "Бразилия, Вьетнам",
    packaging: "60 кг мешок",
    features: ["SCA стандарты", "Разные происхождения", "Прямые контракты"],
  },
  {
    slug: "shokolad",
    title: "Шоколад",
    category: "sladosti",
    shortDescription: "Шоколадная продукция для оптовых поставок",
    description:
      "Шоколадные изделия и кондитерские полуфабрикаты из стран БРИКС+.",
    image: "/images/products/shokolad.jpg",
    origin: "Россия, Китай",
    packaging: "Короба, паллеты",
    features: ["Разные форматы", "Сертификация", "Стабильные поставки"],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCategoryBySlug(slug: string): ProductCategoryInfo | undefined {
  return productCategories.find((c) => c.slug === slug);
}
