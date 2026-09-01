import { ArrowRight, Cloud, Clock, FileLock2, Puzzle } from "lucide-react";
import { Panel } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";

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
    <Section tone="surface">
      <SectionHead
        label="The problem"
        title="Sensitive work wasn't built for the cloud."
        body="Engineers work with documents, drawings, calculations and internal knowledge that cannot leave the organization's infrastructure — so the most useful AI has been the least available."
      />

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PROBLEMS.map(({ icon: Icon, title, body }) => (
          <RevealItem key={title}>
            <Panel hover className="h-full p-7">
              <Icon className="h-5 w-5 text-ink" strokeWidth={1.6} />
              <h3 className="mt-12 text-[15.5px] font-medium tracking-[-0.01em] text-ink">
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

const USE_CASES = [
  {
    id: "operations",
    domain: "Refinery operations",
    body: "A scanned inspection report becomes a checked, formatted approval note without anyone retyping the findings.",
    flow: ["Inspection scan", "Findings extracted", "SOP cross-check", "Approval note"],
    output: "Approval_Note.docx",
  },
  {
    id: "engineering",
    domain: "Engineering",
    body: "Drawings and datasheets are read together, calculations are run in a sandbox and the numbers are verified before they reach a report.",
    flow: ["Drawing + data", "Reasoning", "Calculation", "Verified report"],
    output: "Analysis.xlsx",
  },
  {
    id: "maintenance",
    domain: "Maintenance",
    body: "Field reports are matched against the right procedure, so recommendations cite the standard they came from.",
    flow: ["Field report", "SOP retrieval", "Recommendation"],
    output: "Work_Order.docx",
  },
  {
    id: "management",
    domain: "Management",
    body: "Long document sets are summarised into a deck with the source of every claim attached.",
    flow: ["Document set", "Analysis", "Presentation"],
    output: "Review.pptx",
  },
  {
    id: "development",
    domain: "Internal development",
    body: "Scripts and data transforms are generated, executed in an isolated container and only returned once they pass.",
    flow: ["Prompt", "Code", "Sandbox test", "Verified code"],
    output: "script.py",
  },
  {
    id: "compliance",
    domain: "Compliance",
    body: "Evidence is located across internal standards and assembled into an audit trail that points back at the original page.",
    flow: ["Standards", "Evidence search", "Audit report"],
    output: "Audit.docx",
  },
];

export function UseCases() {
  return (
    <Section>
      <SectionHead
        label="Use cases"
        title="Built for work that matters."
        body="Every workflow below starts with a document that could not have been uploaded anywhere, and ends with a file someone can sign."
      />

      <RevealGroup className="mt-16 grid gap-4 lg:grid-cols-2">
        {USE_CASES.map((u) => (
          <RevealItem key={u.id} id={u.id} className="scroll-mt-28">
            <Panel hover className="flex h-full flex-col p-8" as="article">
              <h3 className="display-sm text-[21px]">{u.domain}</h3>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-body">{u.body}</p>

              <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-2">
                {u.flow.map((f, i) => (
                  <span key={f} className="flex items-center gap-2">
                    <span className="rounded-full bg-veil px-3 py-1.5 text-[12px] text-body">
                      {f}
                    </span>
                    {i < u.flow.length - 1 ? (
                      <ArrowRight className="h-3 w-3 text-line-2" strokeWidth={2} />
                    ) : null}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center gap-2.5 pt-8">
                <span className="h-1 w-1 rounded-full bg-signal" />
                <span className="font-mono text-[11px] text-muted">{u.output}</span>
              </div>
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
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
    <Section tone="veil">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-16">
        <SectionHead
          label="Who it is for"
          title="Anywhere the data can't travel."
          body="The constraint is the same across regulated industry: the most useful documents are the ones least allowed to leave."
        />
        <Reveal delay={0.08}>
          <ul className="border-t border-line">
            {SECTORS.map((s) => (
              <li
                key={s}
                className="border-b border-line py-5 text-[16px] tracking-[-0.01em] text-ink"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
