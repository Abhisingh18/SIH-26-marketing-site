"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  Bot,
  Boxes,
  Cpu,
  Eye,
  FileSearch,
  KeyRound,
  Landmark,
  Layers,
  Library,
  Radar,
  ScrollText,
  Server,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Colour follows the site's four categories rather than the four menus, so an
 * icon means the same thing here as it does on the page it links to.
 */
const TONE = {
  doc: "bg-accent-tint text-accent",
  eng: "bg-[#fdf3e6] text-[#b0670f]",
  field: "bg-[#efeffb] text-[#5551c4]",
  fin: "bg-[#e9f6ef] text-[#0f8b55]",
} as const;

type Item = {
  label: string;
  desc: string;
  href: string;
  icon: LucideIcon;
  tone: keyof typeof TONE;
};

export type MenuKey = "/platform" | "/solutions" | "/security" | "/architecture";

export const MENUS: Record<
  MenuKey,
  { blurb: string; cta: string; items: Item[] }
> = {
  "/platform": {
    blurb: "One workbench: it plans the task, reads the documents, picks the model and hands back a file.",
    cta: "Explore the platform",
    items: [
      { label: "Agentic execution", desc: "Plans, retrieves, runs tools, checks its own output", href: "/platform#agentic", icon: Bot, tone: "doc" },
      { label: "Model routing", desc: "Each step goes to the local model that fits it", href: "/platform#models", icon: Workflow, tone: "eng" },
      { label: "Multimodal", desc: "Scans, drawings, handwriting and photographs", href: "/platform#multimodal", icon: Eye, tone: "field" },
      { label: "Private knowledge", desc: "Local RAG over your own SOPs and standards", href: "/platform#knowledge", icon: Library, tone: "fin" },
      { label: "Deliverables", desc: "Word, Excel, decks, code — files, not transcripts", href: "/platform#deliverables", icon: Blocks, tone: "doc" },
    ],
  },
  "/solutions": {
    blurb: "Six industrial workflows where the bottleneck is access, not intelligence.",
    cta: "See all use cases",
    items: [
      { label: "The problem", desc: "Why public AI is closed to this work", href: "/solutions#problem", icon: FileSearch, tone: "field" },
      { label: "Use cases", desc: "Operations, engineering, maintenance, compliance", href: "/solutions#use-cases", icon: Boxes, tone: "doc" },
      { label: "Who it is for", desc: "Refineries, power, defence, PSUs, pharma", href: "/solutions#sectors", icon: Landmark, tone: "fin" },
    ],
  },
  "/security": {
    blurb: "Sovereignty as an observable property, not a promise on a slide.",
    cta: "See the security model",
    items: [
      { label: "The boundary", desc: "Private by architecture, not by policy", href: "/security#boundary", icon: KeyRound, tone: "doc" },
      { label: "Sovereignty monitor", desc: "Every outbound attempt, counted and held at zero", href: "/security#monitor", icon: Radar, tone: "fin" },
      { label: "Controls", desc: "Air-gap, RBAC, audit trail, sandbox, encryption", href: "/security#controls", icon: BadgeCheck, tone: "field" },
    ],
  },
  "/architecture": {
    blurb: "A layered stack you can audit and replace a piece at a time.",
    cta: "See the architecture",
    items: [
      { label: "System design", desc: "Client, harness, orchestrator, models, storage", href: "/architecture#layers", icon: Layers, tone: "doc" },
      { label: "Principles", desc: "Model agnostic, isolated, verifiable, offline first", href: "/architecture#principles", icon: ScrollText, tone: "eng" },
      { label: "Technology", desc: "The open-source components it is built on", href: "/architecture#stack", icon: Server, tone: "field" },
      { label: "Deployment", desc: "Workstation, on-premise server, air-gapped", href: "/architecture#deployment", icon: Cpu, tone: "fin" },
    ],
  },
};

export function NavMenu({
  menuKey,
  onNavigate,
}: {
  menuKey: MenuKey;
  onNavigate: () => void;
}) {
  const menu = MENUS[menuKey];

  return (
    <div className="grid gap-5 p-4 sm:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)] sm:p-5">
      {/* the left column repeats the page's own claim, so the menu says what
          the destination is for and not only what is on it */}
      <div className="flex flex-col justify-between rounded-[14px] bg-veil/70 p-5">
        <p className="text-[14.5px] leading-[1.55] text-body">{menu.blurb}</p>
        <Link
          href={menuKey}
          onClick={onNavigate}
          className="group/cta mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-medium text-ink transition-colors hover:text-accent"
        >
          {menu.cta}
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
      </div>

      <ul className="grid gap-1">
        {menu.items.map((item, i) => (
          <motion.li
            key={item.href}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.03 + i * 0.035, duration: 0.3 }}
          >
            <Link
              href={item.href}
              onClick={onNavigate}
              className="group/item flex items-start gap-3 rounded-[11px] p-2.5 transition-colors duration-200 hover:bg-veil/70"
            >
              <span
                className={cn(
                  "mt-px flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] transition-transform duration-300 group-hover/item:scale-105",
                  TONE[item.tone],
                )}
              >
                <item.icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0">
                <span className="block text-[13.5px] font-medium text-ink">{item.label}</span>
                <span className="block text-[12.5px] leading-snug text-muted">{item.desc}</span>
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
