"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "/platform", label: "Platform" },
  { href: "/solutions", label: "Solutions" },
  { href: "/security", label: "Security" },
  { href: "/architecture", label: "Architecture" },
];

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "bg-paper/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1200px] items-center gap-10 px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Sovereign home">
          <Logomark />
          <span className="text-[15.5px] font-medium tracking-[-0.015em] text-ink">
            Sovereign
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                data-active={active}
                className={cn(
                  "link-underline text-[14px] transition-colors duration-300",
                  active ? "text-ink" : "text-body hover:text-ink",
                )}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            href="/demo"
            className="hidden h-9 items-center rounded-full bg-ink px-4 text-[13.5px] font-medium text-paper transition-colors duration-300 hover:bg-accent sm:inline-flex"
          >
            Request Demo
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink ring-1 ring-line md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-line bg-paper transition-[max-height] duration-500 md:hidden",
          open ? "max-h-[420px]" : "max-h-0 border-t-0",
        )}
      >
        <nav className="flex flex-col px-6 pb-8 pt-2">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 text-[19px] tracking-[-0.02em] text-ink"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/demo"
            onClick={() => setOpen(false)}
            className="mt-6 flex h-12 items-center justify-center rounded-full bg-ink text-[14.5px] font-medium text-paper"
          >
            Request Demo
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function Logomark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-[21px] w-[21px]", className)} aria-hidden fill="none">
      <path
        d="M12 2.4 20.2 5.5v5.9c0 4.8-3.3 9-8.2 10.2-4.9-1.2-8.2-5.4-8.2-10.2V5.5L12 2.4Z"
        className="fill-ink"
      />
      <path
        d="M12 7.6v8.6M8.4 10.2 12 7.6l3.6 2.6"
        className="stroke-paper"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
