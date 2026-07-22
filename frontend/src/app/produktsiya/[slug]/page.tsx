import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
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
import {
  CategoryDetailContent,
  ProductDetailContent,
} from "../ProductDetailContent";

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
  const category = getCategoryBySlug(
    slug as Parameters<typeof getCategoryBySlug>[0]
  );

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
  const category = getCategoryBySlug(
    slug as Parameters<typeof getCategoryBySlug>[0]
  );

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
        <CategoryDetailContent
          category={category}
          products={categoryProducts}
        />
      </>
    );
  }

  const cat = productCategories.find((c) => c.slug === product!.category);
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Продукция", url: "/produktsiya" },
    ...(cat ? [{ name: cat.title, url: `/produktsiya/${cat.slug}` }] : []),
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
      <ProductDetailContent product={product!} category={cat} />
    </>
  );
}
