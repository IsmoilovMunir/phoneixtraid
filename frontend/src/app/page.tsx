import { Hero } from "@/components/home/Hero";
import { Benefits } from "@/components/home/Benefits";
import { ProductsCountries } from "@/components/home/ProductsCountries";
import { CtaBanner } from "@/components/home/CtaBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Феникс Трейдинг — центр международной торговли стран БРИКС+",
  description:
    "Оптовые поставки продуктов питания, специй и напитков из России, Китая, Индии и других стран БРИКС+. Надёжный партнёр в международной торговле.",
  path: "/",
  keywords: [
    "торговля БРИКС",
    "оптовые поставки Россия Китай Индия",
    "импорт специй",
    "экспорт орехов",
  ],
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Benefits />
      <ProductsCountries />
      <CtaBanner />
    </>
  );
}
