"use client";

import { Fragment } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const LEAD = ["The", "AI", "platform"];

/**
 * The title over the product canvas.
 *
 * Words arrive one at a time, rising out of a blur rather than a plain fade —
 * defocus-to-sharp is what makes type feel like it is settling into place
 * instead of switching on. Scroll-triggered rather than CSS-on-mount, because
 * this sits well below the fold and a mount animation would have finished long
 * before anyone reached it.
 *
 * Words are separated by real spaces rather than margins: a margin looks right
 * but copies as nothing, so the heading pastes as one run-together string and
 * reads that way to a screen reader.
 *
 * The highlighted phrase keeps a slow gradient running through it for as long
 * as it is on screen. Sangam is a confluence, so colour moving through the words
 * is the brand idea rather than an effect.
 */
export function PlatformTitle() {
  const reduce = useReducedMotion();

  const rise: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: "0.42em", filter: "blur(10px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <motion.div
      className="mt-24 flex flex-col items-center text-center md:mt-28"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.085 } },
      }}
    >
      <motion.p variants={rise} className="label">
        The platform
      </motion.p>

      <h2 className="display mt-5 text-[clamp(1.9rem,4.1vw,3.05rem)] leading-[1.04]">
        {LEAD.map((word) => (
          <Fragment key={word}>
            <motion.span variants={rise} className="inline-block">
              {word}
            </motion.span>{" "}
          </Fragment>
        ))}
        <motion.span variants={rise} className="flow-text inline-block">
          India can build on
        </motion.span>
        <motion.span variants={rise} className="inline-block">
          .
        </motion.span>
      </h2>

      <motion.p
        variants={rise}
        className="mt-6 max-w-[50ch] text-balance text-[16.5px] leading-[1.6] text-body"
      >
        Open-weight models, private knowledge and sandboxed tools — assembled into one
        desktop application that never phones home.
      </motion.p>
    </motion.div>
  );
}
