import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { ContactsContent } from "./ContactsContent";

export const metadata = buildMetadata({
  title: "Контакты",
  description:
    "Контакты Феникс Трейдинг: Москва, Товарищеский пер., 8 стр. 1. Телефон, email, форма обратной связи. Центр международной торговли БРИКС+.",
  path: "/kontakty",
  keywords: [
    "контакты Феникс Трейдинг",
    "офис Москва торговля",
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
