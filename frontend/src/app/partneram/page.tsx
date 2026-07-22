import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { PartnersContent } from "./PartnersContent";

export const metadata = buildMetadata({
  title: "Партнёрам",
  description:
    "Условия сотрудничества с Феникс Трейдинг. Станьте нашим партнёром в международной торговле стран БРИКС+. Импорт, экспорт, логистика.",
  path: "/partneram",
  keywords: [
    "партнёрство БРИКС",
    "оптовые поставки партнёрам",
    "сотрудничество импорт экспорт",
  ],
});

export default function PartnersPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Партнёрам", url: "/partneram" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <PartnersContent />
    </>
  );
}
