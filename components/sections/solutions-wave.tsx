"use client";

import { motion, useReducedMotion, useTime, useTransform } from "motion/react";

/**
 * Two crossing waves carrying a handful of soft orbs, under the solutions hero.
 *
 * The waves are cubic approximations of a sine rather than hand-drawn curves, so
 * both are generated from the same node list and the mirrored one crosses the
 * first exactly at every midpoint. Drawing these by eye is how you end up with
 * two curves that nearly touch.
 *
 * The orbs travel the curve rather than sitting on it. Position is computed
 * from the sine the path approximates, not from CSS `offset-path`: the formula
 * is three lines, it gives exact control over speed and spacing per orb, and it
 * does not depend on a layout feature Safari only shipped in 16.
 */

const MID = 190;
const AMP = 60;
const HALF = 262;
const START = -70;
const NODES = 8;

/** cubic through alternating extremes — a clean sine at this segment count */
function wavePath(invert: boolean) {
  const y = (i: number) => (i % 2 === (invert ? 1 : 0) ? MID - AMP : MID + AMP);
  let d = `M ${START} ${y(0)}`;
  for (let i = 0; i < NODES; i++) {
    const x0 = START + i * HALF;
    const x1 = x0 + HALF;
    const k = HALF * 0.42;
    d += ` C ${x0 + k} ${y(i)}, ${x1 - k} ${y(i + 1)}, ${x1} ${y(i + 1)}`;
  }
  return d;
}

/** the analytic curve the cubic path approximates, so orbs sit on the drawn line */
const SPAN = NODES * HALF;

function waveY(x: number, invert: boolean) {
  const c = Math.cos((Math.PI * (x - START)) / HALF);
  return invert ? MID + AMP * c : MID - AMP * c;
}

type Orb = {
  /** where on the run it starts, 0-1 — spread so they never bunch */
  phase: number;
  /** seconds for one full crossing */
  travel: number;
  invert: boolean;
  size: number;
  shape: "flower" | "burst" | "star" | "orb";
  from: string;
  to: string;
  spin: string;
  dur: number;
  delay: number;
};

const ORBS: Orb[] = [
  {
    phase: 0.04,
    travel: 27,
    invert: false,
    size: 46,
    shape: "burst",
    from: "#f2d79a",
    to: "#e8f0c8",
    spin: "-10deg",
    dur: 9,
    delay: 0,
  },
  {
    phase: 0.21,
    travel: 31,
    invert: true,
    size: 52,
    shape: "flower",
    from: "#5b63e0",
    to: "#3f49d8",
    spin: "12deg",
    dur: 11,
    delay: 1.4,
  },
  {
    phase: 0.38,
    travel: 25,
    invert: false,
    size: 44,
    shape: "flower",
    from: "#8fa8f5",
    to: "#f0e2a8",
    spin: "-14deg",
    dur: 10,
    delay: 0.6,
  },
  {
    phase: 0.55,
    travel: 34,
    invert: true,
    size: 48,
    shape: "burst",
    from: "#e9d488",
    to: "#6fb772",
    spin: "9deg",
    dur: 12,
    delay: 2.1,
  },
  {
    phase: 0.72,
    travel: 29,
    invert: false,
    size: 44,
    shape: "star",
    from: "#f0855c",
    to: "#e0563f",
    spin: "-11deg",
    dur: 10.5,
    delay: 1,
  },
  {
    phase: 0.88,
    travel: 23,
    invert: true,
    size: 40,
    shape: "orb",
    from: "#a8d8bd",
    to: "#7fc9a2",
    spin: "8deg",
    dur: 13,
    delay: 0.3,
  },
];

/** a four-petal bloom, drawn once at unit scale and reused */
const FLOWER =
  "M0 -1 C .34 -.72 .72 -.34 1 0 C .72 .34 .34 .72 0 1 C -.34 .72 -.72 .34 -1 0 C -.72 -.34 -.34 -.72 0 -1 Z";

function burstPath(points = 12) {
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 1 : 0.84;
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    d += `${i === 0 ? "M" : "L"} ${(Math.cos(a) * r).toFixed(3)} ${(Math.sin(a) * r).toFixed(3)} `;
  }
  return `${d}Z`;
}

const BURST = burstPath();
const STAR =
  "M0 -1 C .18 -.32 .32 -.18 1 0 C .32 .18 .18 .32 0 1 C -.18 .32 -.32 .18 -1 0 C -.32 -.18 -.18 -.32 0 -1 Z";

export function SolutionsWave() {
  return (
    <svg
      viewBox="0 0 1600 380"
      className="pointer-events-none h-[190px] w-full sm:h-[240px]"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      fill="none"
    >
      <defs>
        {/* User space, not the path's bounding box: the rails run from -70 to
            2026 so the viewer only ever sees their middle, and an object-box
            gradient would put the fade off screen on one side and nowhere on
            the other. */}
        <linearGradient
          id="sw-rail"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="1600"
          y2="0"
        >
          <stop offset="0%" stopColor="#dfe3fa" stopOpacity="0" />
          <stop offset="18%" stopColor="#dfe3fa" stopOpacity="1" />
          <stop offset="82%" stopColor="#e6e2f6" stopOpacity="1" />
          <stop offset="100%" stopColor="#e6e2f6" stopOpacity="0" />
        </linearGradient>
        {ORBS.map((o, i) => (
          <linearGradient
            key={i}
            id={`sw-o${i}`}
            x1="0.15"
            y1="0"
            x2="0.85"
            y2="1"
          >
            <stop offset="0%" stopColor={o.from} />
            <stop offset="100%" stopColor={o.to} />
          </linearGradient>
        ))}
      </defs>

      <path
        d={wavePath(false)}
        stroke="url(#sw-rail)"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d={wavePath(true)}
        stroke="url(#sw-rail)"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {ORBS.map((o, i) => (
        <TravellingOrb key={i} orb={o} gradient={`url(#sw-o${i})`} />
      ))}
    </svg>
  );
}

/**
 * The wash behind the solutions hero: saffron, periwinkle and a mint green,
 * drifting on unrelated cycles so they never line up.
 *
 * Green earns its place here rather than being a third colour for its own sake
 * — it is the tone this site uses for anything verified, and the orbs riding the
 * wave below already carry it, so the band and the artwork read as one piece.
 *
 * All three sit at low alpha under heavy blur with a paper scrim through the
 * middle: the heading sits directly on this, so it has to be felt and never
 * read.
 */
export function SolutionsWash() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(94%_88%_at_50%_44%,#000_26%,transparent_100%)]"
    >
      <div className="drift-a absolute left-[2%] top-[-6%] h-[82%] w-[52%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(240,146,62,0.36),rgba(242,176,116,0.15)_56%,transparent_100%)] blur-[90px]" />
      <div className="drift-b absolute right-[0%] top-[6%] h-[88%] w-[56%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(88,114,246,0.40),rgba(142,166,250,0.16)_54%,transparent_100%)] blur-[95px]" />
      <div className="drift-c absolute bottom-[-8%] left-[24%] h-[76%] w-[54%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(60,184,128,0.36),rgba(122,208,164,0.14)_56%,transparent_100%)] blur-[100px]" />

      {/* keeps the type band near-white so the headline holds full contrast */}
      <div className="absolute inset-x-[6%] top-[8%] h-[62%] bg-[radial-gradient(60%_62%_at_50%_46%,rgba(252,251,249,0.8),transparent_72%)]" />
    </div>
  );
}

function TravellingOrb({ orb, gradient }: { orb: Orb; gradient: string }) {
  const reduce = useReducedMotion();
  const time = useTime();

  // one crossing per `travel` seconds, wrapping at the ends — both of which sit
  // outside the viewBox, so the reset is never visible
  const x = useTransform(time, (t) => {
    const p = reduce ? orb.phase : (t / (orb.travel * 1000) + orb.phase) % 1;
    return START + p * SPAN;
  });
  const y = useTransform(x, (v) => waveY(v, orb.invert));

  return (
    <motion.g style={{ x, y }}>
      <g
        className="orb-bob"
        style={
          {
            ["--spin" as string]: orb.spin,
            animationDuration: `${orb.dur}s`,
            animationDelay: `${orb.delay}s`,
          } as React.CSSProperties
        }
      >
        <g transform={`scale(${orb.size / 2})`}>
          {orb.shape === "orb" ? (
            <circle r="1" fill={gradient} />
          ) : (
            <path
              d={
                orb.shape === "flower"
                  ? FLOWER
                  : orb.shape === "burst"
                    ? BURST
                    : STAR
              }
              fill={gradient}
            />
          )}
        </g>
      </g>
    </motion.g>
  );
}
