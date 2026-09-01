import { Cpu, Network, ServerCog } from "lucide-react";
import { Label, Panel } from "@/components/ui/primitives";
import { DiagramFrame, Down, Layer, Node, Split } from "@/components/ui/diagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";

/* ------------------------------------------------------------------ */
/* Layered architecture                                                */
/* ------------------------------------------------------------------ */

export function Layers() {
  return (
    <Section tone="surface">
      <SectionHead
        label="System design"
        title="Open by design. Modular by architecture."
        body="Each layer is replaceable. Swap the model, the vector store or the serving runtime without rewriting the workbench sitting on top of them."
        align="center"
      />

      <Reveal delay={0.08} className="mt-16">
        <DiagramFrame caption="No outbound route required">
          <div className="mx-auto flex max-w-[600px] flex-col items-center">
            <Layer title="Desktop client" detail="Workspace, tasks, artifacts" />
            <Down />
            <Layer title="Agent harness" detail="Planner · Memory · Tools · Verification" />
            <Down />
            <Layer title="Orchestrator" detail="Model routing and scheduling" tone="accent" />

            <Split count={3} />
            <div className="flex w-full gap-2">
              {["Reasoning LLM", "Coding model", "Vision model"].map((m) => (
                <Node key={m} className="flex-1">
                  {m}
                </Node>
              ))}
            </div>
            <Split count={3} direction="in" />

            <div className="flex w-full gap-2">
              {["Local RAG", "Memory", "Sandbox"].map((m) => (
                <Node key={m} tone="quiet" className="flex-1">
                  {m}
                </Node>
              ))}
            </div>
            <Down />
            <Layer title="Local storage" detail="Documents, indexes, audit logs" />
            <Down />
            <Layer title="No outbound route" tone="ink" />
          </div>
        </DiagramFrame>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Principles                                                          */
/* ------------------------------------------------------------------ */

const PRINCIPLES = [
  {
    n: "01",
    title: "Model agnostic",
    body: "Every model is an open-weight artifact you can pin, review or replace. Nothing is welded to a vendor endpoint.",
  },
  {
    n: "02",
    title: "Layer isolation",
    body: "The harness talks to the orchestrator through a stable contract, so serving runtimes can change underneath it.",
  },
  {
    n: "03",
    title: "Verifiable by default",
    body: "Retrieval cites its source and generated code runs in a sandbox before its output is trusted.",
  },
  {
    n: "04",
    title: "Offline first",
    body: "Network access is an optional convenience for staging models, never a runtime dependency.",
  },
];

export function Principles() {
  return (
    <Section>
      <SectionHead label="Principles" title="Four decisions the whole system rests on." />

      <RevealGroup className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
        {PRINCIPLES.map((p) => (
          <RevealItem key={p.n}>
            <div className="border-t border-line pt-6">
              <p className="font-mono text-[11px] tracking-[0.14em] text-muted">{p.n}</p>
              <h3 className="display-sm mt-4 text-[20px]">{p.title}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.6] text-body">{p.body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Technology stack                                                    */
/* ------------------------------------------------------------------ */

const STACK = [
  { group: "Agent runtime", items: ["Agent harness", "Planner", "Verification loop"] },
  { group: "Model serving", items: ["llama-swap", "vLLM", "Open-weight LLM / VLM"] },
  { group: "Knowledge", items: ["Docling", "Qdrant", "Local embeddings"] },
  { group: "Memory", items: ["Mem0", "Task state", "Project context"] },
  { group: "Security", items: ["RBAC", "Sandbox", "Network isolation", "Audit logs"] },
  { group: "Client", items: ["Desktop application", "Local file workspace"] },
];

export function Stack() {
  return (
    <Section tone="veil">
      <Reveal>
        <Label>Powered by open-source infrastructure</Label>
        <p className="measure mt-6 text-[16.5px] leading-[1.65] text-body">
          These are components we build on, not products we claim. Each one is swappable, and
          each runs inside your network.
        </p>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map((s) => (
          <RevealItem key={s.group}>
            <div className="border-t border-line pt-5">
              <p className="text-[14px] font-medium text-ink">{s.group}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.items.map((i) => (
                  <li
                    key={i}
                    className="rounded-full bg-surface px-3 py-1.5 font-mono text-[10.5px] text-body shadow-e1 ring-1 ring-line"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Deployment                                                          */
/* ------------------------------------------------------------------ */

const DEPLOYMENTS = [
  {
    icon: Cpu,
    title: "Workstation",
    scale: "Single GPU",
    body: "One engineer, one machine. Models run beside the documents they read.",
  },
  {
    icon: ServerCog,
    title: "On-premise server",
    scale: "Shared inference",
    body: "A department or plant shares a GPU server behind the corporate firewall.",
  },
  {
    icon: Network,
    title: "Air-gapped",
    scale: "Maximum isolation",
    body: "No route out at all. Models and updates are staged through controlled media.",
  },
];

export function Deployment() {
  return (
    <Section id="deployment" tone="surface">
      <SectionHead label="Deployment" title="Runs where your data already lives." />

      <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3">
        {DEPLOYMENTS.map(({ icon: Icon, title, scale, body }) => (
          <RevealItem key={title}>
            <Panel hover className="flex h-full flex-col p-8">
              <Icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
              <h3 className="display-sm mt-12 text-[20px]">{title}</h3>
              <p className="label mt-2">{scale}</p>
              <p className="mt-5 text-[14px] leading-[1.6] text-body">{body}</p>
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
