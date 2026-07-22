"use client";

import Link from "next/link";
import { getMainNav } from "@/data/navigation";
import { siteConfig } from "@/lib/config";
import { useDictionary } from "@/components/i18n/LocaleProvider";
import { Container } from "./Container";
import { NewsletterForm } from "../forms/NewsletterForm";
import { Logo } from "../ui/Logo";

export function Footer() {
  const dict = useDictionary();
  const mainNav = getMainNav(dict.nav);

  return (
    <footer className="bg-green-darker border-t border-gold/20">
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.2fr] gap-10">
          <div>
            <Logo height={96} responsive={false} className="mb-4" />
            <p className="text-cream/70 text-sm leading-relaxed mb-4">
              {dict.config.description}
            </p>
            <p className="text-cream/50 text-xs">{dict.config.legalName}</p>
          </div>

          <div>
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase text-gold mb-4">
              {dict.footer.navigation}
            </h3>
            <ul className="space-y-2">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase text-gold mb-4">
              {dict.footer.contacts}
            </h3>
            <address className="not-italic space-y-2 text-sm text-cream/70">
              <p>{dict.config.addressFull}</p>
              <p>
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="hover:text-gold transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-gold transition-colors"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p>{dict.config.workingHours}</p>
            </address>
          </div>

          <div>
            <h3 className="font-serif text-sm tracking-[0.2em] uppercase text-gold mb-4">
              {dict.footer.subscribe}
            </h3>
            <p className="text-sm text-cream/70 mb-4">
              {dict.footer.subscribeText}
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gold/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-cream/50">
          <p>
            © {new Date().getFullYear()} {dict.config.name}.{" "}
            {dict.footer.copyrightSuffix}
          </p>
          <p>{dict.common.bricsCenter}</p>
        </div>
      </Container>
    </footer>
  );
}
