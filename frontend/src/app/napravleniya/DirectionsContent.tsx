"use client";

import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { useDictionary } from "@/components/i18n/LocaleProvider";

const directionIcons = ["📦", "🚢", "🚛", "📋", "🏪", "🤝"] as const;

export function DirectionsContent() {
  const dict = useDictionary();
  const page = dict.directions;

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.items.map((dir, index) => (
              <div
                key={dir.title}
                className="p-6 rounded-xl border border-gold/20 bg-white hover:border-gold/50 transition-colors group"
              >
                <span
                  className="text-4xl mb-4 block group-hover:scale-110 transition-transform"
                  aria-hidden="true"
                >
                  {directionIcons[index]}
                </span>
                <h2 className="font-serif text-lg tracking-[0.1em] uppercase text-green-dark mb-3">
                  {dir.title}
                </h2>
                <p className="text-sm text-green-dark/70 leading-relaxed">
                  {dir.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/partneram">{page.cta}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
