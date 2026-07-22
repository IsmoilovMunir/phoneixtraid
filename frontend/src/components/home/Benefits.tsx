"use client";

import { Container } from "@/components/layout/Container";
import { useDictionary } from "@/components/i18n/LocaleProvider";
import { benefits } from "@/data/benefits";

export function Benefits() {
  const dict = useDictionary();

  return (
    <section className="bg-cream py-12 sm:py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit, index) => {
            const copy = dict.home.benefits[index];
            const title = copy?.title ?? benefit.title;
            const description = copy?.description ?? benefit.description;
            const isLast = index === benefits.length - 1;
            return (
              <div
                key={title}
                className={[
                  "flex flex-col items-center text-center px-4 sm:px-5 md:px-7 py-7 sm:py-8 lg:py-6 group",
                  !isLast ? "border-b-2 border-gold/40" : "",
                  "sm:border-gold/40",
                  index % 2 === 0 ? "sm:border-e-2" : "",
                  index < 2 ? "sm:border-b-2" : "sm:border-b-0",
                  index === 4 ? "sm:col-span-2 sm:border-e-0 sm:border-t-2 lg:col-span-1 lg:border-t-0" : "",
                  "lg:border-b-0 lg:border-t-0 lg:col-span-1",
                  !isLast ? "lg:border-e-2" : "lg:border-e-0",
                ].join(" ")}
              >
                <div className="text-gold mb-5 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="font-serif text-base md:text-lg tracking-[0.12em] uppercase text-green-dark mb-3 leading-snug">
                  {title}
                </h3>
                <p className="text-sm text-green-dark/65 leading-relaxed max-w-[220px]">
                  {description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
