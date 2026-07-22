import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { DirectionsContent } from "./DirectionsContent";

export const metadata = buildMetadata({
  title: "Направления деятельности",
  description:
    "Импорт и экспорт продуктов питания, логистика, таможенное оформление, дистрибуция — основные направления деятельности Феникс Трейдинг.",
  path: "/napravleniya",
  keywords: ["импорт экспорт", "логистика БРИКС", "таможенное оформление"],
});

export default function DirectionsPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Направления", url: "/napravleniya" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <DirectionsContent />
    </>
  );
}
