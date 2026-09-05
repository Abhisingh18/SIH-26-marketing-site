"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * The ramp the mark is painted with, one stop per letter boundary.
 *
 * It travels orange to green the long way round the wheel — through rose,
 * orchid, violet, blue and teal — rather than straight across. Interpolating
 * saffron directly into green passes through grey, and a wordmark that goes
 * muddy in the middle is worse than a flat one.
 */
const STOPS = [
  "#dd7a15",
  "#d2557e",
  "#a455c6",
  "#6a57d8",
  "#2f5bd0",
  "#1b8fa8",
  "#0f8b55",
];

/**
 * `from` is where each letter starts before it converges. Sangam means a
 * confluence, so the word assembles the way the name describes: six things
 * arriving from different directions and settling into one. The scatter is
 * deliberately uneven — a symmetrical explosion reads as a template.
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
                  // Colour arrives by desaturating rather than by animating
                  // `color`, which the gradient fill has already spent. It also
                  // means the mark sets itself on the last beat instead of
                  // being fully there while it is still travelling.
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
          {/* Each letter carries its own slice of the ramp rather than the word
              carrying one background. `background-clip: text` on a parent whose
              children are transformed paints unreliably, and every letter here
              moves — so the gradient is cut into six continuous pieces instead,
              which looks identical and cannot break.

              This span also runs the standing wave: converging and swelling are
              both transforms, and one element cannot run two. */}
          <span
            className="letter-wave bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(100deg, ${STOPS[i]}, ${STOPS[i + 1]})`,
              animationDelay: `${1.1 + i * 0.16}s`,
            }}
          >
            {l.char}
          </span>
        </motion.span>
      ))}
    </motion.h1>
  );
}
