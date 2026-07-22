"use client";

import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { useDictionary } from "@/components/i18n/LocaleProvider";

export function AboutContent() {
  const dict = useDictionary();
  const about = dict.about;

  const values = [
    { title: about.missionTitle, text: about.missionText },
    { title: about.visionTitle, text: about.visionText },
    { title: about.valuesTitle, text: about.valuesText },
  ];

  return (
    <>
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: dict.common.home, href: "/" },
              { label: about.title },
            ]}
          />
          <SectionTitle title={about.title} subtitle={about.subtitle} />
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-2xl tracking-[0.1em] uppercase text-green-dark mb-6">
                {about.historyTitle}
              </h2>
              <div className="space-y-4 text-green-dark/80 leading-relaxed">
                {about.history.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="aspect-[4/3] rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-green-light to-green-dark flex items-center justify-center">
              <div className="text-center p-8">
                <p className="font-serif text-5xl text-gold tracking-[0.2em]">20+</p>
                <p className="text-cream/70 mt-2 tracking-wide uppercase text-sm">
                  {about.partnersLabel}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {values.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-gold/20 bg-white"
              >
                <h3 className="font-serif text-lg tracking-[0.15em] uppercase text-green-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-green-dark/70 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/partneram">{about.becomePartner}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
