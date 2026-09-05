import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/* ------------------------------------------------------------------ */

export function Button({
  href,
  variant = "primary",
  size = "md",
  arrow = false,
  children,
  className,
}: {
  href: string;
  variant?: "primary" | "secondary" | "light" | "outline-light";
  size?: "md" | "lg";
  arrow?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300",
        size === "md" ? "h-11 px-5 text-[14px]" : "h-12 px-6 text-[15px]",
        variant === "primary" &&
          "bg-ink text-paper shadow-e1 hover:bg-accent hover:shadow-e2",
        variant === "secondary" &&
          "bg-surface text-ink shadow-e1 ring-1 ring-line hover:shadow-e2 hover:ring-line-2",
        variant === "light" && "bg-paper text-ink hover:bg-white",
        variant === "outline-light" &&
          "text-paper ring-1 ring-white/20 hover:bg-white/8 hover:ring-white/40",
        className,
      )}
    >
      {children}
      {arrow ? (
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
          strokeWidth={2}
        />
      ) : null}
    </Link>
  );
}

/** Quiet inline link with an arrow — used to send people to sub-pages. */
export function TextLink({
  href,
  children,
  className,
  invert = false,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-[14px] font-medium transition-colors",
        invert ? "text-paper/70 hover:text-paper" : "text-ink hover:text-accent",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2}
      />
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Atoms                                                               */
/* ------------------------------------------------------------------ */

export function Label({
  children,
  className,
  invert = false,
}: {
  children: ReactNode;
  className?: string;
  invert?: boolean;
}) {
  return <p className={cn("label", invert && "text-white/40", className)}>{children}</p>;
}

export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-1.5 w-1.5", className)} aria-hidden>
      <span className="dot-live absolute inline-flex h-full w-full rounded-full bg-signal" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
    </span>
  );
}

/** Elevated panel. No border — the shadow carries the edge. */
export function Panel({
  children,
  className,
  hover = false,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "article" | "li";
}) {
  return (
    <As
      className={cn(
        "rounded-[18px] bg-surface shadow-e2 ring-1 ring-line/70",
        hover && "card-hover",
        className,
      )}
    >
      {children}
    </As>
  );
}
