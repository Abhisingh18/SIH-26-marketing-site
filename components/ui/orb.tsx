"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Shapes                                                              */
/* ------------------------------------------------------------------ */

/** a four-petal bloom, drawn once at unit scale and reused */
export const FLOWER =
  "M0 -1 C .34 -.72 .72 -.34 1 0 C .72 .34 .34 .72 0 1 C -.34 .72 -.72 .34 -1 0 C -.72 -.34 -.34 -.72 0 -1 Z";

/** a four-point star with concave sides — the same bloom, pulled in hard */
export const STAR =
  "M0 -1 C .18 -.32 .32 -.18 1 0 C .32 .18 .18 .32 0 1 C -.18 .32 -.32 .18 -1 0 C -.32 -.18 -.18 -.32 0 -1 Z";

export function burstPath(points = 12, inner = 0.84) {
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 1 : inner;
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"} ${(Math.cos(a) * r).toFixed(3)} ${(Math.sin(a) * r).toFixed(3)} `;
  }
  return `${d}Z`;
}

export const BURST = burstPath();
export const BURST_8 = burstPath(8, 0.72);

export const SHAPES = {
  flower: FLOWER,
  star: STAR,
  burst: BURST,
  cog: BURST_8,
} as const;

export type OrbShape = keyof typeof SHAPES;

/* ------------------------------------------------------------------ */
/* Standalone orb                                                      */
/* ------------------------------------------------------------------ */

/**
 * One of the wave's orbs, on its own and much larger.
 *
 * The gradient id comes from `useId` rather than a counter: several of these
 * mount and unmount as menus open and close, and a shared or reused id makes
 * every orb on the page pick up whichever definition rendered last.
 */
export function Orb({
  shape,
  from,
  to,
  turn = "26deg",
  duration = 22,
  className,
}: {
  shape: OrbShape;
  from: string;
  to: string;
  /** how far it rocks each way — direction is the sign */
  turn?: string;
  duration?: number;
  className?: string;
}) {
  const id = useId();

  return (
    <svg viewBox="-1.1 -1.1 2.2 2.2" className={cn("block", className)} aria-hidden>
      <defs>
        <linearGradient id={id} x1="0.15" y1="0" x2="0.85" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
      <path
        d={SHAPES[shape]}
        fill={`url(#${id})`}
        className="orb-turn"
        style={
          { ["--turn" as string]: turn, animationDuration: `${duration}s` } as React.CSSProperties
        }
      />
    </svg>
  );
}
