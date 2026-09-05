"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight, Bot, Layers, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * One colour per pillar, drawn from the site's category palette: the platform
 * is procedure blue, security is the signal green used for every verified state
 * on the site, architecture is engineering amber. Three cards side by side in
 * one tone read as a single block; three tones let the eye pick the one it
 * came for.
 */
const PILLARS = [
  {
    icon: Bot,
    label: "Platform",
    title: "It does the work, not just the talking",
    body: "Plans a task, reads your documents, routes each step to the right local model, runs the tools and hands back a finished file.",
    href: "/platform",
    cta: "See the platform",
    visual: "loop" as const,
    ink: "#2338cc",
    well: "bg-accent-tint text-accent",
  },
  {
    icon: ShieldCheck,
    label: "Security",
    title: "Sovereignty you can verify",
    body: "Every crossing of the boundary is counted, every agent action is logged, and the whole system runs with no outbound route.",
    href: "/security",
    cta: "See the security model",
    visual: "boundary" as const,
    ink: "#0f8b55",
    well: "bg-[#e9f6ef] text-[#0f8b55]",
  },
  {
    icon: Layers,
    label: "Architecture",
    title: "Open weights, modular layers",
    body: "Swap the model, the vector store or the serving runtime without rewriting the workbench sitting on top of them.",
    href: "/architecture",
    cta: "See the architecture",
    visual: "layers" as const,
    ink: "#b0670f",
    well: "bg-[#fdf3e6] text-[#b0670f]",
  },
];

export function PillarCards() {
  return (
    <div className="mt-16 grid gap-4 lg:grid-cols-3">
      {PILLARS.map((p, i) => (
        <PillarCard key={p.label} pillar={p} index={i} />
      ))}
    </div>
  );
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof PILLARS)[number];
  index: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const Icon = pillar.icon;

  // The spotlight is written straight to CSS custom properties. Routing pointer
  // position through React state would re-render the card on every mouse move
  // for something the compositor can do on its own.
  const onMove = (event: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        ref={ref}
        href={pillar.href}
        onMouseMove={onMove}
        className="group relative block h-full overflow-hidden rounded-[18px] bg-surface p-8 shadow-e2 ring-1 ring-line/70 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-e3"
      >
        {/* the card's own colour, following the cursor */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), ${pillar.ink}14, transparent 70%)`,
          }}
        />
        {/* and a fixed wash at the head, so the tone reads before anyone hovers */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            background: `radial-gradient(120% 100% at 50% 0%, ${pillar.ink}0f, transparent 70%)`,
          }}
        />

        <div className="relative flex items-start justify-between">
          <span
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-[12px] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105",
              pillar.well,
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.7} />
          </span>

          <Visual kind={pillar.visual} ink={pillar.ink} live={inView && !reduce} />
        </div>

        <p className="label relative mt-10">{pillar.label}</p>
        <h3 className="display-sm relative mt-3 text-[21px]">{pillar.title}</h3>
        <p className="relative mt-4 text-[14.5px] leading-[1.6] text-body">{pillar.body}</p>

        <span className="relative mt-8 flex items-center gap-1.5 text-[13.5px] font-medium text-ink">
          {pillar.cta}
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            strokeWidth={2}
          />
          {/* the rule fills from the left on hover, so the link reads as a
              destination rather than a label with an arrow beside it */}
          <span
            aria-hidden
            className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
            style={{ background: pillar.ink }}
          />
        </span>
      </Link>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Mini visuals                                                        */
/* ------------------------------------------------------------------ */

/**
 * Each card carries a small running diagram of what its page contains — the
 * agent stepping through a task, the boundary being swept, a request descending
 * the stack. An icon says which section this is; these say what it does, which
 * is the job the card is actually here to do.
 */
function Visual({
  kind,
  ink,
  live,
}: {
  kind: "loop" | "boundary" | "layers";
  ink: string;
  live: boolean;
}) {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setBeat((b) => b + 1), 780);
    return () => clearInterval(id);
  }, [live]);

  if (kind === "boundary") {
    const swept = beat % 4;
    return (
      <span className="flex items-center gap-1" aria-hidden>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="flex h-7 w-6 items-center justify-center rounded-[6px] bg-veil/70 font-mono text-[11px] tabular-nums transition-colors duration-500"
            style={{
              color: swept === i ? ink : "#8a8a92",
              background: swept === i ? `${ink}14` : undefined,
            }}
          >
            0
          </span>
        ))}
      </span>
    );
  }

  const rows = 4;
  const active = beat % rows;

  return (
    <span className="flex w-[74px] flex-col gap-[5px]" aria-hidden>
      {Array.from({ length: rows }).map((_, i) => {
        // the loop ticks through and leaves work behind it; the stack shows one
        // request passing down and nothing persisting
        const on = kind === "loop" ? i <= active : i === active;
        return (
          <span
            key={i}
            className="h-[5px] rounded-full transition-all duration-500"
            style={{
              background: on ? ink : "#e7e4dc",
              opacity: on ? (kind === "loop" && i < active ? 0.45 : 1) : 1,
              width: kind === "layers" ? `${100 - i * 12}%` : "100%",
            }}
          />
        );
      })}
    </span>
  );
}
