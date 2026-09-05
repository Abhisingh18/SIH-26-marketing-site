"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * `from` is where each letter starts before it converges. Sangam means a
 * confluence, so the word assembles the way the name describes: six things
 * arriving from different directions and settling into one. The scatter is
 * deliberately uneven — a symmetrical explosion reads as a template.
 *
 * The mark is set in ink. Colour is carried by everything around it — the
 * flourish, the wash, the document strip — and a black logotype in the middle
 * of that is the thing the eye lands on.
 */
const LETTERS = [
  { char: "S", from: { x: -78, y: -40, r: -15 } },
  { char: "a", from: { x: -40, y: 46, r: 11 } },
  { char: "n", from: { x: -6, y: -52, r: 9 } },
  { char: "g", from: { x: 18, y: 50, r: -10 } },
  { char: "a", from: { x: 52, y: -42, r: 13 } },
  { char: "m", from: { x: 86, y: 40, r: -12 } },
];

export function Wordmark() {
  const reduce = useReducedMotion();

  return (
    <motion.h1
      className="wordmark text-[clamp(3.4rem,9.4vw,7rem)]"
      aria-label="Sangam"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.075 } },
      }}
    >
      {LETTERS.map((l, i) => (
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
                  // arrives light and darkens as it lands, so the mark sets
                  // itself on the last beat rather than being fully there while
                  // it is still travelling
                  color: "#b4b4bb",
                },
            show: {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              filter: "blur(0px)",
              color: "#111113",
              transition: {
                default: { type: "spring", stiffness: 118, damping: 15, mass: 0.9 },
                filter: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                opacity: { duration: 0.45 },
                color: { duration: 0.55, delay: 0.42 },
              },
            },
          }}
          whileHover={reduce ? undefined : { y: -10, scale: 1.07 }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
        >
          {/* the standing wave lives on its own element: convergence and the
              swell are both transforms, and one element cannot run two */}
          <span
            className="letter-wave"
            style={{ animationDelay: `${1.1 + i * 0.16}s` }}
          >
            {l.char}
          </span>
        </motion.span>
      ))}
    </motion.h1>
  );
}
