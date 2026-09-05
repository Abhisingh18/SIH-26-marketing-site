import type { Metadata } from "next";
import { DemoForm } from "@/components/sections/demo-form";
import { Label } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { WordRise } from "@/components/ui/word-rise";

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
    <section className="relative overflow-hidden px-6 pb-24 pt-36 sm:px-8 md:pb-32 md:pt-44">
      <DemoBackdrop />

      <div className="relative mx-auto grid w-full max-w-[1200px] gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <Reveal>
            <Label>Request a demo</Label>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="display mt-7 max-w-[14ch] text-[clamp(2.3rem,5vw,3.6rem)]">
              <WordRise
                segments={[
                  // the verb is the ask, the perimeter is the promise — greying
                  // the middle lets both ends of the line carry
                  { text: "Bring", className: "text-ink" },
                  { text: "AI inside", className: "text-muted" },
                  { text: "your perimeter.", className: "text-ink" },
                ]}
              />
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
  );
}

/**
 * The home page's drifting fields, held to the top of the page.
 *
 * Same palette and the same three unrelated drift cycles, but the whole
 * backdrop resolves into paper before the form does — a wash running under a
 * white panel does not read as light behind it, it just makes the panel look
 * tinted. Low alpha and heavy blur for the usual reason: the headline sits
 * directly on this, so it can be felt but never read.
 */
function DemoBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[820px] [mask-image:radial-gradient(112%_74%_at_50%_2%,#000_16%,transparent_78%)]"
    >
      <div className="grid-paper absolute inset-0 opacity-60" />

      <div className="drift-a absolute left-[-6%] top-[-14%] h-[76%] w-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(240,150,70,0.3),rgba(240,168,110,0.11)_58%,transparent_100%)] blur-[85px]" />
      <div className="drift-b absolute right-[-8%] top-[-4%] h-[84%] w-[52%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(96,120,244,0.32),rgba(140,164,248,0.13)_56%,transparent_100%)] blur-[90px]" />
      <div className="drift-c absolute left-[22%] top-[24%] h-[70%] w-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(132,96,228,0.24),rgba(160,130,236,0.09)_58%,transparent_100%)] blur-[95px]" />

      {/* paper scrim through the middle, then a settle to paper at the foot */}
      <div className="absolute inset-x-0 top-[10%] h-[66%] bg-[radial-gradient(58%_56%_at_46%_50%,rgba(252,251,249,0.8),transparent_74%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}
