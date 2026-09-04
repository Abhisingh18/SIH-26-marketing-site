import Image from "next/image";
import flourish from "@/components/photos/png-clipart-graphic-design-floral-design-design-text-floral-thumbnail.png";
import { Workbench } from "@/components/mock/workbench";
import { Button } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

const DOCS = [
  "P&IDs",
  "SOPs",
  "Inspection reports",
  "Engineering data",
  "Financial documents",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-[100px] sm:px-8 sm:pt-[112px] md:pb-28">
      <Bloom />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Flourish />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-7 flex flex-col items-center">
              <span className="h-px w-[200px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <p className="px-6 py-4 text-[15px] tracking-[-0.005em] text-accent">
                Sovereign AI infrastructure
              </p>
              <span className="h-px w-[280px] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="display mt-11 text-[clamp(2.5rem,6.4vw,4.9rem)]">
              Your AI.
              <br />
              Your infrastructure.
              <br />
              <span className="text-muted">Your data.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-9 max-w-[54ch] text-[17px] leading-[1.6] text-body sm:text-[18px]">
              A sovereign, on-premise agentic AI workbench for confidential industrial work.
              Powered by open-weight models. Nothing leaves your infrastructure.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
              <Button href="/demo" size="lg">
                Request demo
              </Button>
              <Button href="/platform" variant="secondary" size="lg">
                Explore platform
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-24 flex flex-col items-center">
              <p className="label">Built for confidential industrial work</p>
              <ul className="mt-7 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
                {DOCS.map((d) => (
                  <li key={d} className="text-[15px] text-body">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={30} className="mt-20 md:mt-24">
          <div className="mx-auto max-w-[1080px]">
            <Workbench />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Backdrop                                                            */
/* ------------------------------------------------------------------ */

/**
 * Three colours meeting: saffron above, periwinkle through the middle, paper
 * below. Sangam is a confluence, and at a real one the rivers stay visibly
 * different colours where they meet.
 *
 * Built the way the reference is: a saturated dome with a heavily blurred edge,
 * not a soft radial haze. The periwinkle field sits *under* the saffron and is
 * wider than it, so it reads at the shoulders while the centre stays clear for
 * type — which is also what stops the two hues blending head on and going
 * grey-brown through the middle of the fold.
 */
function Bloom() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[940px] overflow-hidden"
      aria-hidden
    >
      {/* periwinkle — wide, low, underneath */}
      <div className="absolute left-1/2 top-[2px] h-[660px] w-[min(1900px,170vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,#b3c0f2_0%,#b3c0f2_34%,rgba(179,192,242,0)_100%)] blur-[85px]" />

      {/* saffron — solid core, soft edge, sitting on top */}
      <div className="absolute left-1/2 top-[-52px] h-[352px] w-[min(1480px,126vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,#f47c14_0%,#f47c14_46%,rgba(244,124,20,0)_100%)] blur-[62px]" />

      {/* paper opens up the centre under the headline, then settles the page */}
      <div className="absolute inset-x-0 top-[260px] h-[560px] bg-[radial-gradient(58%_62%_at_50%_58%,rgba(252,251,249,0.92),rgba(252,251,249,0)_72%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}

/**
 * Hero flourish. The source art is black on transparent inside a square canvas
 * with a lot of dead space above and below, so it gets two treatments:
 *
 *  - `brightness(0) invert(1)` drives any dark pixel to pure white, which is
 *    cleaner than shipping a recoloured copy of the file
 *  - the square sits absolutely inside a short wrapper that crops to the band
 *    the artwork actually occupies, so it does not push the kicker down the page
 */
function Flourish() {
  return (
    <div
      className="relative h-[104px] w-[290px] overflow-hidden sm:h-[116px] sm:w-[320px]"
      aria-hidden
    >
      <Image
        src={flourish}
        alt=""
        priority
        className="absolute left-0 top-1/2 w-full -translate-y-1/2 opacity-90 [filter:brightness(0)_invert(1)]"
      />
    </div>
  );
}
