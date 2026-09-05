"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Three claims about where the software runs, each in its own colour: the
 * perimeter in procedure blue, the hardware in engineering amber, the missing
 * network route in the signal green this site uses for anything verified.
 *
 * They are stacked rather than laid out as a third card grid — the pillars
 * directly above are already three across, and repeating that shape would make
 * the page read as one long grid.
 */
const FACTS = [
  {
    n: "01",
    title: "Installed, not accessed",
    body: "A desktop client on managed machines — no browser upload, no tenant, no account with anyone else.",
    visual: "perimeter" as const,
    ink: "#2338cc",
    well: "bg-accent-tint text-accent",
  },
  {
    n: "02",
    title: "Runs against your GPU",
    body: "Points at a workstation card or a shared on-premise inference server behind your firewall.",
    visual: "gpu" as const,
    ink: "#b0670f",
    well: "bg-[#fdf3e6] text-[#b0670f]",
  },
  {
    n: "03",
    title: "Works offline",
    body: "Once models are staged, the application needs no network route to do its job.",
    visual: "offline" as const,
    ink: "#0f8b55",
    well: "bg-[#e9f6ef] text-[#0f8b55]",
  },
];

export function ProductFacts() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const live = inView && !reduce;

  return (
    <div ref={ref} className="space-y-3">
      {FACTS.map((f, i) => (
        <motion.div
          key={f.n}
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* a rail down the indices, so three claims read as one argument */}
          {i < FACTS.length - 1 ? (
            <span
              aria-hidden
              className="absolute bottom-[-12px] left-[38px] top-[52px] w-px"
              style={{ background: `linear-gradient(${f.ink}40, ${FACTS[i + 1].ink}25)` }}
            />
          ) : null}

          <div
            className="group relative flex items-start gap-4 overflow-hidden rounded-[16px] bg-surface p-5 shadow-e1 ring-1 ring-line/70 transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-e2 sm:p-6"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-40 opacity-70"
              style={{
                background: `radial-gradient(100% 120% at 0% 50%, ${f.ink}0d, transparent 70%)`,
              }}
            />

            <span
              className={cn(
                "relative flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] font-mono text-[12px] tabular-nums transition-transform duration-500 group-hover:scale-105",
                f.well,
              )}
            >
              {f.n}
            </span>

            <div className="relative min-w-0 flex-1">
              <p className="text-[16px] font-medium tracking-[-0.01em] text-ink">{f.title}</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-body">{f.body}</p>
            </div>

            <Visual kind={f.visual} ink={f.ink} live={live} />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */

/**
 * Each claim gets a small running diagram rather than an icon. "Works offline"
 * is a claim about something that does not happen, and a picture of nothing
 * happening — bars reaching for a signal and falling back — argues it better
 * than a crossed-out cloud does.
 */
function Visual({
  kind,
  ink,
  live,
}: {
  kind: "perimeter" | "gpu" | "offline";
  ink: string;
  live: boolean;
}) {
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (!live) return;
    const id = setInterval(() => setBeat((b) => b + 1), 1150);
    return () => clearInterval(id);
  }, [live]);

  if (kind === "perimeter") {
    return (
      <span
        aria-hidden
        className="relative hidden h-9 w-[58px] shrink-0 self-center rounded-[8px] sm:block"
        style={{ boxShadow: `inset 0 0 0 1px ${ink}33` }}
      >
        {/* the work moves, and never reaches the edge */}
        <motion.span
          className="absolute top-1/2 h-1.5 w-1.5 rounded-full"
          style={{ background: ink, marginTop: -3 }}
          animate={live ? { x: [8, 44, 8] } : { x: 8 }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </span>
    );
  }

  if (kind === "gpu") {
    return (
      <span
        aria-hidden
        className="hidden h-9 w-[58px] shrink-0 items-end gap-[3px] self-center sm:flex"
      >
        {[0.55, 0.85, 0.7, 1, 0.62].map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 rounded-[2px]"
            style={{ background: ink, opacity: 0.75 }}
            animate={live ? { height: [`${h * 60}%`, `${h * 100}%`, `${h * 45}%`] } : { height: "60%" }}
            transition={{
              duration: 1.6 + i * 0.21,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.12,
            }}
          />
        ))}
      </span>
    );
  }

  // three bars reaching for a signal and finding none, on a slow cycle
  const reach = beat % 3;
  return (
    <span
      aria-hidden
      className="hidden h-9 w-[58px] shrink-0 items-end justify-center gap-[4px] self-center sm:flex"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="w-[6px] rounded-[2px]"
          style={{ background: ink }}
          animate={{
            height: live && reach === i ? `${34 + i * 18}%` : "18%",
            opacity: live && reach === i ? 0.55 : 0.16,
          }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </span>
  );
}
