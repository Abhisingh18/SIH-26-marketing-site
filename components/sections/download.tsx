import { ArrowUpRight, Copy, Download as DownloadIcon } from "lucide-react";
import { Panel } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { WordRise } from "@/components/ui/word-rise";
import { cn } from "@/lib/utils";

const REPO = "https://github.com/vermarjun/sih26";

export function Download() {
  return (
    <Section id="download" tone="veil">
      <Reveal>
        <p className="label">
          <span className="text-accent">[03]</span> Download
        </p>
      </Reveal>
      <h2 className="display-sm mt-5 text-[clamp(1.9rem,4.2vw,3rem)]">
        <WordRise segments={[{ text: "Use Pragyan anywhere" }]} />
      </h2>
      <Reveal delay={0.1}>
        <p className="measure mt-5 text-[16px] leading-[1.6] text-body">
          One account for the terminal, browser and phone.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {/* terminal — wide */}
        <Reveal className="lg:col-span-2">
          <Panel className="h-full p-6 sm:p-7">
            <p className="label text-accent">Terminal</p>
            <h3 className="mt-3 text-[19px] font-medium tracking-[-0.015em] text-ink">
              Pragyan CLI
            </h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-body">
              Install the local coding agent and sign in.
            </p>

            <span className="mt-4 inline-block rounded-full bg-signal/12 px-2.5 py-1 font-mono text-[10.5px] text-signal">
              detected: Windows
            </span>

            <div className="mt-4 flex flex-wrap gap-2">
              <Segmented options={["macOS", "Linux", "Windows"]} active="Windows" />
              <Segmented options={["x64", "arm64"]} active="x64" />
            </div>

            <div className="mt-4 rounded-[12px] bg-obsidian p-4 font-mono text-[11.5px] shadow-e1">
              <div className="mb-2.5 flex items-center justify-between">
                <span className="text-white/45">PowerShell</span>
                <span className="flex items-center gap-1.5 rounded-[6px] bg-white/[0.06] px-2 py-1 text-white/70">
                  <Copy className="h-3 w-3" strokeWidth={1.75} />
                  Copy
                </span>
              </div>
              <p className="text-white/80">
                <span className="mr-3 text-white/25">1</span>Invoke-WebRequest -Uri {REPO}
              </p>
              <p className="text-white/80">
                <span className="mr-3 text-white/25">2</span>.\pragyan.exe auth login
              </p>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-4">
              <a
                href="/demo"
                className="inline-flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[14px] font-medium text-paper shadow-e1 transition-colors hover:bg-[#1b2ea8]"
              >
                <DownloadIcon className="h-4 w-4" strokeWidth={2} />
                Download pragyan-windows-x64.exe
              </a>
              <a href={REPO} className="inline-flex items-center gap-1.5 text-[13px] font-medium text-body hover:text-ink">
                All builds
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </div>
          </Panel>
        </Reveal>

        {/* phone — tall, spans two rows on desktop */}
        <Reveal className="lg:row-span-2">
          <Panel className="flex h-full flex-col p-6 sm:p-7">
            <p className="label text-accent">Phone</p>
            <h3 className="mt-3 text-[19px] font-medium tracking-[-0.015em] text-ink">
              Android &amp; iOS
            </h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-body">
              Chat, speak and review generated files on mobile.
            </p>
            <a
              href="/demo"
              className="mt-4 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-accent px-5 text-[14px] font-medium text-paper shadow-e1 transition-colors hover:bg-[#1b2ea8]"
            >
              <DownloadIcon className="h-4 w-4" strokeWidth={2} />
              Download APK
            </a>
            <p className="mt-2 font-mono text-[10.5px] text-muted">Android 8.0 or newer</p>
            <PhoneMock />
          </Panel>
        </Reveal>

        {/* browser — wide */}
        <Reveal className="lg:col-span-2">
          <Panel className="h-full p-6 sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="label text-accent">Browser</p>
                <h3 className="mt-3 text-[19px] font-medium tracking-[-0.015em] text-ink">
                  Pragyan Web
                </h3>
                <p className="mt-2 text-[14px] leading-[1.6] text-body">
                  Open chats, projects and documents in any browser.
                </p>
              </div>
              <a href="/platform" className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full bg-surface px-3.5 py-2 text-[13px] font-medium text-ink shadow-e1 ring-1 ring-line">
                Open the web app
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </a>
            </div>
            <BrowserMock />
          </Panel>
        </Reveal>

        {/* source */}
        <Reveal className="lg:col-span-2">
          <Panel className="h-full p-6 sm:p-7">
            <p className="label text-accent">Source</p>
            <h3 className="mt-3 text-[19px] font-medium tracking-[-0.015em] text-ink">
              Build from source
            </h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-body">
              Requires Bun 1.4.2. Builds for your current platform.
            </p>
            <div className="mt-4 rounded-[12px] bg-obsidian p-4 font-mono text-[11.5px] shadow-e1">
              <p className="text-white/80">git clone {REPO.replace("https://", "https://").replace("sih26", "SIH26")}</p>
              <p className="mt-1 text-white/80">cd SIH26/cli &amp;&amp; ./install</p>
            </div>
          </Panel>
        </Reveal>

        {/* desktop — soon */}
        <Reveal>
          <Panel className="h-full overflow-hidden p-6 sm:p-7">
            <p className="label text-accent">Soon</p>
            <h3 className="mt-3 text-[19px] font-medium tracking-[-0.015em] text-ink">Desktop</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-body">
              The full workspace in a native desktop app. Coming soon.
            </p>
            <DesktopMock />
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */

function Segmented({ options, active }: { options: string[]; active: string }) {
  return (
    <div className="flex rounded-[9px] bg-veil/80 p-1 ring-1 ring-line/60">
      {options.map((o) => (
        <span
          key={o}
          className={cn(
            "rounded-[6px] px-3 py-1 font-mono text-[10.5px]",
            o === active ? "bg-ink text-paper shadow-e1" : "text-muted",
          )}
        >
          {o}
        </span>
      ))}
    </div>
  );
}

function PhoneMock() {
  const rows = [
    ["Basic Math Question", "Jun 4"],
    ["User Login Flow Chart", "May 13"],
    ["Mayor Marmalade of Periwinkle", "Apr 14"],
    ["Word Repetition Test", "Apr 13"],
    ["Compound Interest", "Apr 12"],
  ];
  return (
    <div className="mt-auto pt-6">
      <div className="mx-auto max-w-[240px] overflow-hidden rounded-t-[22px] bg-obsidian p-3 shadow-e2 ring-1 ring-white/[0.06]">
        <div className="mb-2 flex items-center justify-between px-1 font-mono text-[9px] text-white/50">
          <span>7:29</span>
          <span>on-prem</span>
        </div>
        <ul className="space-y-1">
          {rows.map(([t, d]) => (
            <li key={t} className="flex items-center justify-between rounded-[8px] px-2 py-1.5 text-[11px] text-white/80">
              <span className="truncate">{t}</span>
              <span className="ml-2 shrink-0 font-mono text-[9px] text-white/35">{d}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function BrowserMock() {
  return (
    <div className="mt-5 overflow-hidden rounded-[12px] bg-surface shadow-e1 ring-1 ring-line">
      <div className="flex items-center gap-1.5 border-b border-line bg-veil/60 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-line-2" />
        <span className="h-2 w-2 rounded-full bg-line-2" />
        <span className="h-2 w-2 rounded-full bg-line-2" />
        <span className="ml-2 rounded-[6px] bg-surface px-2 py-0.5 font-mono text-[9.5px] text-muted ring-1 ring-line">
          pragyan.local
        </span>
      </div>
      <div className="flex">
        <div className="hidden w-[120px] shrink-0 border-r border-line p-3 sm:block">
          <p className="font-mono text-[9.5px] text-muted">Projects</p>
          <div className="mt-2 space-y-1.5">
            {[70, 55, 62].map((w, i) => (
              <div key={i} className="h-2 rounded-full bg-veil" style={{ width: `${w}%` }} />
            ))}
          </div>
          <p className="mt-3 font-mono text-[9.5px] text-muted">Chats</p>
          <div className="mt-2 space-y-1.5">
            {[80, 48].map((w, i) => (
              <div key={i} className="h-2 rounded-full bg-veil" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <div className="min-w-0 flex-1 p-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-veil px-2.5 py-1 font-mono text-[10px] text-body ring-1 ring-line">
            reasoning · 30B
          </span>
          <p className="mt-4 text-[15px] tracking-[-0.01em] text-ink">Good evening. What are we working on?</p>
          <div className="mt-4 h-9 rounded-[10px] bg-veil/70 ring-1 ring-line" />
        </div>
      </div>
    </div>
  );
}

function DesktopMock() {
  return (
    <div className="relative mt-5 overflow-hidden rounded-[12px] bg-surface p-3 shadow-e1 ring-1 ring-line">
      <div className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-[#e0563f]" />
        <span className="h-2 w-2 rounded-full bg-[#e2a83c]" />
        <span className="h-2 w-2 rounded-full bg-signal" />
      </div>
      <div className="mt-3 space-y-2">
        {[86, 64, 74, 44].map((w, i) => (
          <div key={i} className="h-2.5 rounded-full bg-veil" style={{ width: `${w}%` }} />
        ))}
      </div>
      {/* the pixel mascot, tucked in the corner */}
      <svg width="54" height="30" viewBox="0 0 90 50" className="absolute bottom-3 right-3" shapeRendering="crispEdges" aria-hidden>
        {([
          [10, 0, 40, 10, "#e2a83c"],
          [60, 0, 10, 20, "#8a8a92"],
          [10, 20, 70, 20, "#3f49d8"],
          [0, 25, 10, 10, "#3f49d8"],
          [80, 25, 10, 10, "#3f49d8"],
          [20, 25, 10, 10, "#ffffff"],
          [55, 25, 10, 10, "#ffffff"],
          [20, 40, 10, 10, "#8a8a92"],
          [40, 40, 10, 10, "#8a8a92"],
          [60, 40, 10, 10, "#8a8a92"],
        ] as const).map(([x, y, w, h, f], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill={f} />
        ))}
      </svg>
    </div>
  );
}
