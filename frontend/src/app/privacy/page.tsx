import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Политика обработки персональных данных",
  description:
    "Политика обработки персональных данных ООО «Феникс Трейдинг» в соответствии с 152-ФЗ.",
  path: "/privacy",
  noIndex: true,
});

export default function PrivacyPage() {
  return (
    <section className="bg-cream py-12 md:py-16">
      <Container>
        <div className="max-w-3xl mx-auto prose prose-green">
          <h1 className="font-serif text-3xl tracking-[0.1em] uppercase text-green-dark">
            Политика обработки персональных данных
          </h1>
          <p className="text-green-dark/70 mt-4 leading-relaxed">
            Настоящая политика определяет порядок обработки и защиты персональных
            данных пользователей сайта phoenix-trading.ru в соответствии с
            Федеральным законом № 152-ФЗ «О персональных данных».
          </p>
          <h2 className="font-serif text-xl text-green-dark mt-8">
            1. Сбор данных
          </h2>
          <p className="text-green-dark/70 leading-relaxed">
            Мы собираем персональные данные, которые вы добровольно предоставляете
            через формы обратной связи: имя, email, телефон, название компании.
          </p>
          <h2 className="font-serif text-xl text-green-dark mt-8">
            2. Использование cookie и аналитики
          </h2>
          <p className="text-green-dark/70 leading-relaxed">
            Сайт использует файлы cookie и сервисы Яндекс.Метрика и Google
            Analytics для анализа посещаемости. Данные собираются только после
            вашего согласия через баннер cookie.
          </p>
          <h2 className="font-serif text-xl text-green-dark mt-8">
            3. Контакты
          </h2>
          <p className="text-green-dark/70 leading-relaxed">
            По вопросам обработки персональных данных обращайтесь:{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-gold">
              {siteConfig.email}
            </a>
          </p>
          <div className="mt-8">
            <Link href="/" className="text-gold hover:underline">
              ← На главную
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
