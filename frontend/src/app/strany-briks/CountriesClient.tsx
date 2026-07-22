"use client";

import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useDictionary } from "@/components/i18n/LocaleProvider";
import { countries } from "@/data/countries";
import { cn } from "@/lib/utils";

type Filter = "all" | "brics" | "plus";

export default function CountriesClient() {
  const dict = useDictionary();
  const page = dict.countriesPage;
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = countries.filter((c) => {
    if (filter === "all") return true;
    return c.region === filter;
  });

  const filters = [
    { value: "all" as const, label: page.all },
    { value: "brics" as const, label: page.brics },
    { value: "plus" as const, label: page.plus },
  ];

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

          <div className="flex flex-wrap gap-3 mb-8">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm tracking-wide uppercase transition-colors border",
                  filter === f.value
                    ? "bg-gold text-green-dark border-gold"
                    : "border-gold/30 text-cream/80 hover:border-gold/60"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((country) => {
              const name =
                dict.countries[country.slug as keyof typeof dict.countries] ??
                country.name;
              return (
                <div
                  key={country.slug}
                  className="rounded-xl border border-gold/20 bg-white p-6 hover:border-gold/50 hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl" aria-hidden="true">
                      {country.flag}
                    </span>
                    <div>
                      <h2 className="font-serif text-lg text-green-dark">
                        {name}
                      </h2>
                      <span className="text-xs text-gold tracking-wide uppercase">
                        {country.region === "brics" ? page.brics : page.plus}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-green-dark/70 leading-relaxed mb-4">
                    {country.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {country.products.map((product) => (
                      <span
                        key={product}
                        className="text-xs px-2 py-1 rounded-full bg-green-dark/5 text-green-dark/60"
                      >
                        {product}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
