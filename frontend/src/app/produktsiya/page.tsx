import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { ProductsContent } from "./ProductsContent";

export const metadata = buildMetadata({
  title: "Каталог продукции",
  description:
    "Орехи, сухофрукты, бакалея, напитки и сладости оптом из стран БРИКС+. Полный каталог продукции Феникс Трейдинг для оптовых закупок.",
  path: "/produktsiya",
  keywords: [
    "орехи оптом",
    "сухофрукты опт",
    "бакалея оптом",
    "чай оптом",
    "оптовые поставки продуктов",
  ],
});

export const revalidate = 3600;

export default function ProductsPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Продукция", url: "/produktsiya" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <ProductsContent />
    </>
  );
}
