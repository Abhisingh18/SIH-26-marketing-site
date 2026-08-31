import { ArrowRight } from "lucide-react";
import { Workbench } from "@/components/mock/workbench";
import { Button, LiveDot } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

const TRUST = ["On-Premise", "Air-Gapped Ready", "Open-Weight", "Multimodal", "Agentic"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-16 pt-28 sm:px-8 sm:pt-32 lg:pb-24 lg:pt-40">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(120%_80%_at_50%_0%,#000_20%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(35,64,224,0.07),transparent_65%)]" />

      <div className="relative mx-auto w-full max-w-[1180px]">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.08fr)] lg:gap-12">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-soft backdrop-blur">
                <LiveDot />
                Sovereign AI Infrastructure
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 className="display mt-7 text-[clamp(2.6rem,6.4vw,4.6rem)] text-ink">
                Your AI.
                <br />
                Your infrastructure.
                <br />
                <span className="text-muted">Your data.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-7 max-w-[520px] text-[16.5px] leading-relaxed text-ink-soft sm:text-[17.5px]">
                A sovereign, on-premise agentic AI workbench for confidential industrial
                workflows — powered by open-weight models and designed to run entirely inside
                your organization.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="#demo">
                  Request Demo
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
                <Button href="#platform" variant="ghost">
                  Explore Platform
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2.5">
                {TRUST.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted"
                  >
                    <span className="h-1 w-1 rounded-full bg-line-strong" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15} y={26}>
            <div className="relative">
              <Workbench variant="compact" />
              <div className="pointer-events-none absolute -bottom-6 left-1/2 hidden w-[85%] -translate-x-1/2 items-center justify-between rounded-full border border-line bg-surface/90 px-5 py-2.5 backdrop-blur lg:flex">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Local inference
                </span>
                <span className="h-px flex-1 mx-4 bg-line" />
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Internet <span className="text-ink">✕</span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
