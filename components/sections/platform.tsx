import {
  Calculator,
  Check,
  ClipboardList,
  Code2,
  FileScan,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  PenLine,
  Presentation,
  Ruler,
} from "lucide-react";
import { Label, LiveDot, Panel } from "@/components/ui/primitives";
import { DiagramFrame, Down, Node, Split } from "@/components/ui/diagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";

/* ------------------------------------------------------------------ */
/* Agentic execution                                                   */
/* ------------------------------------------------------------------ */

const LOOP = ["Ask", "Plan", "Retrieve", "Reason", "Execute", "Verify", "Deliver"];

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
    <Section id="agentic" tone="surface">
      <SectionHead
        label="Agentic execution"
        title="It doesn't just answer. It gets the work done."
        body="A chatbot returns text. An agent decomposes the task, pulls in the documents it needs, runs the tools, checks its own output and hands back a finished file."
      />

      <RevealGroup className="mt-14 flex flex-wrap gap-2" stagger={0.04}>
        {LOOP.map((s, i) => (
          <RevealItem key={s}>
            <span className="flex items-center gap-2.5 rounded-full bg-veil py-2 pl-2 pr-4">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink font-mono text-[10px] text-paper">
                {i + 1}
              </span>
              <span className="text-[13.5px] text-ink">{s}</span>
            </span>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
        <Reveal>
          <Panel className="flex h-full flex-col p-8">
            <Label>User request</Label>
            <p className="mt-7 text-[20px] leading-[1.35] tracking-[-0.02em] text-ink sm:text-[22px]">
              &ldquo;Analyse this inspection report and prepare an approval note.&rdquo;
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {["inspection_report.pdf", "thickness_log.xlsx"].map((f) => (
                <span
                  key={f}
                  className="rounded-[9px] bg-veil px-2.5 py-1.5 font-mono text-[10.5px] text-body"
                >
                  {f}
                </span>
              ))}
            </div>
            <p className="mt-auto pt-12 text-[13px] leading-relaxed text-muted">
              One instruction. Seven tool calls. Zero external requests.
            </p>
          </Panel>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="h-full rounded-[18px] bg-obsidian p-8 shadow-e3">
            <Label invert>Agent execution</Label>
            <ol className="mt-7 space-y-3.5">
              {EXECUTION.map((e, i) => (
                <li key={e} className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-signal/15 text-signal">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-[14.5px] text-paper/90">{e}</span>
                  <span className="ml-auto font-mono text-[10px] text-white/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex items-center gap-3 rounded-[13px] bg-white/[0.05] px-4 py-3.5">
              <FileText className="h-4 w-4 shrink-0 text-paper/70" strokeWidth={1.75} />
              <span className="text-[13.5px] text-paper">Approval_Note_TK-402.docx</span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.12em] text-signal">
                Ready
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Model routing                                                       */
/* ------------------------------------------------------------------ */

const MODELS = [
  { name: "Reasoning", role: "Analysis, planning, drafting", size: "Open-weight · 30B" },
  { name: "Coding", role: "Scripts, transforms, tooling", size: "Open-weight · 14B" },
  { name: "Vision", role: "Scans, drawings, photographs", size: "Open-weight VLM" },
  { name: "Embedding", role: "Knowledge indexing and search", size: "Local encoder" },
];

export function ModelRouting() {
  return (
    <Section id="models">
      <SectionHead
        label="Model routing"
        title="One interface. The right model for every task."
        body="No single open-weight model is best at everything. The orchestrator inspects the task and loads the model that fits — swapping weights on the same GPU instead of calling out to a service."
        align="center"
      />

      <Reveal delay={0.08} className="mt-16">
        <DiagramFrame>
          <div className="mx-auto flex max-w-[520px] flex-col items-center">
            <Node tone="ink" className="min-w-[160px]">
              Your task
            </Node>
            <Down />
            <Node tone="accent" className="w-full max-w-[260px]">
              Model router
            </Node>
            <Split count={3} />
            <div className="flex w-full gap-2">
              {MODELS.slice(0, 3).map((m) => (
                <Node key={m.name} className="flex-1" meta={m.size.split(" · ")[1] ?? "local"}>
                  {m.name}
                </Node>
              ))}
            </div>
          </div>
        </DiagramFrame>
      </Reveal>

      <RevealGroup className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MODELS.map((m) => (
          <RevealItem key={m.name}>
            <Panel hover className="h-full p-6">
              <div className="flex items-center justify-between">
                <p className="text-[15.5px] font-medium tracking-[-0.01em] text-ink">{m.name}</p>
                <LiveDot />
              </div>
              <p className="mt-4 text-[13.5px] leading-[1.6] text-body">{m.role}</p>
              <p className="label mt-6 text-[10px]">{m.size}</p>
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Multimodal                                                          */
/* ------------------------------------------------------------------ */

const INPUTS = [
  { icon: FileScan, label: "Scanned PDF", detail: "Inspection reports, certificates" },
  { icon: Ruler, label: "P&ID", detail: "Engineering drawings, layouts" },
  { icon: PenLine, label: "Handwriting", detail: "Field notes, log sheets" },
  { icon: ImageIcon, label: "Photograph", detail: "Equipment, corrosion, gauges" },
];

export function Multimodal() {
  return (
    <Section tone="surface">
      <SectionHead
        label="Multimodal"
        title="AI that understands the documents your plant actually uses."
        body="Most enterprise information is not clean text. It is a twenty-year-old scan, a marked-up drawing or a photo taken on the floor — and all of it is processed locally."
      />

      <RevealGroup className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {INPUTS.map(({ icon: Icon, label, detail }) => (
          <RevealItem key={label}>
            <Panel hover className="h-full overflow-hidden p-0">
              <div className="relative flex h-32 items-center justify-center bg-veil">
                <div className="grid-paper absolute inset-0 opacity-70" />
                <Icon className="relative h-7 w-7 text-body" strokeWidth={1.3} />
              </div>
              <div className="p-6">
                <p className="text-[15.5px] font-medium tracking-[-0.01em] text-ink">{label}</p>
                <p className="mt-1.5 text-[13px] leading-snug text-body">{detail}</p>
              </div>
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-4">
        <DiagramFrame className="bg-paper">
          <div className="mx-auto flex max-w-[460px] flex-col items-center">
            <Split count={4} direction="in" />
            <Node tone="accent" className="w-full max-w-[260px]">
              OCR + vision
            </Node>
            <Down />
            <Node className="w-full max-w-[260px]">Reasoning</Node>
            <Down />
            <Node tone="ink" className="w-full max-w-[260px]">
              Insight
            </Node>
          </div>
        </DiagramFrame>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Private knowledge                                                   */
/* ------------------------------------------------------------------ */

const SOURCES = ["SOPs", "Manuals", "Reports", "Drawings", "Standards"];

export function Knowledge() {
  return (
    <Section id="knowledge" tone="veil">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-16">
        <SectionHead
          label="Private knowledge"
          title="Your organization's knowledge, finally usable."
          body="Documents are parsed, chunked and embedded on your own machines, then stored in a local vector index. The agent cites the SOP it used — and that index never leaves the building."
        />

        <Reveal delay={0.1}>
          <Panel className="px-6 py-12 sm:px-10">
            <div className="mx-auto flex max-w-[380px] flex-col items-center">
              <div className="flex flex-wrap justify-center gap-2">
                {SOURCES.map((s) => (
                  <Node key={s} tone="quiet" className="px-3 py-2">
                    {s}
                  </Node>
                ))}
              </div>
              <Down />
              <Node className="w-full">Document parsing</Node>
              <Down />
              <Node className="w-full">Local embeddings</Node>
              <Down />
              <Node className="w-full">Vector index</Node>
              <Down />
              <Node tone="accent" className="w-full">
                Grounded answer
              </Node>
              <p className="label mt-10 text-center">Indexed on-premise · queried on-premise</p>
            </div>
          </Panel>
        </Reveal>
      </div>
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
    <Section>
      <SectionHead
        label="Deliverables"
        title="AI shouldn't just answer. It should deliver."
        body="Work ends in a file your team can open, edit, sign and file — not in a chat transcript someone has to retype."
      />

      <RevealGroup className="mt-14 grid gap-3 sm:grid-cols-3 lg:grid-cols-6" stagger={0.05}>
        {OUTPUTS.map(({ icon: Icon, label, detail }) => (
          <RevealItem key={label}>
            <Panel hover className="h-full p-5">
              <Icon className="h-4.5 w-4.5 text-ink" strokeWidth={1.6} />
              <p className="mt-8 text-[14px] font-medium text-ink">{label}</p>
              <p className="mt-1 text-[12px] leading-snug text-muted">{detail}</p>
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
