"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { LiveDot } from "@/components/ui/primitives";

const COUNTERS = [
  { label: "External API calls", value: "00" },
  { label: "Cloud AI requests", value: "00" },
  { label: "Outbound connections", value: "00" },
  { label: "Data uploads", value: "00" },
];

const SERVICES = [
  { label: "Local LLM", state: "Online" },
  { label: "Local VLM", state: "Online" },
  { label: "Local RAG", state: "Online" },
  { label: "Local OCR", state: "Online" },
  { label: "Sandbox", state: "Secure" },
  { label: "Audit log", state: "Writing" },
];

/**
 * One beat per second, one service probed every other beat — so a full sweep of
 * the six services takes twelve seconds and the "last check" counter has
 * something real to count back to. Faster and the panel starts to fidget; the
 * claim it is making is that nothing is happening.
 */
const BEAT_MS = 1000;
const BEATS_PER_PROBE = 2;
const SWEEP_BEATS = SERVICES.length * BEATS_PER_PROBE;

/**
 * The clock is seeded from a fixed offset rather than `Date.now`, so the server
 * and the client agree on the first frame. It only has to be plausible, and it
 * has to match the "47 days" the copy underneath already claims.
 */
const UPTIME_DAYS = 47;
const UPTIME_BASE_S = 14 * 3600 + 22 * 60 + 5;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function uptime(elapsed: number) {
  const total = UPTIME_BASE_S + elapsed;
  const days = UPTIME_DAYS + Math.floor(total / 86400);
  return `${days}d ${pad(Math.floor(total / 3600) % 24)}:${pad(Math.floor(total / 60) % 60)}:${pad(total % 60)}`;
}

export function SovereigntyMonitor({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // not `once` — the panel stops keeping time when it scrolls out of view
  const inView = useInView(ref, { margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setBeat((b) => b + 1), BEAT_MS);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const sinceSweep = beat % SWEEP_BEATS;
  // -1 parks the sweep entirely for reduced motion, so no row is singled out
  const probing = reduce ? -1 : Math.floor(sinceSweep / BEATS_PER_PROBE);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-[20px] bg-obsidian p-7 shadow-e3 sm:p-9",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.05] to-transparent" />

      <div className="relative flex items-center justify-between">
        <p className="label text-white/40">Sovereignty Monitor</p>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
          <LiveDot />
          Live
        </span>
      </div>

      <div className="rule-sweep relative mt-6 h-px" />

      <dl className="relative mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] bg-white/[0.06]">
        {COUNTERS.map((c) => (
          <div key={c.label} className="bg-obsidian px-5 py-6">
            <dd className="font-mono text-[34px] leading-none tracking-[-0.03em] text-paper">
              {c.value}
            </dd>
            <dt className="mt-3 text-[12.5px] leading-snug text-paper/50">{c.label}</dt>
          </div>
        ))}
      </dl>

      <p className="label relative mt-4 text-white/30">Since deployment · 47 days</p>

      {!compact ? (
        <ul className="relative mt-9 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SERVICES.map((s, i) => {
            const active = probing === i;
            return (
              <li
                key={s.label}
                className={cn(
                  "relative overflow-hidden rounded-[11px] px-3.5 py-3 transition-colors duration-700",
                  active ? "bg-white/[0.09]" : "bg-white/[0.04]",
                )}
              >
                {/* the probe itself, travelling through the row it is polling */}
                {active && !reduce ? (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
                    initial={{ x: "-120%" }}
                    animate={{ x: "420%" }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                ) : null}

                <p className="relative text-[12.5px] text-paper/85">{s.label}</p>
                <p className="relative mt-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-signal">
                  <span
                    className={cn("h-1 w-1 rounded-full bg-signal", active && "dot-live")}
                  />
                  {s.state}
                </p>
              </li>
            );
          })}
        </ul>
      ) : null}

      <div className="relative mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-white/[0.07] pt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-white/30">
        <span>
          Last check ·{" "}
          <span className="text-paper/60 tabular-nums">
            {reduce || sinceSweep === 0 ? "just now" : `${sinceSweep}s ago`}
          </span>
        </span>
        <span>
          Uptime <span className="text-paper/60 tabular-nums">{uptime(reduce ? 0 : beat)}</span>
        </span>
      </div>

      {/* A slow pass down the whole panel, painted last so it crosses the
          counter cells rather than disappearing behind them. The counters have
          to stay at zero, so the evidence that this thing is running has to
          come from the light on it rather than from a number moving. */}
      {inView && !reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent"
          initial={{ y: "-110%" }}
          animate={{ y: "310%" }}
          transition={{ duration: 6.5, ease: "linear", repeat: Infinity, repeatDelay: 3.5 }}
        />
      ) : null}
    </div>
  );
}
