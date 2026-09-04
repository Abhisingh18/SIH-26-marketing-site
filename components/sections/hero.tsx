import Image from "next/image";
import flourish from "@/components/photos/flourish-alpha.png";
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
    <section className="relative overflow-hidden px-6 pb-20 pt-[84px] sm:px-8 sm:pt-[96px] md:pb-28">
      <Bloom />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Flourish />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="-mt-2 flex flex-col items-center">
              <span className="rule-sweep h-px w-[88px]" />
              <p className="px-6 py-1.5 text-[14.5px] leading-none tracking-[-0.005em] text-accent">
                Sovereign AI infrastructure
              </p>
              <span className="rule-sweep h-px w-[176px] [&::after]:[animation-delay:2.6s]" />
            </div>
          </Reveal>

          <h1 className="display rise mt-12 text-[clamp(2.9rem,7.2vw,5.9rem)] leading-[0.95] tracking-[-0.022em]">
            <span className="block">Your AI.</span>
            <span className="block">Your infrastructure.</span>
            <span className="block">Your data.</span>
          </h1>

          <Reveal delay={0.34}>
            <p className="mt-10 max-w-[46ch] text-[17.5px] leading-[1.6] text-body sm:text-[19px]">
              A sovereign, on-premise agentic AI workbench for confidential industrial work,
              powered by open-weight models.{" "}
              <span className="text-ink">Nothing leaves your infrastructure.</span>
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
      <div className="absolute left-1/2 top-[-14px] h-[660px] w-[min(1900px,170vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,#b3c0f2_0%,#b3c0f2_34%,rgba(179,192,242,0)_100%)] blur-[85px]" />

      {/* saffron — solid core, soft edge, sitting on top */}
      <div className="absolute left-1/2 top-[-68px] h-[352px] w-[min(1480px,126vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,#f47c14_0%,#f47c14_46%,rgba(244,124,20,0)_100%)] blur-[62px]" />

      {/* paper opens up the centre under the headline, then settles the page */}
      <div className="absolute inset-x-0 top-[244px] h-[560px] bg-[radial-gradient(58%_62%_at_50%_58%,rgba(252,251,249,0.92),rgba(252,251,249,0)_72%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}

/**
 * Hero flourish.
 *
 * The supplied artwork had its checkerboard painted into the pixels — no alpha
 * channel at all — so inverting it in CSS turned the whole square white. The
 * file is pre-processed instead (see the note in the README): alpha derived
 * from luminance, then cropped to the artwork's bounding box. It stays dark on
 * transparent here and is inverted to white in CSS, so the same asset still
 * works on a light background if it is ever needed there.
 */
function Flourish() {
  return (
    <Image
      src={flourish}
      alt=""
      priority
      aria-hidden
      className="w-[152px] opacity-85 [filter:brightness(0)_invert(1)] sm:w-[170px]"
    />
  );
}
