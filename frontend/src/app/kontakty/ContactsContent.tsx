"use client";

import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ContactForm } from "@/components/forms/ContactForm";
import { useDictionary } from "@/components/i18n/LocaleProvider";
import { siteConfig } from "@/lib/config";

export function ContactsContent() {
  const dict = useDictionary();
  const page = dict.contactsPage;

  return (
    <>
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: dict.common.home, href: "/" },
              { label: page.title },
            ]}
          />
          <SectionTitle title={page.title} subtitle={page.subtitle} />
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl tracking-[0.1em] uppercase text-green-dark mb-8">
                {page.detailsTitle}
              </h2>

              <address className="not-italic space-y-6">
                <div>
                  <p className="text-xs text-gold tracking-wide uppercase mb-1">
                    {page.address}
                  </p>
                  <p className="text-green-dark">{dict.config.addressFull}</p>
                </div>
                <div>
                  <p className="text-xs text-gold tracking-wide uppercase mb-1">
                    {page.phone}
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
                    {page.email}
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
                    {page.workingHours}
                  </p>
                  <p className="text-green-dark">{dict.config.workingHours}</p>
                </div>
              </address>

              <div className="mt-8 aspect-[16/10] rounded-2xl border border-gold/20 overflow-hidden bg-green-dark/5">
                <iframe
                  title={page.mapTitle}
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
                {page.writeUs}
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
