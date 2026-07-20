import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { newsArticles } from "@/data/news";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Новости",
  description:
    "Новости компании Феникс Трейдинг: события, новые контракты, расширение ассортимента, участие в выставках и развитие торговли БРИКС+.",
  path: "/novosti",
  keywords: ["новости Феникс Трейдинг", "торговля БРИКС новости"],
});

export const revalidate = 3600;

export default function NewsPage() {
  const sorted = [...newsArticles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Новости", url: "/novosti" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Новости" },
            ]}
          />
          <SectionTitle title="Новости" subtitle="События и обновления компании" />
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sorted.map((article) => (
              <Link
                key={article.slug}
                href={`/novosti/${article.slug}`}
                className="group rounded-xl border border-gold/20 bg-white overflow-hidden hover:border-gold/50 hover:shadow-lg transition-all"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-green-light/20 to-green-dark/10 flex items-center justify-center">
                  <span className="text-gold/30 font-serif text-4xl tracking-[0.3em] uppercase">
                    {article.category.charAt(0)}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs text-gold tracking-wide uppercase">
                      {article.category}
                    </span>
                    <time
                      dateTime={article.publishedAt}
                      className="text-xs text-green-dark/50"
                    >
                      {formatDate(article.publishedAt)}
                    </time>
                  </div>
                  <h2 className="font-serif text-lg text-green-dark group-hover:text-gold transition-colors leading-snug">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-sm text-green-dark/60 line-clamp-3">
                    {article.excerpt}
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
