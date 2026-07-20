import { Container } from "@/components/layout/Container";
import { benefits } from "@/data/benefits";

export function Benefits() {
  return (
    <section className="bg-cream py-12 sm:py-16 md:py-20">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {benefits.map((benefit, index) => {
            const isLast = index === benefits.length - 1;
            return (
              <div
                key={benefit.title}
                className={[
                  "flex flex-col items-center text-center px-4 sm:px-5 md:px-7 py-7 sm:py-8 lg:py-6 group",
                  !isLast ? "border-b-2 border-gold/40" : "",
                  "sm:border-gold/40",
                  index % 2 === 0 ? "sm:border-r-2" : "",
                  index < 2 ? "sm:border-b-2" : "sm:border-b-0",
                  index === 4 ? "sm:col-span-2 sm:border-r-0 sm:border-t-2 lg:col-span-1 lg:border-t-0" : "",
                  "lg:border-b-0 lg:border-t-0 lg:col-span-1",
                  !isLast ? "lg:border-r-2" : "lg:border-r-0",
                ].join(" ")}
              >
                <div className="text-gold mb-5 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="font-serif text-base md:text-lg tracking-[0.12em] uppercase text-green-dark mb-3 leading-snug">
                  {benefit.title}
                </h3>
                <p className="text-sm text-green-dark/65 leading-relaxed max-w-[220px]">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
