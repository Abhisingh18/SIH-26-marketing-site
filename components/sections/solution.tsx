import {
  Bot,
  BookOpen,
  Eye,
  Network,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { Card, Node } from "@/components/ui/primitives";
import { DiagramFrame, Down, Split } from "@/components/ui/diagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";

/* ------------------------------------------------------------------ */
/* Solution — the perimeter diagram                                    */
/* ------------------------------------------------------------------ */

export function Solution() {
  return (
    <Section id="solutions" tone="paper">
      <SectionHead
        eyebrow="The solution"
        title="Bring intelligence inside the perimeter."
        sub="One desktop workbench sits on top of an agent harness, a model router and your own knowledge. Every layer runs on hardware you control."
        align="center"
      />

      <Reveal delay={0.08} className="mt-16">
        <DiagramFrame caption="Nothing leaves your environment">
          <div className="mx-auto flex max-w-[620px] flex-col items-center">
            <Node tone="ink">User</Node>
            <Down />
            <Node className="w-full max-w-[300px]">Sovereign Workbench</Node>
            <Down />
            <Node className="w-full max-w-[300px]">Agent Harness</Node>
            <Down />
            <Node tone="accent" className="w-full max-w-[300px]">
              Task Router
            </Node>

            <Split count={3} className="mt-1" />
            <div className="flex w-full">
              {["Reasoning", "Coding", "Vision"].map((m) => (
                <div key={m} className="flex flex-1 justify-center px-1">
                  <Node tone="soft" className="w-full">
                    {m}
                  </Node>
                </div>
              ))}
            </div>
            <Split count={3} direction="in" className="mt-1" />

            <Node className="w-full max-w-[300px]">Local Knowledge</Node>
            <Down />
            <Node className="w-full max-w-[300px]">Tools &amp; Sandbox</Node>
            <Down />
            <Node tone="ink" className="w-full max-w-[300px]">
              Deliverables
            </Node>
          </div>
        </DiagramFrame>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Platform features                                                   */
/* ------------------------------------------------------------------ */

const FEATURES = [
  {
    icon: Bot,
    title: "Agentic workflows",
    body: "Plan, execute, verify and iterate across multi-step tasks instead of returning a single answer.",
  },
  {
    icon: Network,
    title: "Multi-model intelligence",
    body: "Route every task to the local model best suited for it — reasoning, coding or vision.",
  },
  {
    icon: Eye,
    title: "Multimodal understanding",
    body: "Read PDFs, scans, handwriting, photographs and engineering drawings, not just clean text.",
  },
  {
    icon: BookOpen,
    title: "Private knowledge",
    body: "Search internal SOPs, manuals and reports through a local RAG index built on your documents.",
  },
  {
    icon: Wrench,
    title: "Secure tool execution",
    body: "Run code, manipulate files and build spreadsheets inside a controlled, sandboxed environment.",
  },
  {
    icon: ShieldCheck,
    title: "Sovereign by design",
    body: "Inference, embeddings, storage and output all stay within your infrastructure boundary.",
  },
];

export function Platform() {
  return (
    <Section id="platform" tone="surface">
      <SectionHead
        eyebrow="The platform"
        title={
          <>
            One workbench.
            <br className="hidden sm:block" /> Every AI workflow.
          </>
        }
      />

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, body }) => (
          <RevealItem key={title} className="bg-surface">
            <Card
              interactive={false}
              className="h-full rounded-none border-0 p-7 transition-colors duration-300 hover:bg-paper"
            >
              <Icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
              <h3 className="mt-9 text-[16.5px] font-medium tracking-[-0.01em] text-ink">
                {title}
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-muted">{body}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
