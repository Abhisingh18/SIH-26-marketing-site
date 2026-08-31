"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#platform", label: "Platform" },
  { href: "#solutions", label: "Solutions" },
  { href: "#security", label: "Security" },
  { href: "#architecture", label: "Architecture" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1180px] items-center gap-8 px-5 sm:px-8">
        <Link href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logomark />
          <span className="text-[15px] font-medium tracking-[-0.01em] text-ink">Sovereign</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13.5px] text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="#demo"
            className="hidden h-9 items-center rounded-full bg-ink px-4 text-[13px] font-medium text-paper transition-colors hover:bg-accent sm:inline-flex"
          >
            Request Demo
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-paper px-5 pb-8 pt-4 md:hidden">
          <nav className="flex flex-col">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 text-[18px] text-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            href="#demo"
            onClick={() => setOpen(false)}
            className="mt-6 flex h-11 items-center justify-center rounded-full bg-ink text-[14px] font-medium text-paper"
          >
            Request Demo
          </Link>
        </div>
      ) : null}
    </header>
  );
}

export function Logomark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-[22px] w-[22px]", className)}
      aria-hidden
      fill="none"
    >
      <path
        d="M12 2.2 20.4 5.4v6.1c0 4.9-3.4 9.2-8.4 10.3-5-1.1-8.4-5.4-8.4-10.3V5.4L12 2.2Z"
        className="fill-ink"
      />
      <path
        d="M12 7.4v9.3M8.2 10.1 12 7.4l3.8 2.7"
        className="stroke-paper"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
