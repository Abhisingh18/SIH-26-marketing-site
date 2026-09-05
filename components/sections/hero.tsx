import type { ReactNode } from "react";
import Image from "next/image";
import {
  BadgeCheck,
  Box,
  Camera,
  ClipboardList,
  FileSearch,
  FileSpreadsheet,
  Gauge,
  IndianRupee,
  PenLine,
  Receipt,
  ScrollText,
  ShieldCheck,
  Table2,
  Workflow,
  Wrench,
} from "lucide-react";
import flourish from "@/components/photos/flourish-alpha.png";
import { Workbench } from "@/components/mock/workbench";
import { PlatformTitle } from "@/components/sections/platform-title";
import { Button } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Colour carries the category, not decoration: engineering, procedure, field
 * and commercial. It sits in a small tinted well behind each icon rather than
 * on the chip itself — tinting whole chips turns a fifteen-item strip into
 * confetti, while a coloured icon in a neutral chip still scans as one system.
 */
const TONES = {
  eng: "bg-[#fdf3e6] text-[#b0670f]",
  doc: "bg-accent-tint text-accent",
  field: "bg-[#efeffb] text-[#5551c4]",
  fin: "bg-[#e9f6ef] text-[#0f8b55]",
} as const;

const DOCS = [
  { label: "P&IDs", icon: Workflow, tone: "eng" },
  { label: "SOPs", icon: ClipboardList, tone: "doc" },
  { label: "Inspection reports", icon: FileSearch, tone: "field" },
  { label: "Isometric drawings", icon: Box, tone: "eng" },
  { label: "Compliance standards", icon: ScrollText, tone: "doc" },
  { label: "Handwritten field notes", icon: PenLine, tone: "field" },
  { label: "Thickness logs", icon: Table2, tone: "eng" },
  { label: "Permit-to-work", icon: ShieldCheck, tone: "doc" },
  { label: "Equipment photographs", icon: Camera, tone: "field" },
  { label: "Equipment datasheets", icon: Gauge, tone: "eng" },
  { label: "Calibration certificates", icon: BadgeCheck, tone: "doc" },
  { label: "Maintenance logs", icon: Wrench, tone: "field" },
  { label: "Financial statements", icon: FileSpreadsheet, tone: "fin" },
  { label: "Purchase orders", icon: Receipt, tone: "fin" },
  { label: "Vendor invoices", icon: IndianRupee, tone: "fin" },
] satisfies { label: string; icon: typeof Workflow; tone: keyof typeof TONES }[];

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-[76px] sm:px-8 sm:pt-[88px] md:pb-24">
      <Bloom />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Flourish />
          </Reveal>

          <Reveal delay={0.05}>
            <div className="-mt-2 flex flex-col items-center">
              <span className="rule-sweep h-px w-[88px]" />
              <p className="px-6 py-1.5 text-[14.5px] leading-none tracking-[-0.005em] text-accent">
                Sovereign AI infrastructure
              </p>
              <span className="rule-sweep h-px w-[176px] [&::after]:[animation-delay:2.6s]" />
            </div>
          </Reveal>

          <h1 className="display rise mt-9 text-[clamp(2.6rem,5.8vw,4.5rem)] leading-[0.96] tracking-[-0.02em]">
            <span className="block">Your AI.</span>
            <span className="block">Your infrastructure.</span>
            <span className="block">Your data.</span>
          </h1>

          <Reveal delay={0.34}>
            <p className="mt-7 max-w-[56ch] text-balance text-[17px] leading-[1.6] text-body sm:text-[18.5px]">
              An on-premise agentic AI workbench for confidential industrial work.{" "}
              <span className="text-ink">Nothing leaves your infrastructure.</span>
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Button href="/demo" size="lg">
                Request demo
              </Button>
              <Button href="/platform" variant="secondary" size="lg">
                Explore platform
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="w-full">
            <p className="label mt-16">Built for confidential industrial work</p>
            <DocMarquee />
          </Reveal>
        </div>

        <PlatformTitle />

        <Reveal delay={0.2} y={30} className="mt-12 md:mt-14">
          <WorkbenchStage>
            <Workbench />
          </WorkbenchStage>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Workbench stage                                                     */
/* ------------------------------------------------------------------ */

/**
 * The wash the product panel floats on.
 *
 * Two periwinkle fields sit off the left and right shoulders of the card and
 * nothing sits behind its middle — a single field centred under the panel would
 * be hidden by the panel itself, so all the colour you would see is at the
 * edges anyway. Putting it there directly keeps the centre clean and lets the
 * card read as white rather than tinted.
 *
 * Full-bleed, because a wash that stops at the container edge draws a second
 * rectangle around the first one. Masked top and bottom so it resolves into
 * paper instead of ending on a line. No z-index: the backdrop is simply painted
 * first and the card, later in the DOM, sits on top of it.
 */
function WorkbenchStage({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[150%] w-screen max-w-[100vw] -translate-x-1/2 -translate-y-1/2 [mask-image:linear-gradient(to_bottom,transparent,#000_13%,#000_87%,transparent)]"
      >
        {/* Left cluster: a deep indigo core opening out through periwinkle.
            Multi-stop rather than one flat tint — a single colour fading to
            transparent reads as a smudge, while a core that lightens as it
            spreads reads as light. */}
        <div className="absolute left-[-15%] top-[44%] h-[88%] w-[48%] -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(70,90,226,0.5),rgba(126,150,246,0.34)_42%,rgba(158,176,250,0.12)_72%,transparent_100%)] blur-[70px]" />
        <div className="absolute left-[1%] top-[64%] h-[60%] w-[32%] -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(138,108,226,0.32),transparent_100%)] blur-[85px]" />

        {/* Right cluster: offset, not mirrored. Perfect symmetry reads as a
            shape; an offset pair reads as light falling on something. */}
        <div className="absolute right-[-15%] top-[53%] h-[90%] w-[48%] -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(70,90,226,0.47),rgba(126,150,246,0.32)_42%,rgba(158,176,250,0.12)_72%,transparent_100%)] blur-[70px]" />
        <div className="absolute right-[0%] top-[33%] h-[56%] w-[30%] -translate-y-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(96,140,246,0.32),transparent_100%)] blur-[85px]" />

        {/* a warm trace along the top, carrying the saffron down from the fold */}
        <div className="absolute inset-x-0 top-0 h-[42%] bg-[radial-gradient(120%_100%_at_50%_0%,rgba(240,158,88,0.19),transparent_60%)]" />
      </div>

      {/* Grounding shadow, tinted indigo rather than neutral black — a grey
          shadow over a blue wash desaturates it and the card looks stuck on. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[7%] bottom-[-4%] h-[16%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(34,42,112,0.24),transparent_100%)] blur-[44px]"
      />

      <div className="relative mx-auto max-w-[1080px]">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Backdrop                                                            */
/* ------------------------------------------------------------------ */

/**
 * Three colours meeting: saffron above, periwinkle through the middle, paper
 * below. Sangam is a confluence, and at a real one the rivers stay visibly
 * different colours where they meet.
 *
 * Built the way the reference is: a saturated dome with a heavily blurred edge,
 * not a soft radial haze. The periwinkle field sits *under* the saffron and is
 * wider than it, so it reads at the shoulders while the centre stays clear for
 * type — which is also what stops the two hues blending head on and going
 * grey-brown through the middle of the fold.
 */
function Bloom() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-[940px] overflow-hidden"
      aria-hidden
    >
      {/* periwinkle — wide, low, underneath */}
      <div className="absolute left-1/2 top-[-14px] h-[660px] w-[min(1900px,170vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,#b3c0f2_0%,#b3c0f2_34%,rgba(179,192,242,0)_100%)] blur-[85px]" />

      {/* saffron — solid core, soft edge, sitting on top */}
      <div className="absolute left-1/2 top-[-68px] h-[352px] w-[min(1480px,126vw)] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,#f47c14_0%,#f47c14_46%,rgba(244,124,20,0)_100%)] blur-[62px]" />

      {/* paper opens up the centre under the headline, then settles the page */}
      <div className="absolute inset-x-0 top-[244px] h-[560px] bg-[radial-gradient(58%_62%_at_50%_58%,rgba(252,251,249,0.92),rgba(252,251,249,0)_72%)]" />
      <div className="absolute inset-x-0 bottom-0 h-[300px] bg-gradient-to-b from-transparent to-paper" />
    </div>
  );
}

/**
 * Hero flourish.
 *
 * The supplied artwork had its checkerboard painted into the pixels — no alpha
 * channel at all — so inverting it in CSS turned the whole square white. The
 * file is pre-processed instead (see the note in the README): alpha derived
 * from luminance, then cropped to the artwork's bounding box. It stays dark on
 * transparent here and is inverted to white in CSS, so the same asset still
 * works on a light background if it is ever needed there.
 */
function Flourish() {
  return (
    <Image
      src={flourish}
      alt=""
      priority
      aria-hidden
      className="w-[140px] opacity-85 [filter:brightness(0)_invert(1)] sm:w-[154px]"
    />
  );
}

/**
 * The document types the workbench is pointed at, as two counter-running rows.
 *
 * Two rows rather than one: fifteen chips in a single line either scrolls too
 * fast to read or takes two minutes to cycle. Split and counter-running, the
 * strip stays calm at 72s while showing twice as much, and the opposing motion
 * reads as deliberate where a single sliding row reads as a ticker.
 *
 * Full-bleed on purpose — a strip that stops at the container edge looks like a
 * list that ran out, whereas one running off both sides reads as a longer set
 * than the screen can hold, which is the point. The section already clips
 * overflow, so breaking out is safe.
 */
function DocMarquee() {
  const rows = [DOCS.slice(0, 8), DOCS.slice(8)];

  return (
    <div className="marquee relative left-1/2 mt-7 w-screen max-w-[100vw] -translate-x-1/2 space-y-2.5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_9%,#000_91%,transparent)]">
      {rows.map((row, r) => (
        <ul
          key={r}
          className={cn("marquee-track gap-2.5 py-1", r === 1 && "marquee-track--reverse")}
        >
          {[...row, ...row].map((d, i) => (
            <li
              key={`${d.label}-${i}`}
              aria-hidden={i >= row.length}
              className="group flex shrink-0 items-center gap-2.5 rounded-full bg-surface/75 py-2 pl-2 pr-5 shadow-e1 ring-1 ring-line/80 backdrop-blur-sm transition-shadow duration-300 hover:shadow-e2"
            >
              <span
                className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-105",
                  TONES[d.tone],
                )}
              >
                <d.icon className="h-3.5 w-3.5" strokeWidth={1.8} />
              </span>
              <span className="whitespace-nowrap text-[14px] text-body">{d.label}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
