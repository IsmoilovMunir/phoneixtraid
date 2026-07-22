import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { ExportContent } from "./ExportContent";

export const metadata = buildMetadata({
  title: "Экспорт",
  description:
    "Экспорт продукции из России и стран-партнёров БРИКС+ в Афганистан и Иран. Оптовые поставки через офисы в Москве и Тегеране.",
  path: "/novosti",
  keywords: [
    "экспорт в Афганистан",
    "экспорт в Иран",
    "Феникс Трейдинг экспорт",
    "торговля БРИКС",
  ],
  image: "/images/news/export-afganistan-iran.png",
});

export const revalidate = 3600;

export default function ExportPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Экспорт", url: "/novosti" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <ExportContent />
    </>
  );
}
