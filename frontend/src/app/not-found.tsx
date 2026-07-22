"use client";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { useDictionary } from "@/components/i18n/LocaleProvider";

export default function NotFound() {
  const dict = useDictionary();

  return (
    <section className="bg-green-dark py-24 md:py-32">
      <Container className="text-center">
        <p className="font-serif text-8xl text-gold/30">404</p>
        <h1 className="font-serif text-3xl tracking-[0.15em] uppercase text-cream mt-4">
          {dict.notFound.title}
        </h1>
        <p className="text-cream/70 mt-4 max-w-md mx-auto">{dict.notFound.text}</p>
        <div className="mt-8">
          <Button href="/">{dict.notFound.home}</Button>
        </div>
      </Container>
    </section>
  );
}
