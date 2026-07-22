import type { Metadata } from "next";
import { Vollkorn, Vazirmatn } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { Analytics, CookieConsent } from "@/components/analytics/Analytics";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import { siteConfig } from "@/lib/config";
import { organizationJsonLd } from "@/lib/seo";
import { getLocale } from "@/i18n/get-locale";
import { getDictionary } from "@/i18n/get-dictionary";
import "./globals.css";

const vollkorn = Vollkorn({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-vollkorn",
  display: "swap",
});

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-vazirmatn",
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: siteConfig.name,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const isRtl = locale === "fa";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={`${vollkorn.variable} ${vazirmatn.variable}`}
      suppressHydrationWarning
    >
      <head>
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body
        className={`${
          isRtl ? vazirmatn.className : vollkorn.className
        } min-h-screen flex flex-col antialiased`}
        suppressHydrationWarning
      >
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieConsent />
          <Analytics />
        </LocaleProvider>
      </body>
    </html>
  );
}
