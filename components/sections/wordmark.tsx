"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The greeting, set as the mark on one line. Every letter converges into place
 * and takes its slice of one ramp that runs across the whole phrase, so the
 * colour reads as a single sweep rather than a set of tinted letters.
 */
const PHRASE = "Namaste India";

/** deterministic float, so the server and client scatter the letters the same */
function noise(n: number) {
  const x = Math.sin(n * 99.13) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Per-letter data. The space is kept as a non-animated gap. The scatter is
 * uneven on purpose — a symmetrical explosion reads as a template.
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
                    filter: "blur(16px)",
                  },
              show: {
                opacity: 1,
                x: 0,
                y: 0,
                rotate: 0,
                scale: 1,
                filter: "blur(0px)",
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
            {/* The standing wave lives on its own element: converging and
                swelling are both transforms, and one element cannot run two. */}
            <span
              className="letter-wave text-[#e0407a]"
              style={{ animationDelay: `${1.3 + l.wave * 0.11}s` }}
            >
              {l.char}
            </span>
          </motion.span>
        ),
      )}
    </motion.h1>
  );
}
