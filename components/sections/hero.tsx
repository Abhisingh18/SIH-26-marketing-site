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
            <Ornament />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-5 flex flex-col items-center">
              <span className="h-px w-[240px] bg-white/55" />
              <p className="px-6 py-4 text-[15px] tracking-[-0.005em] text-accent">
                Sovereign AI infrastructure
              </p>
              <span className="h-px w-[280px] bg-white/55" />
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
 * Confluence flourish: two mirrored sprays running into a single point.
 * The logomark's three streams, opened out flat.
 */
function Ornament() {
  return (
    <svg
      viewBox="0 0 200 36"
      className="h-[34px] w-[200px] text-white"
      aria-hidden
      fill="currentColor"
    >
      <g>
        <path d="M104 18c24-10 52-13 78-8-24 7-54 11-78 8Z" opacity="0.92" />
        <path d="M104 18c22-2 46-1 64 4-20 3-44 2-64-4Z" opacity="0.62" />
        <path
          d="M182 10c8-2 14 2 14 8 0 5-5 8-9 6-3-1-4-6-1-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.92"
        />
      </g>
      <g transform="translate(200 0) scale(-1 1)">
        <path d="M104 18c24-10 52-13 78-8-24 7-54 11-78 8Z" opacity="0.92" />
        <path d="M104 18c22-2 46-1 64 4-20 3-44 2-64-4Z" opacity="0.62" />
        <path
          d="M182 10c8-2 14 2 14 8 0 5-5 8-9 6-3-1-4-6-1-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.92"
        />
      </g>
      <circle cx="100" cy="18" r="2.2" />
    </svg>
  );
}
