"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MENUS, NavMenu, type MenuKey } from "./nav-menu";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
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
  // which panel is open, and the timer that guards it
  const [open_, setOpen_] = useState<MenuKey | null>(null);
  const intent = useRef<ReturnType<typeof setTimeout> | null>(null);
  // the mobile sheet has no room for a panel, so it expands in place instead
  const [expanded, setExpanded] = useState<MenuKey | null>(null);

  // A menu that opens the instant a cursor crosses a trigger fires constantly
  // while someone is on their way somewhere else. Opening waits; closing waits
  // longer, so the gap between trigger and panel is survivable.
  const openLater = (key: MenuKey) => {
    if (intent.current) clearTimeout(intent.current);
    intent.current = setTimeout(() => setOpen_(key), open_ ? 40 : 130);
  };
  const closeLater = () => {
    if (intent.current) clearTimeout(intent.current);
    intent.current = setTimeout(() => setOpen_(null), 180);
  };
  const closeNow = () => {
    if (intent.current) clearTimeout(intent.current);
    setOpen_(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen_(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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

  useEffect(() => () => {
    if (intent.current) clearTimeout(intent.current);
  }, []);

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
          onMouseLeave={() => {
            setHovered(null);
            closeLater();
          }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-expanded={open_ === l.href}
              onFocus={() => setOpen_(l.href as MenuKey)}
              onClick={closeNow}
              onMouseEnter={() => {
                setHovered(l.href);
                openLater(l.href as MenuKey);
              }}
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

      {/* Desktop panel. It hangs from the same wrapper as the bar and sits
          flush under it — a gap here closes the menu while the cursor is on its
          way into it, which is the classic way this pattern breaks. */}
      <AnimatePresence>
        {open_ ? (
          <motion.div
            className="absolute inset-x-4 top-full hidden justify-center md:flex"
            onMouseEnter={() => {
              if (intent.current) clearTimeout(intent.current);
            }}
            onMouseLeave={closeLater}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="w-full max-w-[720px] overflow-hidden rounded-[20px] bg-paper/95 shadow-e3 ring-1 ring-line backdrop-blur-xl">
              {/* keyed on the open menu so the contents cross-fade when moving
                  between adjacent triggers, while the panel itself stays put */}
              <motion.div
                key={open_}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.18 }}
              >
                <NavMenu menuKey={open_} onNavigate={closeNow} />
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

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
          {LINKS.map((l) => {
            const key = l.href as MenuKey;
            const isOpen = expanded === key;
            return (
              <div key={l.href}>
                <div
                  className={cn(
                    "flex items-center rounded-[14px] transition-colors",
                    pathname.startsWith(l.href) ? "bg-ink/[0.05]" : "",
                  )}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex-1 px-4 py-3.5 text-[17px] tracking-[-0.015em]",
                      pathname.startsWith(l.href) ? "text-ink" : "text-body",
                    )}
                  >
                    {l.label}
                  </Link>
                  {/* separate control, so tapping the row still navigates —
                      making the whole row a toggle strands anyone who wanted
                      the page itself */}
                  <button
                    type="button"
                    aria-label={`${isOpen ? "Hide" : "Show"} ${l.label} sections`}
                    aria-expanded={isOpen}
                    onClick={() => setExpanded(isOpen ? null : key)}
                    className="flex h-11 w-11 items-center justify-center text-muted"
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                      strokeWidth={2}
                    />
                  </button>
                </div>

                <div
                  className={cn(
                    "overflow-hidden transition-[max-height,opacity] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0",
                  )}
                >
                  <ul className="space-y-0.5 pb-2 pl-4">
                    {MENUS[key].items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center justify-between rounded-[11px] px-4 py-2.5 text-[14.5px] text-body"
                        >
                          {item.label}
                          <ArrowRight className="h-3 w-3 text-line-2" strokeWidth={2} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
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
