import {
  ArrowUpRight,
  Boxes,
  Fingerprint,
  FolderLock,
  Gauge,
  Route,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { Panel } from "@/components/ui/primitives";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * The features bento. Every card carries a small working mock of the thing it
 * names rather than a stock icon and a sentence — the mock is the claim, the
 * text underneath just labels it. Colour follows the site's four categories.
 */
export function Features() {
  return (
    <Section id="features" tone="veil">
      <SectionHead
        label="Features"
        animateTitle="Private AI that does the work"
        body="Code, documents, scans and internal knowledge, handled inside your network."
      />

      <RevealGroup className="mt-14 grid gap-4 lg:grid-cols-3" stagger={0.06}>
        {/* row 1 — wide code card + model orbital */}
        <RevealItem className="lg:col-span-2">
          <Card
            icon={FolderLock}
            tone="doc"
            title="Works directly on your code"
            body="The workbench reads, edits and tests local repositories with your approval."
            link="Get the CLI"
          >
            <CodeMock />
          </Card>
        </RevealItem>
        <RevealItem>
          <Card
            icon={Route}
            tone="field"
            title="A model for every task"
            body="Scans go to OCR, code to a coding model and calculations to a reasoning model."
          >
            <OrbitalMock />
          </Card>
        </RevealItem>

        {/* row 2 — CLI sign-in + on-prem flow */}
        <RevealItem>
          <Card
            icon={Fingerprint}
            tone="doc"
            title="Sign in from any terminal"
            body="Approve a short browser code. No passwords are stored in the CLI."
          >
            <AuthMock />
          </Card>
        </RevealItem>
        <RevealItem className="lg:col-span-2">
          <Card
            icon={Shield}
            tone="fin"
            title="Data stays on your network"
            body="Prompts, files and scans go only to models on your hardware."
          >
            <NetworkMock />
          </Card>
        </RevealItem>

        {/* row 3 — three equal cards */}
        <RevealItem>
          <Card
            icon={Gauge}
            tone="eng"
            title="Choose effort, not models"
            body="Effort controls speed, reasoning depth and answer checks."
          >
            <EffortMock />
          </Card>
        </RevealItem>
        <RevealItem>
          <Card
            icon={Boxes}
            tone="field"
            title="Tools for real work"
            body="Run code, edit files, use MCP tools and keep recoverable snapshots."
            link="Explore the CLI"
          >
            <ChipsMock items={["MCP", "skills", "sessions", "snapshots", "git worktrees", "shell", "ripgrep", "web search"]} tone="field" />
          </Card>
        </RevealItem>
        <RevealItem>
          <Card
            icon={ShieldCheck}
            tone="fin"
            title="Built for company access"
            body="Use SSO, roles, groups, 2FA and per-user limits."
          >
            <ChipsMock items={["SSO", "OpenID", "SAML", "LDAP", "2FA", "Admin roles", "Groups", "Rate limits", "Traces"]} tone="fin" active="SSO" />
          </Card>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Card shell                                                          */
/* ------------------------------------------------------------------ */

const TONES = {
  doc: "bg-accent-tint text-accent",
  eng: "bg-[#fdf3e6] text-[#b0670f]",
  field: "bg-[#efeffb] text-[#5551c4]",
  fin: "bg-[#e9f6ef] text-[#0f8b55]",
} as const;

type Tone = keyof typeof TONES;

function Card({
  icon: Icon,
  tone,
  title,
  body,
  link,
  children,
}: {
  icon: typeof Shield;
  tone: Tone;
  title: string;
  body: string;
  link?: string;
  children: React.ReactNode;
}) {
  return (
    <Panel hover className="flex h-full flex-col p-6 sm:p-7">
      {/* the mock takes the top of the card and fills the width */}
      <div className="mb-7 min-h-[168px] flex-1">{children}</div>

      <span className={cn("flex h-9 w-9 items-center justify-center rounded-[10px]", TONES[tone])}>
        <Icon className="h-4.5 w-4.5" strokeWidth={1.7} />
      </span>
      <h3 className="mt-4 text-[17px] font-medium tracking-[-0.015em] text-ink">{title}</h3>
      <p className="mt-2 text-[14px] leading-[1.6] text-body">{body}</p>
      {link ? (
        <span className="mt-4 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-accent">
          {link}
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
        </span>
      ) : null}
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Mocks                                                               */
/* ------------------------------------------------------------------ */

function CodeMock() {
  return (
    <div className="grid h-full gap-3 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      {/* file tree */}
      <div className="rounded-[12px] bg-veil/70 p-3.5 font-mono text-[11.5px] text-body ring-1 ring-line/60">
        <div className="mb-2 flex items-center justify-between text-muted">
          <span>~/SIH26</span>
          <span className="flex items-center gap-1.5 text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            on disk
          </span>
        </div>
        {[
          ["📁 src", 0],
          ["📁 routes", 1],
          ["upload.ts", 2],
          ["auth.ts", 2],
          ["index.ts", 1],
          ["package.json", 0],
        ].map(([name, indent], i) => (
          <div
            key={i}
            className={cn("py-0.5", (name as string) === "upload.ts" && "text-ink")}
            style={{ paddingLeft: `${(indent as number) * 12}px` }}
          >
            {name}
          </div>
        ))}
      </div>

      {/* diff */}
      <div className="rounded-[12px] bg-obsidian p-3.5 font-mono text-[11.5px] shadow-e1">
        <p className="text-white/45">src/routes/upload.ts</p>
        <div className="mt-2.5 space-y-1">
          <p className="text-white/70">
            <span className="mr-3 text-white/30">12</span>router.post(&apos;/upload&apos;,
          </p>
          <p className="rounded bg-signal/15 px-1 text-[#7fe0ab]">
            <span className="mr-3 text-white/30">13</span>+ rateLimit(&#123; max: 30 &#125;),
          </p>
          <p className="text-white/70">
            <span className="mr-3 text-white/30">14</span>handler)
          </p>
          <p className="pt-1.5 text-white/40">$ approve edit? (y/n)</p>
        </div>
      </div>
    </div>
  );
}

function OrbitalMock() {
  // four models orbiting an "auto" core; positions are fixed, the ring is drawn
  const nodes = [
    { label: "OSS", x: "50%", y: "8%" },
    { label: "OCR", x: "88%", y: "50%" },
    { label: "QW", x: "50%", y: "92%" },
    { label: "GLM", x: "12%", y: "50%" },
  ];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[220px]">
      <div className="absolute inset-[12%] rounded-full ring-1 ring-line" />
      <div className="absolute inset-[30%] rounded-full ring-1 ring-line/60" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[9px] bg-accent-tint px-3 py-1.5 font-mono text-[11px] text-accent ring-1 ring-accent/15">
        auto
      </span>
      {nodes.map((n) => (
        <span
          key={n.label}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-surface px-2.5 py-1 font-mono text-[10.5px] text-body shadow-e1 ring-1 ring-line"
          style={{ left: n.x, top: n.y }}
        >
          {n.label}
        </span>
      ))}
      <span className="dot-live absolute left-[50%] top-[8%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-signal" />
    </div>
  );
}

function AuthMock() {
  return (
    <div className="rounded-[12px] bg-veil/70 p-4 ring-1 ring-line/60">
      <p className="font-mono text-[11px] text-muted">Authorize the CLI</p>
      <div className="mt-3 flex items-center gap-1.5">
        {["W", "Q", "X", "R", "-", "7", "K", "D", "M"].map((c, i) => (
          <span
            key={i}
            className={cn(
              "font-mono text-[13px]",
              c === "-"
                ? "px-0.5 text-muted"
                : "flex h-8 w-6 items-center justify-center rounded-[6px] bg-surface text-ink shadow-e1 ring-1 ring-line",
            )}
          >
            {c}
          </span>
        ))}
      </div>
      <div className="mt-3.5 flex h-9 items-center justify-center rounded-[9px] bg-gradient-to-b from-accent to-[#1b2ea8] text-[12.5px] font-medium text-paper shadow-[0_2px_8px_-2px_rgba(35,56,204,0.5)]">
        Approve
      </div>
      <p className="mt-3 font-mono text-[10.5px] text-muted">signed in with your company account</p>
    </div>
  );
}

function NetworkMock() {
  return (
    <div className="flex h-full flex-col justify-center">
      <div className="flex items-center gap-3">
        <div className="flex-1 rounded-[11px] bg-veil/70 p-3.5 font-mono text-[11px] ring-1 ring-line/60">
          <p className="text-muted">EMPLOYEE UPLOAD</p>
          <p className="mt-1 text-ink">inspection_17.pdf</p>
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-accent to-[#1b2ea8] text-[13px] font-semibold text-paper shadow-[0_2px_8px_-2px_rgba(35,56,204,0.5)]">
          P
        </span>
        <div className="flex-1 rounded-[11px] bg-veil/70 p-3.5 font-mono text-[11px] ring-1 ring-line/60">
          <p className="text-muted">ON-PREM GPU</p>
          <p className="mt-1 text-ink">paddleocr-vl → qwen3.6</p>
        </div>
      </div>
      <p className="mt-4 text-center font-mono text-[10.5px] tracking-[0.04em] text-muted">
        stays on your network · no calls to cloud AI providers
      </p>
    </div>
  );
}

function EffortMock() {
  const levels = ["low", "medium", "high", "xhigh", "max"];
  return (
    <div>
      <div className="flex rounded-full bg-veil/70 p-1 ring-1 ring-line/60">
        {levels.map((l) => (
          <span
            key={l}
            className={cn(
              "flex-1 rounded-full py-1.5 text-center font-mono text-[10.5px]",
              l === "high" ? "bg-accent text-paper shadow-e1" : "text-muted",
            )}
          >
            {l}
          </span>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-[11px] bg-veil/70 p-3.5 ring-1 ring-line/60">
          <p className="text-[26px] font-medium leading-none tracking-tight text-ink">50</p>
          <p className="mt-1.5 font-mono text-[10px] text-muted">step budget</p>
        </div>
        <div className="rounded-[11px] bg-veil/70 p-3.5 ring-1 ring-line/60">
          <p className="text-[26px] font-medium leading-none tracking-tight text-signal">on</p>
          <p className="mt-1.5 font-mono text-[10px] text-muted">answer verifier</p>
        </div>
      </div>
    </div>
  );
}

function ChipsMock({
  items,
  tone,
  active,
}: {
  items: string[];
  tone: Tone;
  active?: string;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((c) => (
        <span
          key={c}
          className={cn(
            "rounded-full px-2.5 py-1 font-mono text-[10.5px]",
            c === active
              ? TONES[tone]
              : "bg-surface text-body shadow-e1 ring-1 ring-line",
          )}
        >
          {c}
        </span>
      ))}
    </div>
  );
}
