import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Button } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "О компании",
  description:
    "ООО «Феникс Трейдинг» — центр международной торговли стран БРИКС+. Более 15 лет опыта в оптовых поставках продуктов питания.",
  path: "/o-kompanii",
  keywords: ["о компании Феникс Трейдинг", "международная торговля Москва"],
});

const values = [
  {
    title: "Миссия",
    text: "Содействовать развитию международной торговли между странами БРИКС+, обеспечивая надёжные поставки качественной продукции.",
  },
  {
    title: "Видение",
    text: "Стать ведущим центром торговли стран БРИКС+ в России, объединяя производителей и покупателей на всех континентах.",
  },
  {
    title: "Ценности",
    text: "Прозрачность, надёжность, качество и долгосрочные партнёрские отношения — основа нашей работы.",
  },
];

export default function AboutPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "О компании", url: "/o-kompanii" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "О компании" },
            ]}
          />
          <SectionTitle
            title="О компании"
            subtitle="Центр международной торговли стран БРИКС+ с 2010 года"
          />
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-serif text-2xl tracking-[0.1em] uppercase text-green-dark mb-6">
                Наша история
              </h2>
              <div className="space-y-4 text-green-dark/80 leading-relaxed">
                <p>
                  Компания «Феникс Трейдинг» была основана в 2010 году с целью
                  развития торговых связей между Россией и странами БРИКС. За
                  более чем 15 лет работы мы выросли из небольшой торговой
                  компании в полноценный центр международной торговли.
                </p>
                <p>
                  Сегодня мы работаем с партнёрами в более чем 50 странах мира,
                  специализируясь на оптовых поставках продуктов питания,
                  специй, напитков и других товарных групп.
                </p>
                <p>
                  Наш офис расположен в Москве, а логистическая сеть охватывает
                  ключевые торговые коридоры между Россией, Китаем, Индией,
                  Бразилией и другими странами БРИКС+.
                </p>
              </div>
            </div>

            <div className="aspect-[4/3] rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-green-light to-green-dark flex items-center justify-center">
              <div className="text-center p-8">
                <p className="font-serif text-5xl text-gold tracking-[0.2em]">15+</p>
                <p className="text-cream/70 mt-2 tracking-wide uppercase text-sm">
                  лет на рынке
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {values.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-xl border border-gold/20 bg-white"
              >
                <h3 className="font-serif text-lg tracking-[0.15em] uppercase text-green-dark mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-green-dark/70 leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/partneram">Стать партнёром</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
