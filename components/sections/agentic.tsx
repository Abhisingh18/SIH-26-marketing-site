import {
  Calculator,
  Check,
  ClipboardList,
  Code2,
  FileSpreadsheet,
  FileText,
  Presentation,
} from "lucide-react";
import { Node } from "@/components/ui/primitives";
import { Down, Step } from "@/components/ui/diagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";

/* ------------------------------------------------------------------ */
/* Agent execution                                                     */
/* ------------------------------------------------------------------ */

const LOOP = [
  { label: "Ask", detail: "natural language" },
  { label: "Plan", detail: "decompose" },
  { label: "Retrieve", detail: "local rag" },
  { label: "Reason", detail: "model routing" },
  { label: "Execute", detail: "sandboxed tools" },
  { label: "Verify", detail: "check output" },
  { label: "Deliver", detail: "docx · xlsx · code" },
];

const EXECUTION = [
  "Read inspection report",
  "Extract findings and tag numbers",
  "Analyse attached images",
  "Search relevant SOP",
  "Cross-check requirements",
  "Draft approval note",
  "Generate DOCX",
];

export function Agentic() {
  return (
    <Section id="agentic" tone="paper">
      <SectionHead
        eyebrow="Agentic execution"
        title={
          <>
            It doesn&rsquo;t just answer.
            <br className="hidden sm:block" /> It gets the work done.
          </>
        }
        sub="A chatbot returns text. An agent plans the task, pulls in the documents it needs, runs the tools, checks its own output and hands back a finished file."
      />

      <div className="mt-16 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
        <Reveal>
          <div className="flex h-full flex-col rounded-[18px] border border-line bg-surface p-7">
            <p className="eyebrow">User request</p>
            <p className="mt-6 text-[19px] leading-snug tracking-[-0.015em] text-ink sm:text-[21px]">
              &ldquo;Analyse this inspection report and prepare an approval note.&rdquo;
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {["inspection_report.pdf", "thickness_log.xlsx"].map((f) => (
                <span
                  key={f}
                  className="rounded-[8px] border border-line bg-paper px-2.5 py-1.5 font-mono text-[10.5px] text-muted"
                >
                  {f}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-10">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                One instruction · seven tool calls · zero external requests
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="h-full rounded-[18px] border border-line bg-ink p-7">
            <p className="eyebrow text-paper/45">Agent execution</p>
            <ol className="mt-6 space-y-3.5">
              {EXECUTION.map((e, i) => (
                <li key={e} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/20 text-signal">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-[14.5px] text-paper/90">{e}</span>
                  <span className="ml-auto font-mono text-[10px] text-paper/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-7 flex items-center gap-3 rounded-[12px] border border-paper/12 bg-paper/5 px-4 py-3.5">
              <FileText className="h-4 w-4 shrink-0 text-paper/70" strokeWidth={1.75} />
              <span className="text-[13.5px] text-paper">Approval_Note_TK-402.docx</span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
                Ready
              </span>
            </div>
          </div>
        </Reveal>
      </div>

      <RevealGroup className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
        {LOOP.map((s, i) => (
          <RevealItem key={s.label}>
            <Step index={i + 1} label={s.label} detail={s.detail} />
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Deliverables                                                        */
/* ------------------------------------------------------------------ */

const OUTPUTS = [
  { icon: FileText, label: "Word", detail: "Approval notes, reports" },
  { icon: FileSpreadsheet, label: "Excel", detail: "Calculations, logs" },
  { icon: Presentation, label: "PowerPoint", detail: "Management decks" },
  { icon: Code2, label: "Code", detail: "Scripts, tooling" },
  { icon: ClipboardList, label: "Reports", detail: "Structured summaries" },
  { icon: Calculator, label: "Calculations", detail: "Verified numbers" },
];

export function Deliverables() {
  return (
    <Section tone="surface">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:items-center">
        <SectionHead
          eyebrow="Deliverables"
          title={
            <>
              AI shouldn&rsquo;t just answer.
              <br className="hidden sm:block" /> It should deliver.
            </>
          }
          sub="Work ends in a file your team can open, edit, sign and file — not in a chat transcript someone has to retype."
        />

        <Reveal delay={0.1}>
          <div className="rounded-[18px] border border-line bg-paper/60 p-6 sm:p-8">
            <div className="flex flex-col items-center">
              <Node tone="ink">Agent</Node>
              <Down height={22} />
              <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-3">
                {OUTPUTS.map(({ icon: Icon, label, detail }) => (
                  <div
                    key={label}
                    className="lift rounded-[12px] border border-line bg-surface p-4 hover:border-line-strong"
                  >
                    <Icon className="h-4 w-4 text-ink" strokeWidth={1.6} />
                    <p className="mt-5 text-[13.5px] font-medium text-ink">{label}</p>
                    <p className="mt-0.5 text-[11.5px] leading-snug text-muted">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
