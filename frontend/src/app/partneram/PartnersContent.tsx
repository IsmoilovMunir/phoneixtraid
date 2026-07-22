"use client";

import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { useDictionary } from "@/components/i18n/LocaleProvider";

export function PartnersContent() {
  const dict = useDictionary();
  const page = dict.partnersPage;

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
                {page.conditionsTitle}
              </h2>
              <div className="space-y-6">
                {page.conditions.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl border border-gold/20 bg-white"
                  >
                    <h3 className="font-serif text-sm tracking-[0.15em] uppercase text-gold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-green-dark/70 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl tracking-[0.1em] uppercase text-green-dark mb-8">
                {page.formTitle}
              </h2>
              <div className="p-6 rounded-xl border border-gold/20 bg-green-dark">
                <PartnerForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
