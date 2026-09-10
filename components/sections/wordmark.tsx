"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The greeting, set as the mark. Two words stacked, every letter converging
 * into place and taking its slice of one ramp that runs across the whole
 * lockup — so the colour reads as a single sweep, not twelve tinted letters.
 */
const WORDS = ["Namaste", "India"];

/**
 * The ramp, orange to green the long way round the wheel — rose, orchid,
 * violet, blue, teal. Straight across, saffron into green passes through grey,
 * and a wordmark that goes muddy in the middle is worse than a flat one.
 */
const STOPS = ["#dd7a15", "#d2557e", "#a455c6", "#6a57d8", "#2f5bd0", "#1b8fa8", "#0f8b55"];

function lerp(a: string, b: string, t: number) {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  const c = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `#${c.map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

/** colour at position t (0-1) along the ramp */
function rampAt(t: number) {
  const seg = Math.max(0, Math.min(1, t)) * (STOPS.length - 1);
  const i = Math.floor(seg);
  return lerp(STOPS[i], STOPS[Math.min(i + 1, STOPS.length - 1)], seg - i);
}

/** deterministic float, so the server and client scatter the letters the same */
function noise(n: number) {
  const x = Math.sin(n * 99.13) * 43758.5453;
  return x - Math.floor(x);
}

const TOTAL = WORDS.join("").length;
let cursor = 0;

/**
 * Precomputed per-letter data: its slice of the ramp and where it starts before
 * converging. The scatter is uneven on purpose — a symmetrical explosion reads
 * as a template.
 */
const LINES = WORDS.map((word) =>
  [...word].map((char) => {
    const g = cursor++;
    return {
      char,
      from: {
        x: (noise(g + 1) * 2 - 1) * 96,
        y: (noise(g + 5) * 2 - 1) * 56,
        r: (noise(g + 3) * 2 - 1) * 16,
      },
      grad: `linear-gradient(100deg, ${rampAt(g / TOTAL)}, ${rampAt((g + 1) / TOTAL)})`,
      wave: g,
    };
  }),
);

export function Wordmark() {
  const reduce = useReducedMotion();

  return (
    <motion.h1
      className="wordmark text-[clamp(2.7rem,8.4vw,6rem)]"
      aria-label={WORDS.join(" ")}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.06 } },
      }}
    >
      {LINES.map((line, li) => (
        <span key={li} className="block">
          {line.map((l) => (
            <motion.span
              key={l.wave}
              aria-hidden
              className="inline-block will-change-transform"
              variants={{
                hidden: reduce
                  ? {}
                  : {
                      opacity: 0,
                      x: l.from.x,
                      y: l.from.y,
                      rotate: l.from.r,
                      scale: 0.86,
                      filter: "blur(16px) grayscale(1)",
                    },
                show: {
                  opacity: 1,
                  x: 0,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                  filter: "blur(0px) grayscale(0)",
                  transition: {
                    default: { type: "spring", stiffness: 118, damping: 15, mass: 0.9 },
                    filter: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                    opacity: { duration: 0.45 },
                  },
                },
              }}
              whileHover={reduce ? undefined : { y: -10, scale: 1.07 }}
              transition={{ type: "spring", stiffness: 380, damping: 18 }}
            >
              {/* Each letter carries its own slice of the ramp. `background-clip:
                  text` on a parent whose children are transformed paints
                  unreliably, and every letter here moves, so the gradient is cut
                  into continuous pieces instead — identical to look at, and it
                  cannot break. This span also runs the standing wave: converging
                  and swelling are both transforms and one element cannot run two. */}
              <span
                className="letter-wave bg-clip-text text-transparent"
                style={{
                  backgroundImage: l.grad,
                  animationDelay: `${1.4 + l.wave * 0.12}s`,
                }}
              >
                {l.char}
              </span>
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
