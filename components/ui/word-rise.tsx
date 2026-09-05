"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

export type Segment = { text: string; className?: string };

/**
 * Word-by-word entry: each word rises out of a blur as it lands.
 *
 * Defocus-to-sharp is what separates this from a stock fade — the type looks
 * like it is settling into place rather than switching on. Scroll-triggered, so
 * it plays when the line is actually read rather than on page load.
 *
 * Segments let one line carry two treatments (muted setup, inked payoff) while
 * still staggering as a single sequence.
 */
export function WordRise({
  segments,
  className,
  stagger = 0.05,
  duration = 0.75,
}: {
  segments: Segment[];
  className?: string;
  stagger?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();

  const words = segments.flatMap((segment) =>
    segment.text.split(" ").map((word) => ({ word, className: segment.className })),
  );

  const rise: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: "0.4em", filter: "blur(9px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.span
      className={cn("inline", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : stagger } },
      }}
    >
      {words.map(({ word, className: wordClass }, i) => (
        <Fragment key={`${i}-${word}`}>
          <motion.span
            variants={rise}
            className={cn("inline-block", wordClass)}
          >
            {word}
          </motion.span>
          {/* A real space, not a margin. Margins look right but copy as
              nothing, so the headline pastes as one run-together string and
              reads that way to a screen reader. */}
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </motion.span>
  );
}
