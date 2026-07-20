import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

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
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Контакты" },
            ]}
          />
          <SectionTitle title="Контакты" subtitle="Свяжитесь с нами" />
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl tracking-[0.1em] uppercase text-green-dark mb-8">
                Реквизиты
              </h2>

              <address className="not-italic space-y-6">
                <div>
                  <p className="text-xs text-gold tracking-wide uppercase mb-1">
                    Адрес
                  </p>
                  <p className="text-green-dark">{siteConfig.address.full}</p>
                </div>
                <div>
                  <p className="text-xs text-gold tracking-wide uppercase mb-1">
                    Телефон
                  </p>
                  <a
                    href={`tel:${siteConfig.phoneHref}`}
                    className="text-green-dark hover:text-gold transition-colors"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gold tracking-wide uppercase mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-green-dark hover:text-gold transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gold tracking-wide uppercase mb-1">
                    Режим работы
                  </p>
                  <p className="text-green-dark">{siteConfig.workingHours}</p>
                </div>
              </address>

              {/* Map placeholder */}
              <div className="mt-8 aspect-[16/10] rounded-2xl border border-gold/20 overflow-hidden bg-green-dark/5">
                <iframe
                  title="Карта — офис Феникс Трейдинг, Москва, Товарищеский пер., 8"
                  src="https://yandex.ru/map-widget/v1/?um=constructor%3Aplaceholder&source=constructor"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 300 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl tracking-[0.1em] uppercase text-green-dark mb-8">
                Напишите нам
              </h2>
              <div className="p-6 rounded-xl border border-gold/20 bg-green-dark">
                <ContactForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
