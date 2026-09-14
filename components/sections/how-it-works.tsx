import {
  ArrowRight,
  Check,
  Code2,
  Database,
  Globe,
  Monitor,
  Smartphone,
  Split,
  Terminal,
  Users,
} from "lucide-react";
import { Panel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { WordRise } from "@/components/ui/word-rise";
import { cn } from "@/lib/utils";

const CLIENTS = [
  { label: "Web", icon: Globe },
  { label: "Desktop", icon: Monitor },
  { label: "IDE", icon: Code2 },
  { label: "CLI", icon: Terminal },
  { label: "Mobile", icon: Smartphone },
];

const STAGES = [
  {
    icon: Users,
    title: "Your apps",
    meta: "5 clients · 1 login",
    items: ["Chat, documents and code", "Choose effort, not models", "One company account"],
  },
  {
    icon: Database,
    title: "Pragyan server",
    meta: "access · memory · search",
    items: ["Users, roles and limits", "Shared memory and projects", "Search across internal files"],
  },
  {
    icon: Split,
    title: "Pragyan Router",
    meta: "automatic · per task",
    items: ["Understands the request", "Picks the best local model", "Checks important answers"],
  },
];

const MODELS = [
  { name: "Qwen3.6 35B", role: "plan · vision", tone: "field" },
  { name: "GLM-4.7 Flash", role: "code", tone: "eng" },
  { name: "gpt-oss 20B", role: "reasoning", tone: "doc" },
  { name: "PaddleOCR-VL", role: "scans", tone: "fin" },
] as const;

const DOT = {
  doc: "bg-accent",
  eng: "bg-[#b0670f]",
  field: "bg-[#5551c4]",
  fin: "bg-signal",
} as const;

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="paper">
      <Reveal>
        <p className="label">
          <span className="text-accent">[01]</span> How it works
        </p>
      </Reveal>
      <h2 className="display-sm mt-5 max-w-[16ch] text-[clamp(1.9rem,4.2vw,3rem)]">
        <WordRise segments={[{ text: "One server. The right model for each task." }]} />
      </h2>
      <Reveal delay={0.1}>
        <p className="measure mt-5 text-[16px] leading-[1.6] text-body">
          Pragyan routes each step to an open model running on your GPUs.
        </p>
      </Reveal>

      {/* the pipeline: clients → three stages → models. A row on desktop, a
          column on smaller screens, with the arrows turning to match. */}
      <Reveal delay={0.14} y={26}>
        <div className="mt-14 flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-2">
          <ClientRail />
          <Arrow />

          {STAGES.map((stage, i) => (
            <div key={stage.title} className="flex flex-col items-stretch lg:flex-row lg:items-center">
              <StageCard stage={stage} />
              {i < STAGES.length - 1 ? <Arrow /> : null}
            </div>
          ))}

          <Arrow />
          <ModelRail />
        </div>
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Arrow() {
  return (
    <span
      aria-hidden
      className="mx-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-muted shadow-e1 ring-1 ring-line"
    >
      <ArrowRight className="h-3.5 w-3.5 rotate-90 lg:rotate-0" strokeWidth={2} />
    </span>
  );
}

function ClientRail() {
  return (
    <ul className="flex shrink-0 flex-row flex-wrap justify-center gap-2 lg:w-[104px] lg:flex-col">
      {CLIENTS.map(({ label, icon: Icon }) => (
        <li
          key={label}
          className="flex items-center gap-2 rounded-[10px] bg-surface px-2.5 py-1.5 shadow-e1 ring-1 ring-line lg:flex-col lg:gap-1.5 lg:py-2.5"
        >
          <Icon className="h-4 w-4 text-body" strokeWidth={1.6} />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
            {label}
          </span>
        </li>
      ))}
    </ul>
  );
}

function StageCard({ stage }: { stage: (typeof STAGES)[number] }) {
  const Icon = stage.icon;
  return (
    <Panel className="w-full p-5 lg:w-[236px]">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-accent-tint text-accent">
          <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
        </span>
        <div>
          <p className="text-[15px] font-medium tracking-[-0.01em] text-ink">{stage.title}</p>
          <p className="font-mono text-[10px] tracking-[0.06em] text-muted">{stage.meta}</p>
        </div>
      </div>
      <ul className="mt-4 space-y-2">
        {stage.items.map((it) => (
          <li key={it} className="flex items-center gap-2">
            <Check className="h-3.5 w-3.5 shrink-0 text-signal" strokeWidth={2.5} />
            <span className="text-[13px] text-body">{it}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ModelRail() {
  return (
    <div className="shrink-0 lg:w-[220px]">
      <p className="label mb-3 text-[9.5px]">Models on your GPUs</p>
      <ul className="space-y-2">
        {MODELS.map((m) => (
          <li
            key={m.name}
            className="flex items-center gap-2.5 rounded-[11px] bg-surface px-3 py-2.5 shadow-e1 ring-1 ring-line"
          >
            <span className={cn("h-6 w-6 shrink-0 rounded-[7px]", `${DOT[m.tone]}/12`)}>
              <span className={cn("m-[7px] block h-2 w-2 rounded-full", DOT[m.tone])} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate font-mono text-[12px] text-ink">{m.name}</span>
              <span className="block font-mono text-[9.5px] text-muted">{m.role}</span>
            </span>
            <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", DOT[m.tone])} />
          </li>
        ))}
      </ul>
    </div>
  );
}
