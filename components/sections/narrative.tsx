import { Cloud, Clock, FileLock2, Puzzle } from "lucide-react";
import { Card } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";

/* ------------------------------------------------------------------ */
/* Trust strip                                                         */
/* ------------------------------------------------------------------ */

const DOC_TYPES = [
  "P&IDs",
  "SOPs",
  "Inspection Reports",
  "Engineering Data",
  "Financial Documents",
];

export function TrustBar() {
  return (
    <div className="border-y border-line bg-surface px-5 py-8 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
        <p className="eyebrow max-w-[220px]">
          Designed for confidential industrial work
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {DOC_TYPES.map((d) => (
            <li key={d} className="text-[14px] text-ink-soft">
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Big statement                                                       */
/* ------------------------------------------------------------------ */

export function BigStatement() {
  return (
    <Section tone="paper" bordered={false} className="py-24 md:py-32">
      <Reveal>
        <h2 className="display mx-auto max-w-[1000px] text-center text-[clamp(2rem,5.2vw,4rem)]">
          The most valuable AI is the one you can{" "}
          <span className="text-muted">trust with your most valuable data.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-10 max-w-[620px] text-center text-[16px] leading-relaxed text-muted">
          Refineries, plants and engineering teams already hold the information AI is
          best at using. The problem was never capability. It was custody.
        </p>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Problem                                                             */
/* ------------------------------------------------------------------ */

const PROBLEMS = [
  {
    icon: FileLock2,
    title: "Confidential documents",
    body: "P&IDs, SOPs, inspection reports and financials that cannot be copied outside the plant network.",
  },
  {
    icon: Cloud,
    title: "Cloud restrictions",
    body: "Public AI services are off-limits for regulated, classified or commercially sensitive material.",
  },
  {
    icon: Clock,
    title: "Manual, repetitive work",
    body: "Engineers spend hours reading scans, cross-checking standards and rewriting the same notes.",
  },
  {
    icon: Puzzle,
    title: "Fragmented AI tools",
    body: "Different tasks need different models, and none of them talk to your internal knowledge.",
  },
];

export function Problem() {
  return (
    <Section id="problem" tone="surface">
      <SectionHead
        eyebrow="The problem"
        title={
          <>
            Sensitive work wasn&rsquo;t built
            <br className="hidden sm:block" /> for the cloud.
          </>
        }
        sub="Engineers work with documents, drawings, calculations and internal knowledge that cannot leave the organization's infrastructure — so the most useful AI has been the least available."
      />

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEMS.map(({ icon: Icon, title, body }) => (
          <RevealItem key={title}>
            <Card className="h-full">
              <Icon className="h-5 w-5 text-ink" strokeWidth={1.6} />
              <h3 className="mt-10 text-[16px] font-medium tracking-[-0.01em] text-ink">
                {title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{body}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1}>
        <p className="mt-14 text-center text-[clamp(1.3rem,3vw,2rem)] tracking-[-0.02em] text-ink">
          So we brought the AI inside instead.
        </p>
      </Reveal>
    </Section>
  );
}
