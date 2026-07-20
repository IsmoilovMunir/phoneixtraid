import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { productCategories, products } from "@/data/products";

export const metadata = buildMetadata({
  title: "Каталог продукции",
  description:
    "Орехи, сухофрукты, специи, напитки и сладости оптом из стран БРИКС+. Полный каталог продукции Феникс Трейдинг для оптовых закупок.",
  path: "/produktsiya",
  keywords: [
    "орехи оптом",
    "сухофрукты опт",
    "специи оптом",
    "чай оптом",
    "оптовые поставки продуктов",
  ],
});

export const revalidate = 3600;

const categoryEmojis: Record<string, string> = {
  orehi: "🥜",
  sukhofrukty: "🍇",
  spetsii: "🌶️",
  napitki: "☕",
  sladosti: "🍫",
};

export default function ProductsPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Продукция", url: "/produktsiya" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Продукция" },
            ]}
          />
          <SectionTitle
            title="Продукция"
            subtitle="Оптовые поставки из стран БРИКС+"
          />
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-16">
            {productCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/produktsiya/${cat.slug}`}
                className="group flex flex-col items-center p-6 rounded-xl border border-gold/20 bg-white hover:border-gold hover:shadow-lg transition-all"
              >
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform" aria-hidden="true">
                  {categoryEmojis[cat.slug]}
                </span>
                <h2 className="font-serif text-sm tracking-[0.1em] uppercase text-green-dark text-center">
                  {cat.title}
                </h2>
              </Link>
            ))}
          </div>

          {/* All products */}
          <h2 className="font-serif text-2xl tracking-[0.1em] uppercase text-green-dark mb-8">
            Все товары
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
                    {productCategories.find((c) => c.slug === product.category)?.title}
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
