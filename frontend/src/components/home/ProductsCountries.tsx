"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { useDictionary } from "@/components/i18n/LocaleProvider";
import { countries } from "@/data/countries";
import { ProductCards } from "./ProductCards";

export function ProductsCountries() {
  const dict = useDictionary();
  const featuredCountries = countries.slice(0, 9);

  return (
    <section className="relative overflow-hidden bg-green-dark py-12 sm:py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-5 sm:gap-6 lg:gap-8 items-stretch">
          <div className="flex flex-col h-full rounded-2xl border-2 border-gold/50 bg-green-darker/30 p-4 sm:p-6 md:p-8">
            <SectionTitle
              title={dict.home.productsTitle}
              subtitle={dict.home.productsSubtitle}
              gold
            />
            <ProductCards />
            <div className="mt-auto pt-6 sm:pt-8 flex justify-center">
              <Button href="/produktsiya" variant="outline" size="md" className="gap-2 w-full sm:w-auto">
                {dict.home.catalogCta}
                <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col h-full rounded-2xl border-2 border-gold/50 bg-green-darker/30 p-4 sm:p-6 md:p-8">
            <SectionTitle
              title={dict.home.countriesTitle}
              subtitle={dict.home.countriesSubtitle}
              gold
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {featuredCountries.map((country) => {
                const name =
                  dict.countries[country.slug as keyof typeof dict.countries] ??
                  country.name;
                return (
                  <Link
                    key={country.slug}
                    href="/strany-briks"
                    className="flex items-center gap-2.5 sm:gap-3 min-h-12 p-3 sm:p-4 rounded-xl border border-gold/20 hover:border-gold/50 active:border-gold/50 bg-green-dark/50 transition-colors"
                  >
                    <span className="text-xl sm:text-2xl md:text-3xl shrink-0" aria-hidden="true">
                      {country.flag}
                    </span>
                    <span className="text-xs sm:text-sm text-cream/85 leading-tight">
                      {name}
                    </span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-auto pt-6 sm:pt-8 flex justify-center">
              <Button href="/strany-briks" variant="outline" size="md" className="gap-2 w-full sm:w-auto">
                {dict.home.allCountriesCta}
                <span aria-hidden="true">→</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
