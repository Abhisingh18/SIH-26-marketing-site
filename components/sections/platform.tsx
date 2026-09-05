import {
  Binary,
  Brain,
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
  ScanEye,
} from "lucide-react";
import { Label, LiveDot, Panel } from "@/components/ui/primitives";
import { DiagramFrame, Down, Node, Split } from "@/components/ui/diagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * The site's four category colours, in the same mapping the hero document strip
 * uses. Repeated here rather than shared because the hero keeps its own copy
 * private — but the mapping itself must not drift: a thickness log is amber on
 * the home page, so it has to be amber here too, or the colour stops being a
 * category and turns into decoration.
 *
 * `well` tints a chip or an icon plate; `node` is the flatter pair for diagram
 * boxes, which keep ink text so a wiring diagram stays readable.
 */
const TONES = {
  eng: { well: "bg-[#fdf3e6] text-[#b0670f]", node: "bg-[#fdf3e6] ring-[#b0670f]/15" },
  doc: { well: "bg-accent-tint text-accent", node: "bg-accent-tint ring-accent/15" },
  field: { well: "bg-[#efeffb] text-[#5551c4]", node: "bg-[#efeffb] ring-[#5551c4]/15" },
  fin: { well: "bg-[#e9f6ef] text-[#0f8b55]", node: "bg-[#e9f6ef] ring-[#0f8b55]/15" },
} as const;

type Tone = keyof typeof TONES;

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

const ATTACHMENTS = [
  { name: "inspection_report.pdf", tone: "field" },
  { name: "thickness_log.xlsx", tone: "eng" },
] satisfies { name: string; tone: Tone }[];

export function Agentic() {
  return (
    <Section id="agentic" tone="surface">
      <SectionHead
        label="Agentic execution"
        animateTitle="It doesn't just answer. It gets the work done."
        body="A chatbot returns text. An agent decomposes the task, pulls in the documents it needs, runs the tools, checks its own output and hands back a finished file."
      />

      <RevealGroup className="mt-14 flex flex-wrap gap-2" stagger={0.04}>
        {LOOP.map((s, i) => (
          <RevealItem key={s}>
            <span className="flex items-center gap-2.5 rounded-full bg-surface py-2 pl-2 pr-4 shadow-e1 ring-1 ring-line/70">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink font-mono text-[10px] text-paper">
                {i + 1}
              </span>
              <span className="text-[13.5px] text-ink">{s}</span>
            </span>
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]">
        <Reveal>
          <Panel hover className="flex h-full flex-col p-8">
            <Label>User request</Label>
            <p className="mt-7 text-[20px] leading-[1.35] tracking-[-0.02em] text-ink sm:text-[22px]">
              &ldquo;Analyse this inspection report and prepare an approval note.&rdquo;
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {ATTACHMENTS.map((f) => (
                <span
                  key={f.name}
                  className={cn(
                    "rounded-[9px] px-2.5 py-1.5 font-mono text-[10.5px]",
                    TONES[f.tone].well,
                  )}
                >
                  {f.name}
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
  {
    name: "Reasoning",
    role: "Analysis, planning, drafting",
    size: "Open-weight · 30B",
    icon: Brain,
    tone: "doc",
  },
  {
    name: "Coding",
    role: "Scripts, transforms, tooling",
    size: "Open-weight · 14B",
    icon: Code2,
    tone: "eng",
  },
  {
    name: "Vision",
    role: "Scans, drawings, photographs",
    size: "Open-weight VLM",
    icon: ScanEye,
    tone: "field",
  },
  {
    name: "Embedding",
    role: "Knowledge indexing and search",
    size: "Local encoder",
    icon: Binary,
    tone: "fin",
  },
] satisfies { name: string; role: string; size: string; icon: typeof Brain; tone: Tone }[];

export function ModelRouting() {
  return (
    <Section id="models" className="relative overflow-hidden">
      <RoutingBackdrop />

      <div className="relative">
        <SectionHead
          label="Model routing"
          title="One interface. The right model for every task."
          body="No single open-weight model is best at everything. The orchestrator inspects the task and loads the model that fits — swapping weights on the same GPU instead of calling out to a service."
          align="center"
        />

        <Reveal delay={0.08} className="mt-14">
          {/* translucent frame so the drift behind it stays continuous — an
              opaque plate here would punch a hole through the field */}
          <DiagramFrame className="bg-veil/70 backdrop-blur-[2px]">
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
                  <Node
                    key={m.name}
                    className={cn("flex-1 shadow-e1 ring-1", TONES[m.tone].node)}
                    meta={m.size.split(" · ")[1] ?? "local"}
                  >
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
                  <span
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-[11px]",
                      TONES[m.tone].well,
                    )}
                  >
                    <m.icon className="h-4 w-4" strokeWidth={1.7} />
                  </span>
                  <LiveDot />
                </div>
                <p className="mt-7 text-[15.5px] font-medium tracking-[-0.01em] text-ink">
                  {m.name}
                </p>
                <p className="mt-2 text-[13.5px] leading-[1.6] text-body">{m.role}</p>
                <p className="label mt-6 text-[10px]">{m.size}</p>
              </Panel>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

/**
 * The page's one drifting field, behind the section that is actually about
 * choosing between things — four colours meeting is the argument.
 *
 * Same palette and the same very low alpha as the home statement, on the same
 * three unrelated cycles so the blobs never line up and the loop never
 * announces itself. A paper scrim runs through the middle because the heading
 * and the diagram sit directly on this and both have to keep full contrast.
 */
function RoutingBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_76%_at_50%_50%,#000_30%,transparent_100%)]"
    >
      <div className="grid-paper absolute inset-0 opacity-40" />

      <div className="drift-a absolute left-[5%] top-[6%] h-[62%] w-[45%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(240,150,70,0.26),rgba(240,168,110,0.10)_58%,transparent_100%)] blur-[90px]" />
      <div className="drift-b absolute right-[3%] top-[18%] h-[70%] w-[48%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(96,120,244,0.30),rgba(140,164,248,0.12)_56%,transparent_100%)] blur-[95px]" />
      <div className="drift-c absolute bottom-0 left-[27%] h-[58%] w-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(132,96,228,0.22),rgba(160,130,236,0.08)_58%,transparent_100%)] blur-[100px]" />

      <div className="absolute inset-x-[6%] top-[12%] h-[74%] bg-[radial-gradient(60%_58%_at_50%_50%,rgba(252,251,249,0.86),transparent_74%)]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Multimodal                                                          */
/* ------------------------------------------------------------------ */

const INPUTS = [
  { icon: FileScan, label: "Scanned PDF", detail: "Inspection reports, certificates", tone: "doc" },
  { icon: Ruler, label: "P&ID", detail: "Engineering drawings, layouts", tone: "eng" },
  { icon: PenLine, label: "Handwriting", detail: "Field notes, log sheets", tone: "field" },
  { icon: ImageIcon, label: "Photograph", detail: "Equipment, corrosion, gauges", tone: "fin" },
] satisfies { icon: typeof Ruler; label: string; detail: string; tone: Tone }[];

export function Multimodal() {
  return (
    <Section id="multimodal" tone="surface">
      <SectionHead
        label="Multimodal"
        title="AI that understands the documents your plant actually uses."
        body="Most enterprise information is not clean text. It is a twenty-year-old scan, a marked-up drawing or a photo taken on the floor — and all of it is processed locally."
      />

      <RevealGroup className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {INPUTS.map(({ icon: Icon, label, detail, tone }) => (
          <RevealItem key={label}>
            <Panel hover className="h-full overflow-hidden p-0">
              {/* the plate carries the category colour, so the four input kinds
                  separate before a single caption is read */}
              <div
                className={cn("relative flex h-32 items-center justify-center", TONES[tone].well)}
              >
                <div className="grid-paper absolute inset-0 opacity-50" />
                <Icon className="relative h-7 w-7" strokeWidth={1.3} />
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
        <DiagramFrame>
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

const SOURCES = [
  { label: "SOPs", tone: "doc" },
  { label: "Manuals", tone: "eng" },
  { label: "Reports", tone: "field" },
  { label: "Drawings", tone: "eng" },
  { label: "Standards", tone: "doc" },
] satisfies { label: string; tone: Tone }[];

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
              {/* the sources keep their category colours all the way down the
                  pipeline, so what goes in is recognisable in what comes out */}
              <div className="flex flex-wrap justify-center gap-2">
                {SOURCES.map((s) => (
                  <span
                    key={s.label}
                    className={cn(
                      "rounded-[10px] px-3 py-2 text-[13px] leading-tight",
                      TONES[s.tone].well,
                    )}
                  >
                    {s.label}
                  </span>
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
  { icon: FileText, label: "Word", detail: "Approval notes, reports", tone: "doc" },
  { icon: FileSpreadsheet, label: "Excel", detail: "Calculations, logs", tone: "fin" },
  { icon: Presentation, label: "PowerPoint", detail: "Management decks", tone: "field" },
  { icon: Code2, label: "Code", detail: "Scripts, tooling", tone: "eng" },
  { icon: ClipboardList, label: "Reports", detail: "Structured summaries", tone: "doc" },
  { icon: Calculator, label: "Calculations", detail: "Verified numbers", tone: "fin" },
] satisfies { icon: typeof FileText; label: string; detail: string; tone: Tone }[];

export function Deliverables() {
  return (
    <Section id="deliverables">
      <SectionHead
        label="Deliverables"
        animateTitle="AI shouldn't just answer. It should deliver."
        body="Work ends in a file your team can open, edit, sign and file — not in a chat transcript someone has to retype."
      />

      {/* Three across rather than six: at six these were thumbnail-sized and the
          row read as an icon strip, which is the opposite of the claim above. */}
      <RevealGroup className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {OUTPUTS.map(({ icon: Icon, label, detail, tone }) => (
          <RevealItem key={label}>
            <Panel hover className="flex h-full items-center gap-4 p-5">
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px]",
                  TONES[tone].well,
                )}
              >
                <Icon className="h-4.5 w-4.5" strokeWidth={1.6} />
              </span>
              <div>
                <p className="text-[14.5px] font-medium text-ink">{label}</p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-muted">{detail}</p>
              </div>
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
