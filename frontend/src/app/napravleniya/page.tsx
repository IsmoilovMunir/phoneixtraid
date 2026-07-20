import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { Button } from "@/components/ui/Button";

export const metadata = buildMetadata({
  title: "Направления деятельности",
  description:
    "Импорт и экспорт продуктов питания, логистика, таможенное оформление, дистрибуция — основные направления деятельности Феникс Трейдинг.",
  path: "/napravleniya",
  keywords: ["импорт экспорт", "логистика БРИКС", "таможенное оформление"],
});

const directions = [
  {
    icon: "📦",
    title: "Импорт продукции",
    description:
      "Закупка и поставка продуктов питания, специй, напитков и других товаров из стран БРИКС+ на российский рынок. Полный цикл: от поиска поставщика до доставки на склад.",
  },
  {
    icon: "🚢",
    title: "Экспорт продукции",
    description:
      "Продвижение российской сельхозпродукции, орехов, мёда и других товаров на рынки Китая, Индии, Ближнего Востока и других стран.",
  },
  {
    icon: "🚛",
    title: "Логистика",
    description:
      "Организация мультимодальных перевозок: морские, железнодорожные, автомобильные и авиа. Оптимизация маршрутов и сроков доставки.",
  },
  {
    icon: "📋",
    title: "Таможенное оформление",
    description:
      "Полное таможенное сопровождение: декларирование, сертификация, получение разрешительных документов. Работа с ЕАЭС и третьими странами.",
  },
  {
    icon: "🏪",
    title: "Дистрибуция",
    description:
      "Развитие дистрибьюторской сети для продвижения импортной продукции в розничных сетях, HoReCa и на оптовых рынках.",
  },
  {
    icon: "🤝",
    title: "Консалтинг",
    description:
      "Консультации по выходу на новые рынки, анализ конъюнктуры, поиск партнёров и разработка торговых стратегий для стран БРИКС+.",
  },
];

export default function DirectionsPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Направления", url: "/napravleniya" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Направления" },
            ]}
          />
          <SectionTitle
            title="Направления"
            subtitle="Комплексные решения для международной торговли"
          />
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {directions.map((dir) => (
              <div
                key={dir.title}
                className="p-6 rounded-xl border border-gold/20 bg-white hover:border-gold/50 transition-colors group"
              >
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform" aria-hidden="true">
                  {dir.icon}
                </span>
                <h2 className="font-serif text-lg tracking-[0.1em] uppercase text-green-dark mb-3">
                  {dir.title}
                </h2>
                <p className="text-sm text-green-dark/70 leading-relaxed">
                  {dir.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button href="/partneram">Обсудить сотрудничество</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
