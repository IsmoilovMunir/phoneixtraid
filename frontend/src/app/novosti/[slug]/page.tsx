import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import {
  buildMetadata,
  breadcrumbJsonLd,
  articleJsonLd,
} from "@/lib/seo";
import { newsArticles, getNewsBySlug } from "@/data/news";
import { formatDate } from "@/lib/utils";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return newsArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    return buildMetadata({
      title: "Новость",
      description: "Страница новости",
      path: `/novosti/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/novosti/${slug}`,
    image: article.image,
  });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Новости", url: "/novosti" },
    { name: article.title, url: `/novosti/${slug}` },
  ]);

  const jsonLd = articleJsonLd({
    title: article.title,
    description: article.excerpt,
    image: article.image,
    url: `/novosti/${slug}`,
    publishedAt: article.publishedAt,
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, jsonLd]} />
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Новости", href: "/novosti" },
              { label: article.title },
            ]}
          />
        </Container>
      </section>

      <article className="bg-cream py-12 md:py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
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

            <h1 className="font-serif text-3xl md:text-4xl tracking-[0.05em] text-green-dark leading-tight">
              {article.title}
            </h1>

            <div className="mt-8 aspect-[16/9] rounded-2xl border border-gold/20 bg-gradient-to-br from-green-light/20 to-green-dark/10 flex items-center justify-center">
              <span className="text-gold/20 font-serif text-6xl tracking-[0.3em] uppercase">
                {article.category.charAt(0)}
              </span>
            </div>

            <div
              className="mt-8 prose prose-green max-w-none text-green-dark/80 leading-relaxed [&>p]:mb-4"
              dangerouslySetInnerHTML={{ __html: article.content.trim() }}
            />

            <div className="mt-12 pt-8 border-t border-gold/20 flex flex-wrap gap-4">
              <Button href="/novosti" variant="outline">
                ← Все новости
              </Button>
              <Button href="/partneram">Стать партнёром</Button>
            </div>
          </div>
        </Container>
      </article>
    </>
  );
}
