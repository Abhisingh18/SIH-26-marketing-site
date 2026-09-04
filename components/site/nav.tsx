"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/solutions", label: "Solutions" },
  { href: "/security", label: "Security" },
  { href: "/architecture", label: "Architecture" },
];

export function Nav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = LINKS.find((l) => pathname.startsWith(l.href))?.href ?? null;
  // Hover wins over the current route, so the pill follows the cursor and
  // settles back onto the active page when the cursor leaves.
  const pillOn = hovered ?? active;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex justify-center px-4 transition-[padding] duration-500",
        scrolled ? "pt-3" : "pt-0",
      )}
    >
      <div
        className={cn(
          "grid w-full grid-cols-[1fr_auto_1fr] items-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled
            ? "h-[58px] max-w-[1128px] rounded-full bg-paper/70 pl-6 pr-2 shadow-e2 ring-1 ring-line/80 backdrop-blur-xl"
            : "h-[74px] max-w-[1216px] rounded-full px-2 sm:px-4",
        )}
      >
        <Link
          href="/"
          className="group flex w-fit items-center gap-2.5"
          aria-label="Sangam home"
        >
          <Logomark className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-px" />
          <span className="text-[16px] font-medium tracking-[-0.015em] text-ink">
            Sangam
          </span>
        </Link>

        <nav
          className="hidden items-center md:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={() => setHovered(l.href)}
              className={cn(
                "relative rounded-full px-4 py-2 text-[14px] transition-colors duration-300",
                pillOn === l.href ? "text-ink" : "text-body",
              )}
            >
              {pillOn === l.href ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-ink/[0.06]"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 34, mass: 0.7 }
                  }
                />
              ) : null}
              <span className="relative">{l.label}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Link
            href="/demo"
            className="group hidden h-10 items-center gap-1.5 rounded-full bg-ink pl-5 pr-4 text-[13.5px] font-medium text-paper shadow-e1 transition-all duration-300 hover:bg-accent hover:shadow-e2 sm:inline-flex"
          >
            Request demo
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              strokeWidth={2}
            />
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-surface/70 text-ink shadow-e1 ring-1 ring-line backdrop-blur transition-shadow duration-300 hover:shadow-e2 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* mobile sheet */}
      <div
        className={cn(
          "absolute inset-x-4 top-[76px] origin-top overflow-hidden rounded-[22px] bg-paper/95 shadow-e3 ring-1 ring-line backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden",
          open
            ? "pointer-events-auto max-h-[440px] scale-100 opacity-100"
            : "pointer-events-none max-h-0 scale-[0.98] opacity-0",
        )}
      >
        <nav className="flex flex-col p-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center justify-between rounded-[14px] px-4 py-3.5 text-[17px] tracking-[-0.015em] transition-colors",
                pathname.startsWith(l.href) ? "bg-ink/[0.05] text-ink" : "text-body",
              )}
            >
              {l.label}
              <ArrowRight className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} />
            </Link>
          ))}
          <Link
            href="/demo"
            onClick={() => setOpen(false)}
            className="mt-2 flex h-12 items-center justify-center gap-2 rounded-[14px] bg-ink text-[14.5px] font-medium text-paper"
          >
            Request demo
            <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

/**
 * Sangam — a confluence. Three streams (reasoning, vision, knowledge) meet and
 * continue as one, which is also what the orchestrator does with a task.
 */
export function Logomark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-[21px] w-[21px]", className)}
      aria-hidden
      fill="none"
      strokeWidth="1.85"
      strokeLinecap="round"
    >
      <path d="M12 3.4v17.2" className="stroke-ink" />
      <path d="M4.6 3.4c0 5.2 2.9 7.9 7.4 9.3" className="stroke-ink" />
      <path d="M19.4 3.4c0 5.2-2.9 7.9-7.4 9.3" className="stroke-ink" />
    </svg>
  );
}
