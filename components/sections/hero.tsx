import { Workbench } from "@/components/mock/workbench";
import { Button, LiveDot } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

const TRUST = ["On-premise", "Air-gapped ready", "Open-weight", "Multimodal", "Agentic"];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-32 sm:px-8 md:pb-28 md:pt-44">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(115%_75%_at_45%_0%,#000_10%,transparent_72%)]" />
      <div className="pointer-events-none absolute -top-52 left-[38%] h-[620px] w-[980px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(35,56,204,0.06),transparent_62%)]" />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-10">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full bg-surface/80 px-3.5 py-1.5 shadow-e1 ring-1 ring-line backdrop-blur">
                <LiveDot />
                <span className="label text-body/80">Sovereign AI Infrastructure</span>
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="display mt-8 text-[clamp(2.7rem,6.2vw,4.6rem)]">
                Your AI.
                <br />
                Your infrastructure.
                <br />
                <span className="text-muted">Your data.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="measure mt-8 text-[17px] leading-[1.62] text-body">
                A sovereign, on-premise agentic AI workbench for confidential industrial
                workflows — powered by open-weight models and designed to run entirely
                inside your organization.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button href="/demo" size="lg" arrow>
                  Request demo
                </Button>
                <Button href="/platform" variant="secondary" size="lg">
                  Explore platform
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3">
                {TRUST.map((t) => (
                  <li key={t} className="flex items-center gap-2 text-[12.5px] text-muted">
                    <span className="h-[3px] w-[3px] rounded-full bg-line-2" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.16} y={28}>
            <div className="relative lg:w-[124%]">
              <Workbench variant="compact" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
