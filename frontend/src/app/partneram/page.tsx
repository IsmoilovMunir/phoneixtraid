import { Container } from "@/components/layout/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PartnerForm } from "@/components/forms/PartnerForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Партнёрам",
  description:
    "Условия сотрудничества с Феникс Трейдинг. Станьте нашим партнёром в международной торговле стран БРИКС+. Импорт, экспорт, логистика.",
  path: "/partneram",
  keywords: [
    "партнёрство БРИКС",
    "оптовые поставки партнёрам",
    "сотрудничество импорт экспорт",
  ],
});

const conditions = [
  {
    title: "Минимальный заказ",
    text: "От 1 паллеты для стандартных позиций. Индивидуальные условия для крупных контрактов.",
  },
  {
    title: "Оплата",
    text: "Предоплата, аккредитив, отсрочка для постоянных партнёров. Работаем в рублях, юанях, долларах.",
  },
  {
    title: "Доставка",
    text: "EXW, FOB, CIF, DAP — любые условия Incoterms. Собственная логистика и проверенные перевозчики.",
  },
  {
    title: "Документы",
    text: "Полный пакет: сертификаты, декларации, фитосанитарные, ветеринарные. Таможенное оформление под ключ.",
  },
];

export default function PartnersPage() {
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Главная", url: "/" },
    { name: "Партнёрам", url: "/partneram" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <section className="bg-green-dark py-12 md:py-16">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Главная", href: "/" },
              { label: "Партнёрам" },
            ]}
          />
          <SectionTitle
            title="Партнёрам"
            subtitle="Станьте частью глобальной торговой сети БРИКС+"
          />
        </Container>
      </section>

      <section className="bg-cream py-12 md:py-16">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-2xl tracking-[0.1em] uppercase text-green-dark mb-8">
                Условия сотрудничества
              </h2>
              <div className="space-y-6">
                {conditions.map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-xl border border-gold/20 bg-white"
                  >
                    <h3 className="font-serif text-sm tracking-[0.15em] uppercase text-gold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-green-dark/70 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl tracking-[0.1em] uppercase text-green-dark mb-8">
                Заявка на партнёрство
              </h2>
              <div className="p-6 rounded-xl border border-gold/20 bg-green-dark">
                <PartnerForm />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
