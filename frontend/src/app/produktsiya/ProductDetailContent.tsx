"use client";

import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { useDictionary } from "@/components/i18n/LocaleProvider";
import type { Product, ProductCategoryInfo } from "@/types";

type CategorySlug = keyof ReturnType<typeof useDictionary>["productCategories"];

export function CategoryDetailContent({
  category,
  products,
}: {
  category: ProductCategoryInfo;
  products: Product[];
}) {
  const dict = useDictionary();
  const catCopy = dict.productCategories[category.slug as CategorySlug];

  return (
    <>
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: dict.common.home, href: "/" },
              { label: dict.nav.products, href: "/produktsiya" },
              { label: catCopy?.title ?? category.title },
            ]}
          />
          <h1 className="font-serif text-3xl md:text-4xl tracking-[0.15em] uppercase text-cream">
            {catCopy?.title ?? category.title}
          </h1>
          <p className="mt-4 text-cream/70 max-w-2xl">
            {catCopy?.description ?? category.description}
          </p>
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <Link
                key={p.slug}
                href={`/produktsiya/${p.slug}`}
                className="group rounded-xl border border-gold/20 bg-white overflow-hidden hover:border-gold/50 hover:shadow-lg transition-all"
              >
                <div className="aspect-[16/10] bg-gradient-to-br from-green-light/20 to-green-dark/10 flex items-center justify-center">
                  <span className="text-5xl opacity-30" aria-hidden="true">
                    📦
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="font-serif text-lg text-green-dark group-hover:text-gold transition-colors">
                    {p.title}
                  </h2>
                  <p className="mt-2 text-sm text-green-dark/60">
                    {p.shortDescription}
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

export function ProductDetailContent({
  product,
  category,
}: {
  product: Product;
  category?: ProductCategoryInfo;
}) {
  const dict = useDictionary();
  const catCopy = category
    ? dict.productCategories[category.slug as CategorySlug]
    : undefined;

  return (
    <>
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: dict.common.home, href: "/" },
              { label: dict.nav.products, href: "/produktsiya" },
              ...(category
                ? [
                    {
                      label: catCopy?.title ?? category.title,
                      href: `/produktsiya/${category.slug}`,
                    },
                  ]
                : []),
              { label: product.title },
            ]}
          />
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-green-light/20 to-green-dark/10 flex items-center justify-center">
              <span className="text-8xl opacity-20" aria-hidden="true">
                📦
              </span>
            </div>

            <div>
              {category && (
                <span className="text-xs text-gold tracking-wide uppercase">
                  {catCopy?.title ?? category.title}
                </span>
              )}
              <h1 className="font-serif text-3xl md:text-4xl tracking-[0.1em] uppercase text-green-dark mt-2">
                {product.title}
              </h1>
              <p className="mt-4 text-green-dark/80 leading-relaxed">
                {product.description}
              </p>

              <dl className="mt-8 space-y-4">
                {product.origin && (
                  <div>
                    <dt className="text-xs text-gold tracking-wide uppercase">
                      {dict.productsPage.origin}
                    </dt>
                    <dd className="text-green-dark mt-1">{product.origin}</dd>
                  </div>
                )}
                {product.packaging && (
                  <div>
                    <dt className="text-xs text-gold tracking-wide uppercase">
                      {dict.productsPage.packaging}
                    </dt>
                    <dd className="text-green-dark mt-1">{product.packaging}</dd>
                  </div>
                )}
              </dl>

              {product.features && (
                <ul className="mt-6 space-y-2">
                  {product.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-green-dark/70"
                    >
                      <span className="text-gold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-wrap gap-4">
                <Button href="/partneram">{dict.productsPage.requestPrice}</Button>
                <Button href="/kontakty" variant="outline">
                  {dict.common.contactUs}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
