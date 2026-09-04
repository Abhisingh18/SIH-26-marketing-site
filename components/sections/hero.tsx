import { Workbench } from "@/components/mock/workbench";
import { Button } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

const TRUST = ["On-premise", "Air-gapped ready", "Open-weight", "Multimodal", "Agentic"];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-40">
      <Bloom />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Ornament />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-7 flex items-center gap-5">
              <span className="hidden h-px w-16 bg-ink/12 sm:block" />
              <p className="text-[14px] tracking-[-0.01em] text-accent">
                Sovereign AI infrastructure
              </p>
              <span className="hidden h-px w-16 bg-ink/12 sm:block" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="display mt-8 max-w-[15ch] text-[clamp(2.8rem,7vw,5.4rem)]">
              Intelligence inside your perimeter
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-8 max-w-[46ch] text-[17px] leading-[1.6] text-body sm:text-[18px]">
              A sovereign, on-premise agentic AI workbench for confidential industrial work.
              Powered by open-weight models. Nothing leaves your infrastructure.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button href="/demo" size="lg" arrow>
                Request demo
              </Button>
              <Button href="/platform" variant="secondary" size="lg">
                Explore platform
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2 text-[12.5px] text-muted">
                  <span className="h-[3px] w-[3px] rounded-full bg-ink/20" />
                  {t}
                </li>
              ))}
            </ul>
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

/**
 * Two blooms meeting — warm above, cool below — then fading into the page.
 * Sangam is a confluence, and at a real one the two rivers stay visibly
 * different colours where they meet.
 */
function Bloom() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-[860px] overflow-hidden" aria-hidden>
      <div className="absolute left-1/2 top-[-300px] h-[620px] w-[min(1180px,140vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(233,140,44,0.5),rgba(233,140,44,0.24)_55%,transparent_100%)] blur-[80px]" />
      <div className="absolute left-1/2 top-[40px] h-[660px] w-[min(1560px,165vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(104,116,232,0.34),rgba(104,116,232,0.14)_58%,transparent_100%)] blur-[100px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/45 to-paper" />
    </div>
  );
}

/** Confluence flourish — the logomark opened out into an ornament. */
function Ornament() {
  return (
    <svg
      viewBox="0 0 132 22"
      className="h-[22px] w-[132px] text-ink/35"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
    >
      <path d="M3 5c0 8 12 6 27 6h32" />
      <path d="M129 5c0 8-12 6-27 6H70" />
      <circle cx="66" cy="11" r="1.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
