"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Button } from "@/components/ui/Button";
import { useDictionary } from "@/components/i18n/LocaleProvider";

export function ExportContent() {
  const dict = useDictionary();
  const page = dict.exportPage;

  return (
    <>
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: dict.common.home, href: "/" },
              { label: page.title },
            ]}
          />
          <SectionTitle title={page.title} subtitle={page.subtitle} />
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="relative mb-12 overflow-hidden rounded-2xl border-2 border-gold/30 shadow-lg">
            <div className="relative aspect-[21/9] min-h-[220px] sm:min-h-[280px] md:min-h-[340px]">
              <Image
                src="/images/news/export-afganistan-iran.png"
                alt={page.bannerAlt}
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-darker/95 via-green-dark/75 to-green-dark/30" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 md:max-w-2xl">
                <span className="mb-2 text-xs tracking-[0.2em] uppercase text-gold">
                  {page.badge}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-[0.06em] uppercase text-cream leading-tight">
                  {page.bannerTitle}
                </h2>
                <p className="mt-3 text-sm sm:text-base text-cream/80 leading-relaxed">
                  {page.bannerText}
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto max-w-3xl space-y-5 text-green-dark/80 leading-relaxed">
            {page.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href="/partneram">{page.becomePartner}</Button>
            <Button href="/kontakty" variant="outline">
              {page.contactUs}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
