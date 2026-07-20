import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-green-dark py-24 md:py-32">
      <Container className="text-center">
        <p className="font-serif text-8xl text-gold/30">404</p>
        <h1 className="font-serif text-3xl tracking-[0.15em] uppercase text-cream mt-4">
          Страница не найдена
        </h1>
        <p className="text-cream/70 mt-4 max-w-md mx-auto">
          Запрашиваемая страница не существует или была перемещена.
        </p>
        <div className="mt-8">
          <Button href="/">На главную</Button>
        </div>
      </Container>
    </section>
  );
}
