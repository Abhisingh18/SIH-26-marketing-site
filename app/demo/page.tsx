import type { Metadata } from "next";
import { DemoForm } from "@/components/sections/demo-form";
import { Label } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Request a demo",
  description:
    "See a sovereign AI workbench running on your own hardware, against your own workflow — with the sovereignty monitor open while it works.",
};

const STEPS = [
  {
    n: "01",
    title: "A 30-minute walkthrough",
    body: "We show the workbench running a real industrial workflow end to end, with the sovereignty monitor visible the whole time.",
  },
  {
    n: "02",
    title: "A scoping conversation",
    body: "Your team picks one workflow. We map it to the models, documents and hardware it would need.",
  },
  {
    n: "03",
    title: "A pilot on your infrastructure",
    body: "The application is installed on a machine you control, indexed against a document set you choose.",
  },
];

export default function DemoPage() {
  return (
    <>
      <section className="relative overflow-hidden px-6 pb-24 pt-36 sm:px-8 md:pb-32 md:pt-44">
        <div className="grid-paper pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(110%_70%_at_50%_0%,#000_10%,transparent_70%)]" />

        <div className="relative mx-auto grid w-full max-w-[1200px] gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <Reveal>
              <Label>Request a demo</Label>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="display mt-7 max-w-[14ch] text-[clamp(2.3rem,5vw,3.6rem)]">
                Bring AI inside your perimeter.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="measure mt-8 text-[17px] leading-[1.65] text-body">
                Tell us which workflow costs your team the most hours today. We will show the
                workbench running it — on hardware you control, with nothing leaving the room.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <ol className="mt-16 border-t border-line">
                {STEPS.map((s) => (
                  <li key={s.n} className="border-b border-line py-7">
                    <div className="flex gap-6">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-muted">
                        {s.n}
                      </span>
                      <div>
                        <p className="text-[16px] font-medium tracking-[-0.01em] text-ink">
                          {s.title}
                        </p>
                        <p className="mt-2 text-[14px] leading-[1.6] text-body">{s.body}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={26}>
            <DemoForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
