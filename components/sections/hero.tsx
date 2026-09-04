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
              <span className="hidden h-px w-14 bg-ink/10 sm:block" />
              <p className="text-[13.5px] tracking-[-0.005em] text-accent">
                Sovereign AI infrastructure
              </p>
              <span className="hidden h-px w-14 bg-ink/10 sm:block" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="display mt-9 text-[clamp(2.6rem,6.6vw,5.1rem)]">
              Your AI.
              <br />
              Your infrastructure.
              <br />
              <span className="text-muted">Your data.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-9 max-w-[52ch] text-[16.5px] leading-[1.62] text-body sm:text-[17.5px]">
              A sovereign, on-premise agentic AI workbench for confidential industrial
              workflows — powered by open-weight models and designed to run entirely inside
              your organization.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
              <Button href="/demo" size="lg" arrow>
                Request demo
              </Button>
              <Button href="/platform" variant="secondary" size="lg">
                Explore platform
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3">
              {TRUST.map((t) => (
                <li key={t} className="flex items-center gap-2.5 text-[12.5px] text-muted">
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
 * Two blooms meeting — warm above, cool below. Sangam is a confluence, and at a
 * real one the two rivers stay visibly different colours where they meet.
 *
 * Grading rules that keep it clean rather than muddy:
 *  - the warm and cool fields barely overlap; saffron and periwinkle are near
 *    complements, so blending them directly turns grey-brown
 *  - a paper scrim sits between them and the type, so the headline always
 *    lands on near-white and keeps full contrast
 *  - both fields are low-saturation tints, not poster colour
 */
function Bloom() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[900px] overflow-hidden"
      aria-hidden
    >
      {/* warm field — sits high, behind the nav and ornament, gone by the headline */}
      <div className="absolute left-1/2 top-[-360px] h-[600px] w-[min(1080px,132vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(228,140,56,0.46),rgba(228,140,56,0.2)_52%,transparent_100%)] blur-[90px]" />

      {/* cool field — wider and lower, carrying the rest of the fold */}
      <div className="absolute left-1/2 top-[210px] h-[620px] w-[min(1560px,168vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(122,134,238,0.26),rgba(122,134,238,0.11)_58%,transparent_100%)] blur-[110px]" />

      {/* paper scrim through the type band, then a clean settle into the page */}
      <div className="absolute inset-x-0 top-[240px] h-[460px] bg-[radial-gradient(70%_100%_at_50%_45%,rgba(252,251,249,0.82),rgba(252,251,249,0.35)_60%,transparent_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-paper/35 to-paper" />
    </div>
  );
}

/** Confluence flourish — the logomark opened out into an ornament. */
function Ornament() {
  return (
    <svg
      viewBox="0 0 132 22"
      className="h-[22px] w-[132px] text-ink/30"
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
