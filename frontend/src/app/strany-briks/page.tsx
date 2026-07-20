import { buildMetadata } from "@/lib/seo";
import CountriesClient from "./CountriesClient";

export const metadata = buildMetadata({
  title: "Страны БРИКС+",
  description:
    "Торговые партнёры Феникс Трейдинг: Россия, Китай, Индия, Бразилия, ЮАР и другие страны БРИКС+. Оптовые поставки из более чем 50 стран.",
  path: "/strany-briks",
  keywords: [
    "страны БРИКС",
    "торговля Китай Россия",
    "поставки из Индии",
    "импорт из Бразилии",
  ],
});

export const revalidate = 3600;

export default function CountriesPage() {
  return <CountriesClient />;
}
