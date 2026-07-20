import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import {
  buildMetadata,
  breadcrumbJsonLd,
  productJsonLd,
} from "@/lib/seo";
import {
  products,
  productCategories,
  getProductBySlug,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/data/products";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const productSlugs = products.map((p) => ({ slug: p.slug }));
  const categorySlugs = productCategories.map((c) => ({ slug: c.slug }));
  return [...productSlugs, ...categorySlugs];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const category = getCategoryBySlug(slug as Parameters<typeof getCategoryBySlug>[0]);

  if (product) {
    return buildMetadata({
      title: `${product.title} оптом`,
      description: product.description,
      path: `/produktsiya/${slug}`,
      keywords: [product.title, "оптом", "БРИКС"],
      image: product.image,
    });
  }

  if (category) {
    return buildMetadata({
      title: `${category.title} оптом`,
      description: category.description,
      path: `/produktsiya/${slug}`,
      keywords: [category.title, "оптом", "оптовые поставки"],
    });
  }

  return buildMetadata({
    title: "Продукция",
    description: "Каталог продукции",
    path: `/produktsiya/${slug}`,
    noIndex: true,
  });
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const category = getCategoryBySlug(slug as Parameters<typeof getCategoryBySlug>[0]);

  if (!product && !category) {
    notFound();
  }

  if (category) {
    const categoryProducts = getProductsByCategory(category.slug);
    const breadcrumbs = breadcrumbJsonLd([
      { name: "Главная", url: "/" },
      { name: "Продукция", url: "/produktsiya" },
      { name: category.title, url: `/produktsiya/${slug}` },
    ]);

    return (
      <>
        <JsonLd data={breadcrumbs} />
        <section className="bg-green-dark py-12 md:py-16">
          <Container>
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Продукция", href: "/produktsiya" },
                { label: category.title },
              ]}
            />
            <h1 className="font-serif text-3xl md:text-4xl tracking-[0.15em] uppercase text-cream">
              {category.title}
            </h1>
            <p className="mt-4 text-cream/70 max-w-2xl">{category.description}</p>
          </Container>
        </section>

        <section className="bg-cream py-12 md:py-16">
          <Container>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryProducts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/produktsiya/${p.slug}`}
                  className="group rounded-xl border border-gold/20 bg-white overflow-hidden hover:border-gold/50 hover:shadow-lg transition-all"
                >
                  <div className="aspect-[16/10] bg-gradient-to-br from-green-light/20 to-green-dark/10 flex items-center justify-center">
                    <span className="text-5xl opacity-30" aria-hidden="true">📦</span>
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

  const cat = productCategories.find((c) => c.slug === product!.category);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Продукция", url: "/produktsiya" },
    ...(cat
      ? [{ name: cat.title, url: `/produktsiya/${cat.slug}` }]
      : []),
    { name: product!.title, url: `/produktsiya/${slug}` },
  ]);

  const jsonLd = productJsonLd({
    name: product!.title,
    description: product!.description,
    image: product!.image,
    url: `/produktsiya/${slug}`,
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, jsonLd]} />
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Продукция", href: "/produktsiya" },
              ...(cat
                ? [{ label: cat.title, href: `/produktsiya/${cat.slug}` }]
                : []),
              { label: product!.title },
            ]}
          />
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-green-light/20 to-green-dark/10 flex items-center justify-center">
              <span className="text-8xl opacity-20" aria-hidden="true">📦</span>
            </div>

            <div>
              {cat && (
                <span className="text-xs text-gold tracking-wide uppercase">
                  {cat.title}
                </span>
              )}
              <h1 className="font-serif text-3xl md:text-4xl tracking-[0.1em] uppercase text-green-dark mt-2">
                {product!.title}
              </h1>
              <p className="mt-4 text-green-dark/80 leading-relaxed">
                {product!.description}
              </p>

              <dl className="mt-8 space-y-4">
                {product!.origin && (
                  <div>
                    <dt className="text-xs text-gold tracking-wide uppercase">
                      Происхождение
                    </dt>
                    <dd className="text-green-dark mt-1">{product!.origin}</dd>
                  </div>
                )}
                {product!.packaging && (
                  <div>
                    <dt className="text-xs text-gold tracking-wide uppercase">
                      Фасовка
                    </dt>
                    <dd className="text-green-dark mt-1">{product!.packaging}</dd>
                  </div>
                )}
              </dl>

              {product!.features && (
                <ul className="mt-6 space-y-2">
                  {product!.features.map((f) => (
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
                <Button href="/partneram">Запросить цену</Button>
                <Button href="/kontakty" variant="outline">
                  Связаться с нами
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
