import { FileSearch, KeyRound, Lock, ScrollText, Terminal, Unplug } from "lucide-react";
import { SovereigntyMonitor } from "@/components/mock/monitor";
import { Panel } from "@/components/ui/primitives";
import { Down, Node } from "@/components/ui/diagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* The boundary                                                        */
/* ------------------------------------------------------------------ */

const CHAIN = [
  { label: "Your data", meta: "documents never copied out" },
  { label: "Your hardware", meta: "workstation or on-prem GPU" },
  { label: "Your models", meta: "open weights you can inspect" },
  { label: "Your output", meta: "files written to your disk" },
];

export function Boundary() {
  return (
    <Section id="boundary" tone="surface">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
        <SectionHead
          label="The boundary"
          animateTitle="Private by architecture, not by policy."
          body="There is no setting to switch off and no vendor promise to audit. The application has no cloud dependency, so there is no path for a document to leave — even by mistake."
        />

        <Reveal delay={0.1}>
          <Panel className="px-6 py-12 sm:px-10">
            <div className="mx-auto flex max-w-[320px] flex-col items-center">
              {CHAIN.map((c, i) => (
                <div key={c.label} className="flex w-full flex-col items-center">
                  <Node
                    tone={i === CHAIN.length - 1 ? "ink" : "default"}
                    meta={c.meta}
                    className="w-full"
                  >
                    {c.label}
                  </Node>
                  {i < CHAIN.length - 1 ? <Down height={22} /> : null}
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Monitor                                                             */
/* ------------------------------------------------------------------ */

export function Monitor() {
  return (
    <Section id="monitor" className="relative overflow-hidden">
      <MonitorBackdrop />

      <SectionHead
        label="Sovereignty monitor"
        animateTitle="Don't trust the claim. Verify the boundary."
        body="The workbench ships with a monitor that counts every outbound attempt and reports the health of each local service. If a number ever moves off zero, you will know before anyone else does."
        align="center"
        className="relative"
      />
      <Reveal delay={0.1} className="relative mt-16">
        <SovereigntyMonitor />
      </Reveal>
    </Section>
  );
}

/**
 * The page's one drifting field, spent on its one live object.
 *
 * Same palette as the statement on the home page — saffron, periwinkle, violet
 * — but pushed to the shoulders and pulled down the section, because the dark
 * panel sits in the middle and colour behind it would only ever be seen as a
 * halo. A paper scrim holds the top of the section near-white so the heading
 * keeps full contrast.
 */
function MonitorBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 h-full w-screen max-w-[100vw] -translate-x-1/2 [mask-image:radial-gradient(80%_76%_at_50%_54%,#000_30%,transparent_100%)]"
    >
      <div className="grid-paper absolute inset-0 opacity-50" />

      <div className="drift-a absolute left-[3%] top-[12%] h-[64%] w-[42%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(240,150,70,0.26),rgba(240,168,110,0.10)_58%,transparent_100%)] blur-[85px]" />
      <div className="drift-b absolute right-[1%] top-[24%] h-[70%] w-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(96,120,244,0.32),rgba(140,164,248,0.12)_56%,transparent_100%)] blur-[90px]" />
      <div className="drift-c absolute bottom-0 left-[26%] h-[56%] w-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(132,96,228,0.24),rgba(160,130,236,0.09)_58%,transparent_100%)] blur-[95px]" />

      <div className="absolute inset-x-[6%] top-0 h-[48%] bg-[radial-gradient(58%_64%_at_50%_36%,rgba(252,251,249,0.88),transparent_74%)]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

/**
 * One tone per concern, following the convention the rest of the site uses:
 * colour sits in a small tinted well behind the icon, never on the card. A
 * reviewer arrives looking for one of these three things — the group headings
 * are what they scan, the icons are what they land on.
 */
const CONTROL_TONES = {
  network: "bg-accent-tint text-accent",
  access: "bg-[#efeffb] text-[#5551c4]",
  data: "bg-[#e9f6ef] text-[#0f8b55]",
} as const;

const CONTROL_GROUPS = [
  {
    group: "Network",
    tone: "network",
    items: [
      {
        icon: Unplug,
        title: "Air-gapped deployment",
        body: "Runs with no outbound route at all. Models and updates are staged through controlled media.",
      },
      {
        icon: Terminal,
        title: "Sandboxed execution",
        body: "Generated code runs in an isolated container with no network and a scoped filesystem.",
      },
    ],
  },
  {
    group: "Access & audit",
    tone: "access",
    items: [
      {
        icon: KeyRound,
        title: "Role-based access",
        body: "Control which teams can reach which models, tools and document collections.",
      },
      {
        icon: ScrollText,
        title: "Full audit trail",
        body: "Every prompt, retrieval, tool call and generated file is recorded and exportable.",
      },
    ],
  },
  {
    group: "Data & models",
    tone: "data",
    items: [
      {
        icon: Lock,
        title: "Encryption at rest",
        body: "Document stores, vector indexes and artifacts stay encrypted on local disk.",
      },
      {
        icon: FileSearch,
        title: "Inspectable weights",
        body: "Open-weight models you can pin, review and replace — no opaque hosted endpoint.",
      },
    ],
  },
] satisfies {
  group: string;
  tone: keyof typeof CONTROL_TONES;
  items: { icon: typeof Unplug; title: string; body: string }[];
}[];

export function Controls() {
  return (
    <Section id="controls" tone="veil">
      <SectionHead
        label="Controls"
        title="The guarantees your security team will ask about."
      />

      <RevealGroup className="mt-14 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {CONTROL_GROUPS.map((g) => (
          <RevealItem key={g.group} className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <p className="label">{g.group}</p>
              <span className="h-px flex-1 bg-line-2" />
            </div>

            {g.items.map(({ icon: Icon, title, body }) => (
              <Panel key={title} hover className="flex flex-1 flex-col p-7">
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-[10px]",
                    CONTROL_TONES[g.tone],
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.7} />
                </span>
                <p className="mt-6 text-[15.5px] font-medium tracking-[-0.01em] text-ink">
                  {title}
                </p>
                <p className="mt-3 text-[13.5px] leading-[1.6] text-body">{body}</p>
              </Panel>
            ))}
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
