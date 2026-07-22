import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { ContactsContent } from "./ContactsContent";

export const metadata = buildMetadata({
  title: "Контакты",
  description:
    "Контакты Феникс Трейдинг: Москва (Калужское шоссе, Коммунарка) и Тегеран (Саадат-Абад). Тел. +7 (495) 129-57-77.",
  path: "/kontakty",
  keywords: [
    "контакты Феникс Трейдинг",
    "офис Москва Коммунарка",
    "офис Тегеран",
    "обратная связь",
  ],
});

export default function ContactsPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Контакты", url: "/kontakty" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <ContactsContent />
    </>
  );
}
