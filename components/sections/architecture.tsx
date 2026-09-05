import {
  AppWindow,
  Brain,
  Cpu,
  Library,
  Network,
  ServerCog,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { Label, Panel } from "@/components/ui/primitives";
import { DiagramFrame, Layer, Node } from "@/components/ui/diagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Flow connectors                                                     */
/* ------------------------------------------------------------------ */

/**
 * `.net-pulse` moves its dash a fixed 268 user units, whichever path it is on.
 * So the connectors are drawn in a vertically stretched space — `UNITS` user
 * units to the rendered pixel — chosen so a rail is roughly a third of that
 * travel: the signal crosses, leaves the far end, and the connector then goes
 * dark for the rest of the cycle. Author these at 1:1 and the dash would still
 * be fading in when it ran off the end, which reads as a blink rather than
 * something moving.
 *
 * Every rail shares `UNITS`, so a signal travels at the same speed everywhere
 * in the diagram no matter how long its leg is.
 */
const UNITS = 2.4;
const CYCLE = 4.2;

const RAIL = 40;
const STEM = 28;

/**
 * One request descending: each leg starts a beat after the one feeding it, and
 * the last of them clears before the cycle restarts, so what you follow is a
 * front moving down the stack rather than nine independent blinks.
 */
const FLOW = {
  toHarness: 0,
  toOrchestrator: 0.3,
  fanStem: 0.6,
  fanOut: [0.86, 0.92, 0.89],
  fanIn: [1.3, 1.36, 1.33],
  gatherStem: 1.66,
  toStorage: 1.96,
  toBoundary: 2.3,
};

/* The three model columns run on slightly different clocks so the fan never
   moves as one bar. The spine keeps a single clock — that is the part whose
   ordering has to stay readable. */
const COLUMN_JITTER = [0, 0.16, -0.11];

function FlowRail({
  height = RAIL,
  delay,
  duration = CYCLE,
  arrow = true,
  className,
}: {
  height?: number;
  delay: number;
  duration?: number;
  arrow?: boolean;
  className?: string;
}) {
  const length = height * UNITS;

  return (
    <div className={cn("flex flex-col items-center", className)} aria-hidden>
      <svg
        width={8}
        height={height}
        viewBox={`0 0 8 ${length}`}
        preserveAspectRatio="none"
        fill="none"
      >
        <line x1="4" y1="0" x2="4" y2={length} className="stroke-line-2" strokeWidth="1" />
        <line
          x1="4"
          y1="0"
          x2="4"
          y2={length}
          className="net-pulse stroke-accent"
          strokeWidth="2"
          style={{ animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
        />
      </svg>
      {arrow ? (
        <svg width="8" height="5" viewBox="0 0 8 5" className="-mt-px fill-line-2">
          <path d="M4 5 0 0h8L4 5Z" />
        </svg>
      ) : null}
    </div>
  );
}

/**
 * The bracket that fans one rail into `count` columns, or gathers them back.
 * Only the vertical legs carry a signal: the horizontal rail is many times
 * longer than they are, and `.net-pulse` cannot cross both at one speed.
 */
function FlowSplit({
  count = 3,
  direction = "out",
  stemDelay,
  stubDelays,
}: {
  count?: number;
  direction?: "out" | "in";
  stemDelay: number;
  stubDelays: number[];
}) {
  const cols = Array.from({ length: count });
  const out = direction === "out";

  const bracket = (
    <div className="flex">
      {cols.map((_, i) => (
        <div key={i} className="flex-1">
          <div
            className={cn(
              "h-5 border-line-2",
              out ? "border-t" : "border-b",
              i === 0 &&
                (out ? "ml-[50%] rounded-tl-[12px] border-l" : "ml-[50%] rounded-bl-[12px] border-l"),
              i === cols.length - 1 &&
                (out ? "mr-[50%] rounded-tr-[12px] border-r" : "mr-[50%] rounded-br-[12px] border-r"),
            )}
          />
        </div>
      ))}
    </div>
  );

  const stubs = (
    <div className="flex">
      {cols.map((_, i) => (
        <div key={i} className="flex flex-1 justify-center">
          <FlowRail
            height={STEM}
            delay={stubDelays[i]}
            duration={CYCLE + COLUMN_JITTER[i % COLUMN_JITTER.length]}
            arrow={out}
          />
        </div>
      ))}
    </div>
  );

  const stem = <FlowRail height={STEM} delay={stemDelay} arrow={!out} className="mx-auto" />;

  return (
    <div className="w-full" aria-hidden>
      {out ? (
        <>
          {stem}
          {bracket}
          {stubs}
        </>
      ) : (
        <>
          {stubs}
          {bracket}
          {stem}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Layered architecture                                                */
/* ------------------------------------------------------------------ */

export function Layers() {
  return (
    <Section tone="surface">
      <SectionHead
        label="System design"
        animateTitle="Open by design. Modular by architecture."
        body="Each layer is replaceable. Swap the model, the vector store or the serving runtime without rewriting the workbench sitting on top of them."
        align="center"
      />

      <Reveal delay={0.08} className="mt-16">
        <DiagramFrame caption="No outbound route required">
          <div className="mx-auto flex max-w-[600px] flex-col items-center">
            <Layer title="Desktop client" detail="Workspace, tasks, artifacts" />
            <FlowRail delay={FLOW.toHarness} />
            <Layer title="Agent harness" detail="Planner · Memory · Tools · Verification" />
            <FlowRail delay={FLOW.toOrchestrator} />
            <Layer title="Orchestrator" detail="Model routing and scheduling" tone="accent" />

            <FlowSplit stemDelay={FLOW.fanStem} stubDelays={FLOW.fanOut} />
            <div className="flex w-full gap-2">
              {["Reasoning LLM", "Coding model", "Vision model"].map((m) => (
                <Node key={m} className="flex-1">
                  {m}
                </Node>
              ))}
            </div>
            <FlowSplit direction="in" stemDelay={FLOW.gatherStem} stubDelays={FLOW.fanIn} />

            <div className="flex w-full gap-2">
              {["Local RAG", "Memory", "Sandbox"].map((m) => (
                <Node key={m} tone="quiet" className="flex-1">
                  {m}
                </Node>
              ))}
            </div>
            <FlowRail delay={FLOW.toStorage} />
            <Layer title="Local storage" detail="Documents, indexes, audit logs" />
            <FlowRail delay={FLOW.toBoundary} />
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
    <section className="relative overflow-hidden px-6 py-24 sm:px-8 md:py-32">
      <PrinciplesBackdrop />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <SectionHead label="Principles" animateTitle="Four decisions the whole system rests on." />

        <RevealGroup className="mt-16 grid gap-x-14 gap-y-12 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <RevealItem key={p.n}>
              <div className="relative pt-7">
                {/* The rule fades out rather than stopping, so four of them
                    stacked over a moving wash never read as a table. */}
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-line-2 via-line to-transparent" />
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-accent">{p.n}</span>
                  <h3 className="display-sm text-[21px]">{p.title}</h3>
                </div>
                <p className="measure mt-4 text-[15px] leading-[1.65] text-body">{p.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

/**
 * The page's one wash — saffron, periwinkle and the violet where they meet,
 * the same three the home statement drifts. Kept off every other section here
 * on purpose: a second one and neither is a moment any more.
 *
 * The scrim through the middle is what makes it safe to set type on top; the
 * colour is only ever felt at the shoulders.
 */
function PrinciplesBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_76%_at_50%_50%,#000_28%,transparent_100%)]"
    >
      <div className="grid-paper absolute inset-0 opacity-45" />

      <div className="drift-a absolute left-[2%] top-[2%] h-[68%] w-[44%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(240,150,70,0.26),rgba(240,168,110,0.10)_58%,transparent_100%)] blur-[90px]" />
      <div className="drift-b absolute right-0 top-[16%] h-[76%] w-[48%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(96,120,244,0.30),rgba(140,164,248,0.12)_56%,transparent_100%)] blur-[95px]" />
      <div className="drift-c absolute bottom-0 left-[24%] h-[58%] w-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(132,96,228,0.22),rgba(160,130,236,0.08)_58%,transparent_100%)] blur-[100px]" />

      <div className="absolute inset-x-[5%] top-[10%] h-[80%] bg-[radial-gradient(60%_58%_at_50%_50%,rgba(252,251,249,0.84),transparent_74%)]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Technology stack                                                    */
/* ------------------------------------------------------------------ */

/**
 * The site's four category colours, put to work as bands of the stack rather
 * than as decoration: indigo is what we orchestrate, amber is compute, violet
 * is what the system reads and remembers, green is what guards it. Six grey
 * lists look like one undifferentiated pile; four colours across six groups
 * let you see the shape of the stack at a glance.
 */
const TONES = {
  eng: { tint: "bg-[#fdf3e6] text-[#b0670f]", rule: "bg-[#e6b271]" },
  doc: { tint: "bg-accent-tint text-accent", rule: "bg-accent/40" },
  field: { tint: "bg-[#efeffb] text-[#5551c4]", rule: "bg-[#a5a2e0]" },
  fin: { tint: "bg-[#e9f6ef] text-[#0f8b55]", rule: "bg-[#74c39d]" },
} as const;

const STACK = [
  {
    group: "Agent runtime",
    icon: Workflow,
    tone: "doc",
    items: ["Agent harness", "Planner", "Verification loop"],
  },
  {
    group: "Model serving",
    icon: Cpu,
    tone: "eng",
    items: ["llama-swap", "vLLM", "Open-weight LLM / VLM"],
  },
  {
    group: "Knowledge",
    icon: Library,
    tone: "field",
    items: ["Docling", "Qdrant", "Local embeddings"],
  },
  {
    group: "Memory",
    icon: Brain,
    tone: "field",
    items: ["Mem0", "Task state", "Project context"],
  },
  {
    group: "Security",
    icon: ShieldCheck,
    tone: "fin",
    items: ["RBAC", "Sandbox", "Network isolation", "Audit logs"],
  },
  {
    group: "Client",
    icon: AppWindow,
    tone: "doc",
    items: ["Desktop application", "Local file workspace"],
  },
] satisfies { group: string; icon: typeof Workflow; tone: keyof typeof TONES; items: string[] }[];

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

      <RevealGroup className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {STACK.map(({ group, icon: Icon, tone, items }) => (
          <RevealItem key={group}>
            <div className="flex h-full flex-col">
              <span className={cn("h-[2px] w-10 rounded-full", TONES[tone].rule)} />

              <div className="mt-5 flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px]",
                    TONES[tone].tint,
                  )}
                >
                  <Icon className="h-[17px] w-[17px]" strokeWidth={1.7} />
                </span>
                <h3 className="display-sm text-[17px]">{group}</h3>
              </div>

              {/* Only the lead component is tinted. Colouring every chip turns
                  six groups into confetti; colouring one keeps the group
                  identifiable and still lets the rest read as a set. */}
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {items.map((item, i) => (
                  <li
                    key={item}
                    className={cn(
                      "rounded-full px-3 py-1.5 font-mono text-[10.5px]",
                      i === 0
                        ? cn("font-medium", TONES[tone].tint)
                        : "bg-surface text-body shadow-e1 ring-1 ring-line",
                    )}
                  >
                    {item}
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
        {DEPLOYMENTS.map(({ icon: Icon, title, scale, body }, i) => (
          <RevealItem key={title}>
            <Panel hover className="flex h-full flex-col p-8">
              <div className="flex items-start justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-accent-tint text-accent">
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-muted">
                  {`0${i + 1}`}
                </span>
              </div>

              <h3 className="display-sm mt-12 text-[20px]">{title}</h3>
              <p className="mt-4 text-[14px] leading-[1.6] text-body">{body}</p>

              {/* The scale is pushed to the floor of the card so all three sit
                  on one line — three deployments compared, not three blurbs. */}
              <div className="mt-auto pt-10">
                <div className="rule" />
                <p className="label mt-4">{scale}</p>
              </div>
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
