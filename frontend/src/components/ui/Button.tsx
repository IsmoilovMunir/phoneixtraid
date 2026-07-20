import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  children: React.ReactNode;
}

const variants = {
  primary:
    "bg-gold hover:bg-gold-light text-green-dark font-semibold border border-gold",
  outline:
    "border border-gold text-gold hover:bg-gold/10 font-semibold",
  ghost: "text-gold hover:bg-gold/10",
};

const sizes = {
  sm: "min-h-10 px-4 py-2.5 text-sm rounded-md",
  md: "min-h-11 px-6 py-3 text-sm rounded-lg",
  lg: "min-h-12 px-8 py-4 text-base rounded-lg",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center transition-colors duration-200 tracking-[0.1em] uppercase font-semibold",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
