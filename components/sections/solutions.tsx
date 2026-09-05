import {
  Check,
  ClipboardCheck,
  Cloud,
  Clock,
  FileCode,
  FileLock2,
  FileSpreadsheet,
  FileText,
  Presentation,
  Puzzle,
  ScrollText,
  Terminal,
  Workflow,
  Wrench,
} from "lucide-react";
import { Panel } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Why cloud AI does not fit                                           */
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
    body: "Different tasks need different models, and none of them can see your internal knowledge.",
  },
];

export function Problem() {
  return (
    <Section id="problem" tone="surface">
      <SectionHead
        label="The problem"
        animateTitle="Sensitive work wasn't built for the cloud."
        body="Engineers work with documents, drawings, calculations and internal knowledge that cannot leave the organization's infrastructure — so the most useful AI has been the least available."
      />

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEMS.map(({ icon: Icon, title, body }) => (
          <RevealItem key={title}>
            <Panel hover className="h-full p-7">
              {/* neutral well, not a category tint — these are constraints, and
                  the four colours on this page mean document categories */}
              <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-veil text-ink">
                <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              </span>
              <h3 className="mt-10 text-[15.5px] font-medium tracking-[-0.01em] text-ink">
                {title}
              </h3>
              <p className="mt-3 text-[13.5px] leading-[1.6] text-body">{body}</p>
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Use cases                                                           */
/* ------------------------------------------------------------------ */

/**
 * The site's four category colours — engineering, procedure, field record,
 * commercial — carried over from the document strip and the workbench tags, so
 * a workflow here reads as the same family of thing as the documents it eats.
 *
 * `rail` is the top of the chain's gradient: it starts in the category colour
 * and resolves to neutral by the output, which is the direction the card reads.
 */
const TONES = {
  eng: { chip: "bg-[#fdf3e6] text-[#b0670f]", rail: "from-[#e3bd8e]" },
  doc: { chip: "bg-accent-tint text-accent", rail: "from-[#b7c0f3]" },
  field: { chip: "bg-[#efeffb] text-[#5551c4]", rail: "from-[#bcbbec]" },
  fin: { chip: "bg-[#e9f6ef] text-[#0f8b55]", rail: "from-[#a4dabf]" },
} as const;

const USE_CASES = [
  {
    id: "operations",
    icon: ClipboardCheck,
    tone: "doc",
    domain: "Refinery operations",
    body: "A scanned inspection report becomes a checked, formatted approval note without anyone retyping the findings.",
    flow: ["Inspection scan", "Findings extracted", "SOP cross-check", "Approval note"],
    output: "Approval_Note.docx",
    outputIcon: FileText,
  },
  {
    id: "engineering",
    icon: Workflow,
    tone: "eng",
    domain: "Engineering",
    body: "Drawings and datasheets are read together, calculations are run in a sandbox and the numbers are verified before they reach a report.",
    flow: ["Drawing + data", "Reasoning", "Calculation", "Verified report"],
    output: "Analysis.xlsx",
    outputIcon: FileSpreadsheet,
  },
  {
    id: "maintenance",
    icon: Wrench,
    tone: "field",
    domain: "Maintenance",
    body: "Field reports are matched against the right procedure, so recommendations cite the standard they came from.",
    flow: ["Field report", "SOP retrieval", "Recommendation"],
    output: "Work_Order.docx",
    outputIcon: FileText,
  },
  {
    id: "management",
    icon: Presentation,
    tone: "fin",
    domain: "Management",
    body: "Long document sets are summarised into a deck with the source of every claim attached.",
    flow: ["Document set", "Analysis", "Presentation"],
    output: "Review.pptx",
    outputIcon: Presentation,
  },
  {
    id: "development",
    icon: Terminal,
    tone: "eng",
    domain: "Internal development",
    body: "Scripts and data transforms are generated, executed in an isolated container and only returned once they pass.",
    flow: ["Prompt", "Code", "Sandbox test", "Verified code"],
    output: "script.py",
    outputIcon: FileCode,
  },
  {
    id: "compliance",
    icon: ScrollText,
    tone: "doc",
    domain: "Compliance",
    body: "Evidence is located across internal standards and assembled into an audit trail that points back at the original page.",
    flow: ["Standards", "Evidence search", "Audit report"],
    output: "Audit.docx",
    outputIcon: FileText,
  },
] satisfies {
  id: string;
  icon: typeof Workflow;
  tone: keyof typeof TONES;
  domain: string;
  body: string;
  flow: string[];
  output: string;
  outputIcon: typeof Workflow;
}[];

export function UseCases() {
  return (
    <Section id="use-cases" className="relative overflow-hidden">
      <UseCaseBackdrop />

      <div className="relative">
        <SectionHead
          label="Use cases"
          animateTitle="Built for work that matters."
          body="Every workflow below starts with a document that could not have been uploaded anywhere, and ends with a file someone can sign."
        />

        <RevealGroup className="mt-16 grid gap-4 lg:grid-cols-2">
          {USE_CASES.map((u) => {
            const { icon: Icon, outputIcon: OutputIcon } = u;
            const tone = TONES[u.tone];

            return (
              <RevealItem key={u.id} id={u.id} className="scroll-mt-28">
                <Panel hover as="article" className="group flex h-full flex-col p-8">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-[12px] transition-transform duration-300 group-hover:scale-105",
                      tone.chip,
                    )}
                  >
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                  </span>

                  <h3 className="display-sm mt-6 text-[21px]">{u.domain}</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.6] text-body">{u.body}</p>

                  {/* The chain and its output are one object, not two rows of
                      chrome: the steps run down a rail and the file drops out
                      of the bottom of it, which is the claim the card makes. */}
                  <div className="mt-auto pt-8">
                    <div className="rounded-[14px] bg-veil/70 p-5">
                      <div className="relative">
                        <span
                          aria-hidden
                          className={cn(
                            "absolute bottom-2.5 left-[9px] top-2.5 w-px bg-gradient-to-b to-line-2",
                            tone.rail,
                          )}
                        />
                        <ol className="relative space-y-3.5">
                          {u.flow.map((step, i) => (
                            <li key={step} className="flex items-center gap-3">
                              <span
                                className={cn(
                                  "flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full",
                                  tone.chip,
                                )}
                              >
                                <span className="h-[5px] w-[5px] rounded-full bg-current" />
                              </span>
                              <span
                                className={cn(
                                  "text-[13.5px] leading-snug",
                                  // the last step is the result, not another stage
                                  i === u.flow.length - 1
                                    ? "font-medium text-ink"
                                    : "text-body",
                                )}
                              >
                                {step}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      <div className="mt-5 flex items-center gap-3 rounded-[12px] bg-surface px-3.5 py-3 shadow-e1 ring-1 ring-line/60 transition-shadow duration-300 group-hover:shadow-e2">
                        <OutputIcon
                          className="h-[17px] w-[17px] shrink-0 text-ink"
                          strokeWidth={1.6}
                        />
                        <span className="font-mono text-[12.5px] text-ink">{u.output}</span>
                        <Check
                          className="ml-auto h-3.5 w-3.5 shrink-0 text-signal"
                          strokeWidth={2.4}
                        />
                      </div>
                    </div>
                  </div>
                </Panel>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </Section>
  );
}

/**
 * The one drifting field on this page, behind the use-case grid.
 *
 * Full-bleed rather than boxed to the 1200px column, because a wash that stops
 * at the container edge draws a second rectangle around the grid. The cards are
 * opaque, so the colour is only ever seen in the gutters and margins — it gives
 * the grid something to float above without tinting anything anyone reads. A
 * paper scrim sits under the section head for the same reason.
 */
function UseCaseBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-[-8%] h-[116%] w-screen max-w-[100vw] -translate-x-1/2 [mask-image:radial-gradient(76%_72%_at_50%_48%,#000_26%,transparent_100%)]"
    >
      <div className="grid-paper absolute inset-0 opacity-40" />

      <div className="drift-a absolute left-[-6%] top-[6%] h-[52%] w-[42%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(240,150,70,0.18),transparent_100%)] blur-[90px]" />
      <div className="drift-b absolute right-[-5%] top-[22%] h-[58%] w-[44%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(96,120,244,0.2),transparent_100%)] blur-[95px]" />
      <div className="drift-c absolute bottom-[2%] left-[28%] h-[46%] w-[40%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(21,160,92,0.12),transparent_100%)] blur-[100px]" />

      <div className="absolute inset-x-[2%] top-0 h-[44%] bg-[radial-gradient(58%_66%_at_46%_32%,rgba(252,251,249,0.88),transparent_76%)]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Who it is for                                                       */
/* ------------------------------------------------------------------ */

const SECTORS = [
  "Refineries and petrochemicals",
  "Power and utilities",
  "Defence manufacturing",
  "Public sector undertakings",
  "Pharmaceutical production",
  "Heavy engineering",
];

export function Sectors() {
  return (
    <Section id="sectors" tone="veil">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
        <SectionHead
          label="Who it is for"
          title="Anywhere the data can't travel."
          body="The constraint is the same across regulated industry: the most useful documents are the ones least allowed to leave."
        />
        <Reveal delay={0.08}>
          {/* One lifted sheet with ruled rows, not six more cards — the point of
              the list is that these industries share a single constraint. */}
          <Panel>
            <ul className="divide-y divide-line/70">
              {SECTORS.map((s, i) => (
                <li key={s} className="flex items-center gap-5 px-6 py-5">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-muted tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[16px] tracking-[-0.01em] text-ink">{s}</span>
                  <span className="ml-auto h-1 w-1 shrink-0 rounded-full bg-line-2" />
                </li>
              ))}
            </ul>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}
