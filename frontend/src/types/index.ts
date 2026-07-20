export interface Product {
  slug: string;
  title: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  image: string;
  origin?: string;
  packaging?: string;
  features?: string[];
}

export type ProductCategory =
  | "orehi"
  | "sukhofrukty"
  | "spetsii"
  | "napitki"
  | "sladosti";

export interface ProductCategoryInfo {
  slug: ProductCategory;
  title: string;
  description: string;
  image: string;
}

export interface Country {
  slug: string;
  name: string;
  flag: string;
  region: "brics" | "plus";
  description: string;
  products: string[];
}

export interface NewsArticle {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
  category: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface BenefitItem {
  icon: string;
  title: string;
  description: string;
}

export interface DirectionItem {
  title: string;
  description: string;
  icon: string;
}
