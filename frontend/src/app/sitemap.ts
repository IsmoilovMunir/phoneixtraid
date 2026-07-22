import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { products, productCategories } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/o-kompanii",
    "/napravleniya",
    "/strany-briks",
    "/produktsiya",
    "/partneram",
    "/novosti",
    "/kontakty",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/produktsiya/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = productCategories.map((cat) => ({
    url: `${baseUrl}/produktsiya/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
