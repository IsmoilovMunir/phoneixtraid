import type { Metadata } from "next";
import { Vollkorn } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics, CookieConsent } from "@/components/analytics/Analytics";
import { siteConfig } from "@/lib/config";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const vollkorn = Vollkorn({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-vollkorn",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — центр международной торговли БРИКС+`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords.join(", "),
  metadataBase: new URL(siteConfig.url),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={vollkorn.variable} suppressHydrationWarning>
      <head>
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body
        className={`${vollkorn.className} min-h-screen flex flex-col antialiased`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
