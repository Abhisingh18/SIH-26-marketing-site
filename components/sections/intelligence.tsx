import { FileScan, Image as ImageIcon, PenLine, Ruler } from "lucide-react";
import { LiveDot, Node } from "@/components/ui/primitives";
import { DiagramFrame, Down, Split } from "@/components/ui/diagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";

/* ------------------------------------------------------------------ */
/* Multi-model routing                                                 */
/* ------------------------------------------------------------------ */

const MODELS = [
  { name: "Reasoning", role: "Analysis, planning, drafting", size: "Open-weight · 30B" },
  { name: "Coding", role: "Scripts, transforms, tooling", size: "Open-weight · 14B" },
  { name: "Vision", role: "Scans, drawings, photographs", size: "Open-weight VLM" },
  { name: "Embedding", role: "Knowledge indexing & search", size: "Local encoder" },
];

export function MultiModel() {
  return (
    <Section tone="paper">
      <SectionHead
        eyebrow="Model routing"
        title={
          <>
            One interface.
            <br className="hidden sm:block" /> The right model for every task.
          </>
        }
        sub="No single open-weight model is best at everything. The orchestrator inspects the task and loads the model that fits — swapping weights on the same GPU instead of calling out to a service."
        align="center"
      />

      <Reveal delay={0.08} className="mt-16">
        <DiagramFrame>
          <div className="mx-auto flex max-w-[560px] flex-col items-center">
            <Node tone="ink">Your task</Node>
            <Down />
            <Node tone="accent" className="w-full max-w-[260px]">
              Model Router
            </Node>
            <Split count={3} />
            <div className="flex w-full">
              {["Reasoning", "Coding", "Vision"].map((m) => (
                <div key={m} className="flex flex-1 justify-center px-1">
                  <Node className="w-full">{m}</Node>
                </div>
              ))}
            </div>
          </div>
        </DiagramFrame>
      </Reveal>

      <RevealGroup className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MODELS.map((m) => (
          <RevealItem key={m.name}>
            <div className="lift h-full rounded-[14px] border border-line bg-surface p-5 hover:border-line-strong">
              <div className="flex items-center justify-between">
                <p className="text-[15px] font-medium text-ink">{m.name}</p>
                <LiveDot />
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-muted">{m.role}</p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                {m.size}
              </p>
            </div>
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
        eyebrow="Multimodal"
        title="AI that understands the documents your plant actually uses."
        sub="Most enterprise information is not clean text. It is a twenty-year-old scan, a marked-up drawing or a photo taken on the floor. All of it is processed locally."
      />

      <RevealGroup className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {INPUTS.map(({ icon: Icon, label, detail }) => (
          <RevealItem key={label}>
            <div className="lift group relative h-full overflow-hidden rounded-[16px] border border-line bg-paper/70 p-6 hover:border-line-strong">
              <div className="grid-paper pointer-events-none absolute inset-0 opacity-60" />
              <div className="relative">
                <div className="flex h-24 items-center justify-center rounded-[10px] border border-dashed border-line-strong bg-surface/80">
                  <Icon className="h-6 w-6 text-ink-soft" strokeWidth={1.4} />
                </div>
                <p className="mt-5 text-[15px] font-medium text-ink">{label}</p>
                <p className="mt-1 text-[12.5px] leading-snug text-muted">{detail}</p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-4">
        <div className="rounded-[16px] border border-line bg-paper/60 px-6 py-10">
          <div className="mx-auto flex max-w-[520px] flex-col items-center">
            <Split count={4} direction="in" />
            <Node tone="accent" className="w-full max-w-[280px]">
              OCR + Vision
            </Node>
            <Down height={22} />
            <Node className="w-full max-w-[280px]">Reasoning</Node>
            <Down height={22} />
            <Node tone="ink" className="w-full max-w-[280px]">
              Insight
            </Node>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Private knowledge / RAG                                             */
/* ------------------------------------------------------------------ */

const SOURCES = ["SOPs", "Manuals", "Reports", "Drawings", "Standards"];

export function Knowledge() {
  return (
    <Section tone="paper">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:items-center">
        <SectionHead
          eyebrow="Private knowledge"
          title={
            <>
              Your organization&rsquo;s knowledge,
              <br className="hidden sm:block" /> finally usable.
            </>
          }
          sub="Documents are parsed, chunked and embedded on your own machines, then stored in a local vector index. The agent cites the SOP it used — and that index never leaves the building."
        />

        <Reveal delay={0.1}>
          <div className="rounded-[18px] border border-line bg-surface px-6 py-10 sm:px-10">
            <div className="mx-auto flex max-w-[420px] flex-col items-center">
              <div className="flex flex-wrap justify-center gap-2">
                {SOURCES.map((s) => (
                  <Node key={s} tone="soft">
                    {s}
                  </Node>
                ))}
              </div>
              <Down height={26} />
              <Node className="w-full">Document parsing</Node>
              <Down height={26} />
              <Node className="w-full">Local embeddings</Node>
              <Down height={26} />
              <Node className="w-full">Vector index</Node>
              <Down height={26} />
              <Node tone="accent" className="w-full">
                Grounded answer
              </Node>
              <p className="mt-8 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
                Indexed on-premise · queried on-premise
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
