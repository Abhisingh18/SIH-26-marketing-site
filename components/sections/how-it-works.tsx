import { Check, Cpu, Database, Split, Users } from "lucide-react";
import { PixelRover } from "@/components/ui/pixel-rover";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { WordRise } from "@/components/ui/word-rise";
import { cn } from "@/lib/utils";

const CLIENTS = [
  { label: "Web", kind: "window" as const },
  { label: "Desktop", kind: "window" as const },
  { label: "IDE", kind: "ide" as const },
  { label: "CLI", kind: "cli" as const },
  { label: "Mobile", kind: "phone" as const },
];

const STAGES = [
  {
    icon: Users,
    title: "Your apps",
    meta: "5 clients · 1 login",
    tone: "doc",
    items: ["Chat, documents and code", "Choose effort, not models", "One company account"],
  },
  {
    icon: Database,
    title: "Pragyan server",
    meta: "access · memory · search",
    tone: "field",
    items: ["Users, roles and limits", "Shared memory and projects", "Search across internal files"],
  },
  {
    icon: Split,
    title: "Pragyan Router",
    meta: "automatic · per task",
    tone: "eng",
    items: ["Understands the request", "Picks the best local model", "Checks important answers"],
  },
];

const MODELS = [
  { name: "Qwen3.6 35B", role: "plan · vision", tone: "field" },
  { name: "GLM-4.7 Flash", role: "code", tone: "eng" },
  { name: "gpt-oss 20B", role: "reasoning", tone: "doc" },
  { name: "PaddleOCR-VL", role: "scans", tone: "fin" },
] as const;

const TONE = {
  doc: "bg-accent-tint text-accent",
  eng: "bg-[#fdf3e6] text-[#b0670f]",
  field: "bg-[#efeffb] text-[#5551c4]",
  fin: "bg-[#e9f6ef] text-[#0f8b55]",
} as const;

const WASH = { doc: "#2338cc", eng: "#b0670f", field: "#5551c4", fin: "#0f8b55" } as const;

const CARD_BG = {
  doc: "linear-gradient(158deg, #eef1fe, #f8f9fe 52%, var(--color-surface))",
  eng: "linear-gradient(158deg, #fdf4e8, #fbf8f1 52%, var(--color-surface))",
  field: "linear-gradient(158deg, #f0f0fc, #f7f7fd 52%, var(--color-surface))",
  fin: "linear-gradient(158deg, #e9f6ef, #f3f9f5 52%, var(--color-surface))",
} as const;

type ToneKey = keyof typeof TONE;

export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="paper" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(90%_80%_at_50%_40%,#000_25%,transparent_100%)]"
      >
        <div className="drift-b absolute right-[6%] top-[6%] h-[62%] w-[42%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(88,114,246,0.14),transparent_70%)] blur-[95px]" />
        <div className="drift-c absolute left-[10%] bottom-[4%] h-[56%] w-[40%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(132,96,228,0.1),transparent_70%)] blur-[95px]" />
      </div>

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

      <Reveal delay={0.14} y={26}>
        <WiredDiagram />
        <StackedDiagram />
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop — an absolutely-placed canvas with real connector wires     */
/* ------------------------------------------------------------------ */

const VB = { w: 1200, h: 470 };
const CLIENT_X = 4;
const CLIENT_W = 150;
const CLIENT_CY = [50, 143, 236, 329, 422];
const CARD_W = 200;
const CARD_H = 196;
const CARD_TOP = 137;
const CARD_CY = CARD_TOP + CARD_H / 2;
const CARD_X = [214, 454, 694];
const MODEL_X = 934;
const MODEL_W = 250;
const MODEL_H = 66;
const MODEL_CY = [112, 196, 280, 364];

const pct = (v: number, axis: "x" | "y") =>
  `${(v / (axis === "x" ? VB.w : VB.h)) * 100}%`;

function wire(x1: number, y1: number, x2: number, y2: number) {
  const dx = (x2 - x1) * 0.5;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

function WiredDiagram() {
  const appsLeft = CARD_X[0];
  const routerRight = CARD_X[2] + CARD_W;

  return (
    <div className="relative mt-14 hidden aspect-[1200/470] w-full lg:block">
      {/* wires behind everything */}
      <svg viewBox={`0 0 ${VB.w} ${VB.h}`} className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        <defs>
          <linearGradient id="hiw-wire" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#c9cdf1" />
            <stop offset="100%" stopColor="#8ea2f4" />
          </linearGradient>
        </defs>

        {/* clients converge into Your apps */}
        {CLIENT_CY.map((cy, i) => {
          const d = wire(CLIENT_X + CLIENT_W, cy, appsLeft, CARD_CY);
          return (
            <g key={`c${i}`}>
              <path d={d} stroke="#e3e0d8" strokeWidth="1.5" />
              <path
                d={d}
                pathLength={100}
                stroke="url(#hiw-wire)"
                strokeWidth="1.5"
                className="wire-flow"
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            </g>
          );
        })}

        {/* router fans out to the models */}
        {MODEL_CY.map((cy, i) => {
          const d = wire(routerRight, CARD_CY, MODEL_X, cy);
          return (
            <g key={`m${i}`}>
              <path d={d} stroke="#e3e0d8" strokeWidth="1.5" />
              <path
                d={d}
                pathLength={100}
                stroke="url(#hiw-wire)"
                strokeWidth="1.5"
                className="wire-flow"
                style={{ animationDelay: `${0.4 + i * 0.5}s` }}
              />
            </g>
          );
        })}
      </svg>

      {/* clients */}
      {CLIENTS.map((c, i) => (
        <div
          key={c.label}
          className="absolute"
          style={{ left: pct(CLIENT_X, "x"), top: pct(CLIENT_CY[i] - 34, "y"), width: pct(CLIENT_W, "x") }}
        >
          <ClientDevice kind={c.kind} label={c.label} />
        </div>
      ))}

      {/* stage cards + arrow chips between them */}
      {STAGES.map((s, i) => (
        <div
          key={s.title}
          className="absolute"
          style={{ left: pct(CARD_X[i], "x"), top: pct(CARD_TOP, "y"), width: pct(CARD_W, "x") }}
        >
          <StageCard stage={s} />
        </div>
      ))}
      {[0, 1].map((i) => (
        <div
          key={`a${i}`}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: pct((CARD_X[i] + CARD_W + CARD_X[i + 1]) / 2, "x"), top: pct(CARD_CY, "y") }}
        >
          <ArrowChip />
        </div>
      ))}

      {/* models */}
      <div className="absolute" style={{ left: pct(MODEL_X, "x"), top: pct(52, "y") }}>
        <p className="label text-[9.5px]">Models on your GPUs</p>
      </div>
      {MODELS.map((m, i) => (
        <div
          key={m.name}
          className="absolute"
          style={{ left: pct(MODEL_X, "x"), top: pct(MODEL_CY[i] - MODEL_H / 2, "y"), width: pct(MODEL_W, "x") }}
        >
          <ModelCard model={m} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile — a plain stack                                              */
/* ------------------------------------------------------------------ */

function StackedDiagram() {
  return (
    <div className="mt-12 space-y-3 lg:hidden">
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {CLIENTS.map((c) => (
          <li key={c.label}>
            <ClientDevice kind={c.kind} label={c.label} />
          </li>
        ))}
      </ul>
      <Down />
      {STAGES.map((s, i) => (
        <div key={s.title}>
          <StageCard stage={s} />
          {i < STAGES.length - 1 ? <Down /> : null}
        </div>
      ))}
      <Down />
      <div>
        <p className="label mb-3 text-[9.5px]">Models on your GPUs</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {MODELS.map((m) => (
            <ModelCard key={m.name} model={m} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Down() {
  return (
    <div className="flex justify-center py-0.5" aria-hidden>
      <span className="h-5 w-px bg-line-2" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

/**
 * A small device thumbnail per client — a light app window, a dark editor, a
 * terminal wearing the rover badge, a phone — so the rail reads as the surfaces
 * the product runs on rather than a column of identical icons.
 */
function ClientDevice({ kind, label }: { kind: "window" | "ide" | "cli" | "phone"; label: string }) {
  return (
    <div>
      <div className="overflow-hidden rounded-[10px] shadow-e1 ring-1 ring-line">
        {kind === "window" ? (
          <div className="bg-surface">
            <div className="flex items-center gap-1 bg-veil/70 px-2 py-1">
              <span className="h-1 w-1 rounded-full bg-line-2" />
              <span className="h-1 w-1 rounded-full bg-line-2" />
              <span className="h-1 w-1 rounded-full bg-line-2" />
            </div>
            <div className="flex gap-1.5 p-2">
              <div className="w-1/3 space-y-1">
                {[100, 70, 85].map((w, i) => (
                  <div key={i} className="h-1 rounded-full bg-veil" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="flex-1 space-y-1 border-l border-line pl-1.5">
                {[90, 60].map((w, i) => (
                  <div key={i} className="h-1 rounded-full bg-veil" style={{ width: `${w}%` }} />
                ))}
                <div className="pt-1 text-right font-mono text-[6px] text-muted">Happy late</div>
              </div>
            </div>
          </div>
        ) : kind === "ide" ? (
          <div className="bg-obsidian p-2">
            <div className="flex gap-1.5">
              <div className="w-1/4 space-y-1">
                {[80, 60, 70].map((w, i) => (
                  <div key={i} className="h-1 rounded-full bg-white/15" style={{ width: `${w}%` }} />
                ))}
              </div>
              <div className="flex-1 space-y-1">
                <div className="h-1 w-[70%] rounded-full bg-[#7fe0ab]/60" />
                <div className="h-1 w-[90%] rounded-full bg-white/15" />
                <div className="h-1 w-[55%] rounded-full bg-[#9db4ff]/60" />
                <div className="h-1 w-[80%] rounded-full bg-white/15" />
              </div>
            </div>
          </div>
        ) : kind === "cli" ? (
          <div className="flex items-center justify-between gap-2 bg-obsidian px-2.5 py-3">
            <PixelRover unit={2} />
            <span className="font-mono text-[8px] text-white/70">
              Pragyan <span className="text-white/35">dev</span>
            </span>
          </div>
        ) : (
          <div className="mx-auto w-[58%] rounded-t-[8px] bg-obsidian p-1.5 pb-0">
            <div className="relative mb-1 flex justify-center">
              <span className="h-1 w-5 rounded-full bg-white/20" />
            </div>
            <div className="space-y-1 px-0.5">
              {[90, 70, 80, 55].map((w, i) => (
                <div key={i} className="h-1 rounded-full bg-white/12" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        )}
      </div>
      <p className="mt-2 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
        {label}
      </p>
    </div>
  );
}

function ArrowChip() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-surface text-muted shadow-e1 ring-1 ring-line">
      <svg width="10" height="10" viewBox="0 0 10 10" className="fill-none stroke-current" strokeWidth="1.6">
        <path d="M2 5h6M5.5 2.5 8 5l-2.5 2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function StageCard({ stage }: { stage: (typeof STAGES)[number] }) {
  const Icon = stage.icon;
  const tone = stage.tone as ToneKey;
  return (
    <div
      className="relative overflow-hidden rounded-[16px] p-5 shadow-e2 ring-1 ring-line/70"
      style={{ background: CARD_BG[tone] }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-70 blur-2xl"
        style={{ background: `radial-gradient(closest-side, ${WASH[tone]}26, transparent)` }}
      />
      <div className="relative flex items-center gap-3">
        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]", TONE[tone])}>
          <Icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
        </span>
        <div className="min-w-0">
          <p className="text-[15px] font-medium tracking-[-0.01em] text-ink">{stage.title}</p>
          <p className="truncate font-mono text-[10px] tracking-[0.06em] text-muted">{stage.meta}</p>
        </div>
      </div>
      <ul className="relative mt-4 space-y-2">
        {stage.items.map((it) => (
          <li key={it} className="flex items-start gap-2">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal" strokeWidth={2.5} />
            <span className="text-[12.5px] leading-snug text-body">{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ModelCard({ model }: { model: (typeof MODELS)[number] }) {
  return (
    <div className="flex items-center gap-2.5 rounded-[12px] px-3 py-2.5 shadow-e1 ring-1 ring-line" style={{ background: CARD_BG[model.tone as ToneKey] }}>
      <span className={cn("flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px]", TONE[model.tone])}>
        <Cpu className="h-3.5 w-3.5" strokeWidth={1.7} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate font-mono text-[12px] text-ink">{model.name}</span>
        <span className="block font-mono text-[9.5px] text-muted">{model.role}</span>
      </span>
      <span className="dot-live h-1.5 w-1.5 shrink-0 rounded-full bg-signal" />
    </div>
  );
}
