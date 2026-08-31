import { ArrowRight, Cpu, Network, ServerCog } from "lucide-react";
import { Button, Node } from "@/components/ui/primitives";
import { DiagramFrame, Down, Layer, Split } from "@/components/ui/diagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";

/* ------------------------------------------------------------------ */
/* Use cases                                                           */
/* ------------------------------------------------------------------ */

const USE_CASES = [
  { domain: "Refinery operations", flow: ["Inspection scan", "Findings", "SOP check", "Approval note"] },
  { domain: "Engineering", flow: ["Drawing", "Reasoning", "Calculation", "Verified report"] },
  { domain: "Maintenance", flow: ["Field report", "SOP retrieval", "Recommendation"] },
  { domain: "Management", flow: ["Documents", "Analysis", "Presentation"] },
  { domain: "Internal development", flow: ["Prompt", "Code", "Sandbox test", "Verified code"] },
  { domain: "Compliance", flow: ["Standards", "Evidence search", "Audit report"] },
];

export function UseCases() {
  return (
    <Section tone="surface">
      <SectionHead
        eyebrow="Use cases"
        title="Built for work that matters."
        sub="Every workflow below starts with a document that could not have been uploaded anywhere and ends with a file someone can sign."
      />

      <RevealGroup className="mt-14 divide-y divide-line border-y border-line" stagger={0.05}>
        {USE_CASES.map((u) => (
          <RevealItem key={u.domain}>
            <div className="group grid gap-4 py-7 transition-colors duration-300 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1fr)] md:items-center">
              <p className="text-[17px] font-medium tracking-[-0.015em] text-ink">{u.domain}</p>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
                {u.flow.map((f, i) => (
                  <span key={f} className="flex items-center gap-2.5">
                    <span className="rounded-full border border-line bg-paper px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-soft">
                      {f}
                    </span>
                    {i < u.flow.length - 1 ? (
                      <ArrowRight className="h-3 w-3 text-line-strong" strokeWidth={2} />
                    ) : null}
                  </span>
                ))}
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Architecture + stack                                                */
/* ------------------------------------------------------------------ */

const STACK = [
  { group: "Agent runtime", items: ["Agent harness", "Planner", "Verification loop"] },
  { group: "Model serving", items: ["llama-swap", "vLLM", "Open-weight LLM / VLM"] },
  { group: "Knowledge", items: ["Docling", "Qdrant", "Local embeddings"] },
  { group: "Memory", items: ["Mem0", "Task state", "Project context"] },
  { group: "Security", items: ["RBAC", "Sandbox", "Network isolation", "Audit logs"] },
  { group: "Client", items: ["Desktop application", "Local file workspace"] },
];

export function Architecture() {
  return (
    <Section id="architecture" tone="paper">
      <SectionHead
        eyebrow="Architecture"
        title={
          <>
            Open by design.
            <br className="hidden sm:block" /> Modular by architecture.
          </>
        }
        sub="Each layer is replaceable. Swap the model, the vector store or the serving runtime without rewriting the workbench above it."
        align="center"
      />

      <Reveal delay={0.08} className="mt-16">
        <DiagramFrame caption="No internet route required">
          <div className="mx-auto flex max-w-[640px] flex-col items-center">
            <Layer title="Desktop Client" detail="Workspace, tasks, artifacts" />
            <Down height={22} />
            <Layer title="Agent Harness" detail="Planner · Memory · Tools · Verification" />
            <Down height={22} />
            <Layer title="Orchestrator" detail="Model routing and scheduling" tone="accent" />

            <Split count={3} />
            <div className="flex w-full">
              {["LLM", "Coding", "VLM"].map((m) => (
                <div key={m} className="flex flex-1 justify-center px-1">
                  <Node className="w-full">{m}</Node>
                </div>
              ))}
            </div>
            <Split count={3} direction="in" />

            <div className="flex w-full gap-2">
              {["Local RAG", "Memory", "Sandbox"].map((m) => (
                <Node key={m} tone="soft" className="flex-1">
                  {m}
                </Node>
              ))}
            </div>
            <Down height={22} />
            <Layer title="Local Storage" detail="Documents, indexes, audit logs" />
            <Down height={22} />
            <Layer title="No Outbound Route" tone="ink" />
          </div>
        </DiagramFrame>
      </Reveal>

      <Reveal delay={0.1} className="mt-4">
        <div className="rounded-[18px] border border-line bg-surface p-7 sm:p-9">
          <p className="eyebrow">Powered by open-source infrastructure</p>
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {STACK.map((s) => (
              <div key={s.group}>
                <p className="text-[13px] font-medium text-ink">{s.group}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {s.items.map((i) => (
                    <li
                      key={i}
                      className="rounded-full border border-line bg-paper px-2.5 py-1 font-mono text-[10.5px] text-muted"
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
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
    <Section tone="surface">
      <SectionHead eyebrow="Deployment" title="Runs where your data already lives." />

      <RevealGroup className="mt-14 grid gap-4 md:grid-cols-3">
        {DEPLOYMENTS.map(({ icon: Icon, title, scale, body }) => (
          <RevealItem key={title}>
            <div className="lift flex h-full flex-col rounded-[16px] border border-line bg-paper/60 p-7 hover:border-line-strong">
              <Icon className="h-5 w-5 text-ink" strokeWidth={1.6} />
              <h3 className="mt-10 text-[17px] font-medium tracking-[-0.015em] text-ink">
                {title}
              </h3>
              <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.14em] text-muted">
                {scale}
              </p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-muted">{body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */

export function CTA() {
  return (
    <section
      id="demo"
      className="relative scroll-mt-20 overflow-hidden border-t border-line bg-ink px-5 py-28 sm:px-8 md:py-36"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(90%_70%_at_50%_50%,#000,transparent_75%)]" />
      <div className="relative mx-auto w-full max-w-[900px] text-center">
        <Reveal>
          <h2 className="display text-[clamp(2.1rem,5.4vw,3.9rem)] text-paper">
            Your data doesn&rsquo;t need to leave your perimeter
            <span className="text-paper/45"> for AI to work.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-7 max-w-[560px] text-[16.5px] leading-relaxed text-paper/60">
            Deploy a private AI workbench on your own infrastructure — and keep intelligence
            where your organization already keeps its most valuable information.
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-3">
            <Button href="#demo" className="bg-paper text-ink hover:bg-paper/85">
              Request a Demo
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Button>
            <Button
              href="#architecture"
              variant="ghost"
              className="border-paper/25 text-paper hover:border-paper hover:bg-paper/10"
            >
              Explore Architecture
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.22}>
          <p className="mt-10 font-mono text-[10.5px] uppercase tracking-[0.16em] text-paper/35">
            On-premise · Air-gapped ready · Open-weight · Auditable
          </p>
        </Reveal>
      </div>
    </section>
  );
}
