"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The greeting, set as the mark on one line. Every letter converges into place
 * and takes its slice of one ramp that runs across the whole phrase, so the
 * colour reads as a single sweep rather than a set of tinted letters.
 */
const PHRASE = "Namaste India";

/**
 * A jewel ramp — magenta, violet, blue, teal — routed round the wheel so it
 * never passes through grey. A wordmark that goes muddy in the middle is worse
 * than a flat one.
 */
const STOPS = ["#e6338a", "#a23dd6", "#5b5be6", "#2f8fd6", "#12a594"];

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

const COLOURED = [...PHRASE].filter((c) => c !== " ").length;

/**
 * Per-letter data. The space is kept as a non-animated gap; only the letters
 * take a ramp slice and a scatter offset, so the gradient does not spend a stop
 * on whitespace. The scatter is uneven on purpose — a symmetrical explosion
 * reads as a template.
 */
let g = 0;
const LETTERS = [...PHRASE].map((char) => {
  if (char === " ") return { char, space: true as const };
  const i = g++;
  return {
    char,
    space: false as const,
    from: {
      x: (noise(i + 1) * 2 - 1) * 92,
      y: (noise(i + 5) * 2 - 1) * 54,
      r: (noise(i + 3) * 2 - 1) * 16,
    },
    grad: `linear-gradient(100deg, ${rampAt(i / COLOURED)}, ${rampAt((i + 1) / COLOURED)})`,
    wave: i,
  };
});

export function Wordmark() {
  const reduce = useReducedMotion();

  return (
    <motion.h1
      className="wordmark whitespace-nowrap text-[clamp(2.1rem,7vw,4.6rem)]"
      aria-label={PHRASE}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.055 } },
      }}
    >
      {LETTERS.map((l, i) =>
        l.space ? (
          <span key={i} aria-hidden className="inline-block w-[0.28em]" />
        ) : (
          <motion.span
            key={i}
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
                  default: { type: "spring", stiffness: 120, damping: 15, mass: 0.9 },
                  filter: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.45 },
                },
              },
            }}
            whileHover={reduce ? undefined : { y: -10, scale: 1.08 }}
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
                animationDelay: `${1.3 + l.wave * 0.11}s`,
              }}
            >
              {l.char}
            </span>
          </motion.span>
        ),
      )}
    </motion.h1>
  );
}
