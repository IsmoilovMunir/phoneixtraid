"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { useDictionary } from "@/components/i18n/LocaleProvider";
import { productCategories, products } from "@/data/products";
import type { Dictionary } from "@/i18n/dictionaries/types";

const categoryEmojis: Record<string, string> = {
  orehi: "🥜",
  sukhofrukty: "🍇",
  bakaleya: "🛒",
  napitki: "☕",
  sladosti: "🍫",
};

type CategorySlug = keyof Dictionary["productCategories"];

export function ProductsContent() {
  const dict = useDictionary();
  const page = dict.productsPage;

  const getCategoryTitle = (slug: string) => {
    const key = slug as CategorySlug;
    return dict.productCategories[key]?.title ?? slug;
  };

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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-16">
            {productCategories.map((cat) => {
              const title = getCategoryTitle(cat.slug);
              return (
                <Link
                  key={cat.slug}
                  href={`/produktsiya/${cat.slug}`}
                  className="group flex flex-col items-center p-4 sm:p-6 rounded-xl border border-gold/20 bg-white hover:border-gold hover:shadow-lg transition-all"
                >
                  <div className="relative mb-3 h-20 w-full overflow-hidden rounded-lg bg-green-dark/5 transition-transform group-hover:scale-105">
                    <Image
                      src={cat.image}
                      alt={title}
                      fill
                      className="object-contain p-1"
                      sizes="160px"
                    />
                  </div>
                  <h2 className="font-serif text-sm tracking-[0.1em] uppercase text-green-dark text-center">
                    {title}
                  </h2>
                </Link>
              );
            })}
          </div>

          <h2 className="font-serif text-2xl tracking-[0.1em] uppercase text-green-dark mb-8">
            {page.allProducts}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Link
                key={product.slug}
                href={`/produktsiya/${product.slug}`}
                className="group rounded-xl border border-gold/20 bg-white overflow-hidden hover:border-gold/50 hover:shadow-lg transition-all"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-green-light/20 to-green-dark/10 flex items-center justify-center">
                  <span className="text-5xl opacity-30" aria-hidden="true">
                    {categoryEmojis[product.category]}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-xs text-gold tracking-wide uppercase">
                    {getCategoryTitle(product.category)}
                  </span>
                  <h3 className="font-serif text-lg text-green-dark group-hover:text-gold transition-colors mt-1">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-sm text-green-dark/60 line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
