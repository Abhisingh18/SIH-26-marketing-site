import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Button({
  href = "#demo",
  variant = "primary",
  children,
  className,
}: {
  href?: string;
  variant?: "primary" | "ghost";
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex h-11 items-center gap-2 rounded-full px-5 text-[14px] font-medium transition-all duration-300",
        variant === "primary"
          ? "bg-ink text-paper hover:bg-accent"
          : "border border-line-strong bg-transparent text-ink hover:border-ink hover:bg-surface",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-soft",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function LiveDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex h-1.5 w-1.5", className)}>
      <span className="dot-live absolute inline-flex h-full w-full rounded-full bg-signal" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
    </span>
  );
}

export function Card({
  children,
  className,
  interactive = true,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-[16px] border border-line bg-surface p-6",
        interactive && "lift hover:border-line-strong",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Small monospace node used across the technical diagrams. */
export function Node({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "ink" | "soft";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-[10px] border px-3.5 py-2 text-center font-mono text-[11px] uppercase tracking-[0.1em]",
        tone === "default" && "border-line bg-surface text-ink-soft",
        tone === "soft" && "border-line bg-sand text-muted",
        tone === "accent" && "border-accent/25 bg-accent-soft text-accent",
        tone === "ink" && "border-ink bg-ink text-paper",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center", className)} aria-hidden>
      <span className="h-6 w-px bg-line-strong" />
      <svg width="9" height="6" viewBox="0 0 9 6" className="-mt-px fill-line-strong">
        <path d="M4.5 6 0 0h9L4.5 6Z" />
      </svg>
    </div>
  );
}
