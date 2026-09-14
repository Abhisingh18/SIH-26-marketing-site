import { ArrowUpRight, Copy, Download as DownloadIcon } from "lucide-react";
import { PixelRover } from "@/components/ui/pixel-rover";
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
                <span className="caret ml-0.5 inline-block h-3 w-[6px] translate-y-[2px] bg-[#7fe0ab]" />
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
    ["Dinner Decision Flowchart", "Apr 12"],
    ["Drive Car to Car Wash", "Apr 11"],
  ];
  return (
    <div className="mt-7 flex flex-1 justify-center">
      {/* a real phone frame that fills the tall card — it stretches to the
          available height and bleeds off the bottom edge, so the card reads as a
          device rather than a card with a thumbnail parked in it */}
      <div className="flex w-full max-w-[272px] flex-col self-stretch rounded-t-[32px] bg-obsidian p-2.5 pb-0 shadow-e3 ring-1 ring-white/[0.08]">
        <div className="flex min-h-[280px] flex-1 flex-col overflow-hidden rounded-t-[24px] bg-[#0c1024]">
          {/* status bar with a notch */}
          <div className="relative flex items-center justify-between px-4 py-2.5 font-mono text-[9.5px] text-white/55">
            <span>7:29</span>
            <span className="absolute left-1/2 top-2 h-4 w-16 -translate-x-1/2 rounded-full bg-black/60" />
            <span className="flex items-center gap-1">
              <span className="dot-live h-1 w-1 rounded-full bg-signal" />
              on-prem
            </span>
          </div>

          {/* the scrolling history — grows to fill the phone */}
          <div className="flex-1 overflow-hidden px-2">
            <ul className="phone-scroll space-y-0.5">
              {rows.map(([t, d], i) => (
                <li
                  key={t}
                  className={cn(
                    "flex items-center justify-between rounded-[8px] px-2.5 py-2.5 text-[11.5px]",
                    i === 0 ? "bg-white/[0.06] text-white" : "text-white/75",
                  )}
                >
                  <span className="truncate">{t}</span>
                  <span className="ml-2 shrink-0 font-mono text-[9px] text-white/35">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* a reply being written */}
          <div className="border-t border-white/[0.06] px-3 py-3">
            <div className="flex items-center gap-1.5">
              <span className="dot-live h-1.5 w-1.5 rounded-full bg-[#9db4ff]" />
              <span className="font-mono text-[9.5px] text-white/45">Pragyan is writing</span>
            </div>
            <div className="mt-2.5 space-y-1.5">
              <span className="shimmer-bar block h-2 w-[88%] rounded-full" />
              <span className="shimmer-bar block h-2 w-[64%] rounded-full [animation-delay:0.3s]" />
            </div>
          </div>

          {/* input dock */}
          <div className="flex items-center gap-2 px-3 pb-4 pt-1">
            <span className="h-8 flex-1 rounded-full bg-white/[0.06]" />
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent">
              <svg width="13" height="13" viewBox="0 0 12 12" className="fill-none stroke-paper" strokeWidth="1.6">
                <path d="M6 9.5V2.5M3 5.5 6 2.5l3 3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>
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
          <p className="mt-4 text-[15px] tracking-[-0.01em] text-ink">Good evening. What are we working on?<span className="caret ml-0.5 inline-block h-4 w-[2px] translate-y-[3px] bg-accent" /></p>
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
      {/* the rover, tucked in the corner */}
      <PixelRover unit={4} className="absolute bottom-3 right-3" />
    </div>
  );
}
