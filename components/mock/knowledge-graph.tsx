"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const VB = { w: 600, h: 340 };

const TONE = {
  hub: { dot: "#111113", soft: "#eeebe5", label: "Equipment" },
  eng: { dot: "#b0670f", soft: "#fdf3e6", label: "Engineering" },
  doc: { dot: "#2338cc", soft: "#eef1fe", label: "Procedure" },
  field: { dot: "#5551c4", soft: "#efeffb", label: "Field record" },
  fin: { dot: "#0f8b55", soft: "#e9f6ef", label: "Commercial" },
} as const;

type ToneKey = keyof typeof TONE;

type GraphNode = {
  id: string;
  label: string;
  tone: ToneKey;
  x: number;
  y: number;
  r: number;
  kind: string;
  stats: [string, string][];
  note: string;
};

const NODES: GraphNode[] = [
  {
    id: "tk402",
    label: "TK-402",
    tone: "hub",
    x: 300,
    y: 168,
    r: 27,
    kind: "Crude storage tank",
    stats: [
      ["Linked documents", "7"],
      ["Last inspection", "Mar 2026"],
      ["Shell course", "8 rings"],
    ],
    note: "Everything the workbench knows about this asset, indexed from documents already on your network.",
  },
  {
    id: "pid",
    label: "P&ID TK-402",
    tone: "eng",
    x: 300,
    y: 48,
    r: 17,
    kind: "Engineering drawing",
    stats: [
      ["Revision", "Rev-C"],
      ["Regions parsed", "34"],
      ["Tags extracted", "112"],
    ],
    note: "Read by the vision model — line numbers and instrument tags are searchable, not just the image.",
  },
  {
    id: "insp",
    label: "inspection_report.pdf",
    tone: "field",
    x: 128,
    y: 92,
    r: 19,
    kind: "Inspection report",
    stats: [
      ["Pages", "24"],
      ["Chunks indexed", "312"],
      ["Figures analysed", "7"],
    ],
    note: "A scan, not a text PDF. OCR and layout parsing ran locally before any of it was indexed.",
  },
  {
    id: "photos",
    label: "Field photographs",
    tone: "field",
    x: 88,
    y: 224,
    r: 16,
    kind: "Image set",
    stats: [
      ["Images", "18"],
      ["Captioned", "18"],
      ["Corrosion flags", "3"],
    ],
    note: "Shot on the floor, described by the vision model, then linked back to the shell course they show.",
  },
  {
    id: "thick",
    label: "thickness_log.xlsx",
    tone: "eng",
    x: 200,
    y: 300,
    r: 16,
    kind: "Measurement log",
    stats: [
      ["Readings", "1,240"],
      ["Below limit", "2"],
      ["Sheet", "TML grid"],
    ],
    note: "Numbers the reasoning model checks against the standard, rather than summarising in prose.",
  },
  {
    id: "api570",
    label: "API 570",
    tone: "doc",
    x: 372,
    y: 296,
    r: 17,
    kind: "Standard",
    stats: [
      ["Clauses indexed", "486"],
      ["Cited this run", "4"],
      ["Edition", "2016"],
    ],
    note: "The retrieval layer cites the clause it used, so a reviewer can check the reasoning against the source.",
  },
  {
    id: "sop114",
    label: "SOP-114",
    tone: "doc",
    x: 486,
    y: 232,
    r: 17,
    kind: "Procedure",
    stats: [
      ["Sections", "22"],
      ["Cited this run", "3"],
      ["Owner", "Inspection"],
    ],
    note: "Retrieved because the findings matched its trigger conditions, not because anyone tagged it.",
  },
  {
    id: "sop232",
    label: "SOP-232",
    tone: "doc",
    x: 500,
    y: 100,
    r: 16,
    kind: "Procedure",
    stats: [
      ["Sections", "16"],
      ["Cited this run", "1"],
      ["Owner", "Maintenance"],
    ],
    note: "Approval routing for shell repairs — the note drafted at the end follows this sign-off chain.",
  },
  {
    id: "po",
    label: "PO-2291",
    tone: "fin",
    x: 448,
    y: 40,
    r: 14,
    kind: "Purchase order",
    stats: [
      ["Vendor", "Redacted"],
      ["Scope", "Shell plate"],
      ["Status", "Open"],
    ],
    note: "Commercial records sit in the same index, so cost context is one hop from the technical findings.",
  },
];

const EDGES: [string, string][] = [
  ["tk402", "pid"],
  ["tk402", "insp"],
  ["tk402", "photos"],
  ["tk402", "thick"],
  ["tk402", "api570"],
  ["tk402", "sop114"],
  ["tk402", "sop232"],
  ["insp", "photos"],
  ["insp", "thick"],
  ["sop114", "api570"],
  ["sop232", "sop114"],
  ["sop232", "po"],
];

const byId = new Map(NODES.map((n) => [n.id, n]));

function neighbours(id: string) {
  const set = new Set<string>([id]);
  for (const [a, b] of EDGES) {
    if (a === id) set.add(b);
    if (b === id) set.add(a);
  }
  return set;
}

/** deterministic float, so nodes drift without ever syncing up */
function noise(seed: number) {
  const v = Math.sin(seed * 12.9898) * 43758.5453;
  return v - Math.floor(v);
}

/**
 * The indexed knowledge behind one asset, as a graph you can interrogate.
 *
 * Selection drives everything: picking a node lifts it and its neighbours and
 * drops everything else to a quarter opacity, so a click answers "what is this
 * connected to" before you have read a word of the panel. Edges are drawn from
 * the same selection state, so a highlighted path is never out of step with the
 * dimming.
 */
export function KnowledgeGraph() {
  const [selected, setSelected] = useState("tk402");
  const reduce = useReducedMotion();

  const active = byId.get(selected)!;
  const near = neighbours(selected);

  return (
    <div className="space-y-3">
      <div className="relative overflow-hidden rounded-[13px] bg-veil/70">
        <div className="grid-paper absolute inset-0 opacity-50" />

        <svg
          viewBox={`0 0 ${VB.w} ${VB.h}`}
          className="relative block w-full"
          role="group"
          aria-label="Knowledge graph for TK-402"
        >
          <g>
            {EDGES.map(([a, b], i) => {
              const from = byId.get(a)!;
              const to = byId.get(b)!;
              const lit = near.has(a) && near.has(b);
              return (
                <motion.line
                  key={`${a}-${b}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={lit ? TONE[to.tone].dot : "#111113"}
                  strokeWidth={lit ? 1.4 : 1}
                  animate={{ opacity: lit ? 0.42 : 0.08 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  style={
                    reduce
                      ? undefined
                      : {
                          animationDelay: `${noise(i * 7) * 5}s`,
                          animationDuration: `${4 + noise(i * 3) * 3}s`,
                        }
                  }
                />
              );
            })}
          </g>

          {NODES.map((n, i) => {
            const lit = near.has(n.id);
            const isActive = n.id === selected;
            const tone = TONE[n.tone];

            return (
              <motion.g
                key={n.id}
                className={cn("cursor-pointer", !reduce && "node-float")}
                style={
                  reduce
                    ? undefined
                    : ({
                        ["--fx" as string]: `${(noise(i * 5) - 0.5) * 9}px`,
                        ["--fy" as string]: `${(noise(i * 11) - 0.5) * 9}px`,
                        animationDuration: `${7 + noise(i) * 5}s`,
                        animationDelay: `${noise(i * 2) * 4}s`,
                      } as React.CSSProperties)
                }
                onClick={() => setSelected(n.id)}
                animate={{ opacity: lit ? 1 : 0.22 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <title>{n.label}</title>

                {/* halo marks the current selection */}
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r + 7}
                  fill={tone.dot}
                  animate={{ opacity: isActive ? 0.12 : 0 }}
                  transition={{ duration: 0.35 }}
                />
                <motion.circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill={tone.soft}
                  stroke={tone.dot}
                  strokeWidth={isActive ? 1.8 : 1}
                  animate={{ scale: isActive ? 1.08 : 1 }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 22 }
                  }
                />
                <circle cx={n.x} cy={n.y} r={3} fill={tone.dot} />
                <text
                  x={n.x}
                  y={n.y + n.r + 14}
                  textAnchor="middle"
                  className="pointer-events-none"
                  fill="#56565c"
                  fontSize="10.5"
                >
                  {n.label}
                </text>
              </motion.g>
            );
          })}
        </svg>

        <p className="label absolute right-3 top-3 text-[9px]">Select a node</p>
      </div>

      {/* detail for the selected node */}
      <motion.div
        key={active.id}
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-[13px] bg-surface p-4 shadow-e1 ring-1 ring-line"
      >
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <span
            className="h-2 w-2 shrink-0 rounded-full"
            style={{ background: TONE[active.tone].dot }}
          />
          <p className="text-[13.5px] text-ink">{active.label}</p>
          <span
            className="rounded-full px-1.5 py-px font-mono text-[9.5px] tracking-[0.04em]"
            style={{ background: TONE[active.tone].soft, color: TONE[active.tone].dot }}
          >
            {active.kind}
          </span>
        </div>

        <dl className="mt-3.5 grid grid-cols-3 gap-2">
          {active.stats.map(([k, v]) => (
            <div key={k} className="rounded-[9px] bg-veil/70 px-2.5 py-2">
              <dt className="text-[10.5px] leading-tight text-muted">{k}</dt>
              <dd className="mt-1 font-mono text-[12.5px] text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-3.5 text-[12px] leading-relaxed text-body">{active.note}</p>
      </motion.div>
    </div>
  );
}
