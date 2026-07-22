import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { AboutContent } from "./AboutContent";

export const metadata = buildMetadata({
  title: "О компании",
  description:
    "ООО «Феникс Трейдинг» — центр международной торговли стран БРИКС+. Оптовые поставки продуктов питания, специй и сельхозпродукции. Офисы в Москве и Тегеране.",
  path: "/o-kompanii",
  keywords: ["о компании Феникс Трейдинг", "международная торговля Москва"],
});

export default function AboutPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "О компании", url: "/o-kompanii" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <AboutContent />
    </>
  );
}
