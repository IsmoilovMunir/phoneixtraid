import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logoImg from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  priority?: boolean;
  /**
   * Высота на десктопе (px). На мобиле меньше через CSS.
   * Передайте `responsive={false}`, чтобы зафиксировать высоту.
   */
  height?: number;
  responsive?: boolean;
}

export function Logo({
  className,
  priority = false,
  height = 144,
  responsive = true,
}: LogoProps) {
  const width = Math.round(height * (6684 / 2895));

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center max-w-full", className)}
      aria-label="Феникс Трейдинг — на главную"
    >
      <Image
        src={logoImg}
        alt="Феникс Трейдинг — группа компаний"
        width={width}
        height={height}
        priority={priority}
        sizes="(max-width: 640px) 260px, (max-width: 1024px) 280px, 332px"
        className={cn(
          "object-contain object-start w-auto max-w-full",
          responsive
            ? "h-16 sm:h-[72px] md:h-[88px] lg:h-[112px]"
            : undefined
        )}
        style={responsive ? undefined : { height: `${height}px`, width: "auto" }}
      />
    </Link>
  );
}
