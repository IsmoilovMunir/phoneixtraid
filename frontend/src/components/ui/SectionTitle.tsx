import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
  gold?: boolean;
  className?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  title,
  subtitle,
  light = false,
  gold = false,
  className,
  align = "left",
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "mb-8 sm:mb-10",
        align === "center" && "text-center",
        className
      )}
    >
      <h2
        className={cn(
          "font-serif font-semibold text-2xl sm:text-3xl md:text-4xl tracking-[0.1em] sm:tracking-[0.15em] uppercase",
          gold
            ? "text-gold"
            : light
              ? "text-green-dark"
              : "text-cream"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg max-w-2xl font-normal",
            light ? "text-green-dark/70" : "text-cream/70",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "mt-3 sm:mt-4 h-0.5 w-14 sm:w-16 bg-gold",
          align === "center" && "mx-auto"
        )}
      />
    </div>
  );
}
