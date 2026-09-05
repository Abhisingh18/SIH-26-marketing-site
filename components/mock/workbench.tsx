"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import {
  Boxes,
  Check,
  Database,
  FileSpreadsheet,
  FileText,
  Plus,
  Shield,
  Sparkles,
} from "lucide-react";
import { KnowledgeGraph } from "./knowledge-graph";
import { cn } from "@/lib/utils";

type View = "task" | "knowledge";

const NAV = [
  { icon: Plus, label: "New task", view: "task" as View },
  { icon: Boxes, label: "Projects" },
  { icon: Database, label: "Knowledge", view: "knowledge" as View },
  { icon: Sparkles, label: "Models" },
  { icon: Shield, label: "Security" },
];

/**
 * One tone per subsystem, matching the categories used on the document strip:
 * parsing blue, vision indigo, retrieval green, reasoning amber. Colour lands on
 * the small tag pills rather than the rows, so the log still reads top to bottom
 * as one column of text.
 */
const TONES = {
  parse: "bg-accent-tint text-accent",
  vision: "bg-[#efeffb] text-[#5551c4]",
  retrieval: "bg-[#e9f6ef] text-[#0f8b55]",
  reasoning: "bg-[#fdf3e6] text-[#b0670f]",
} as const;

const STEPS = [
  {
    doing: "Reading inspection_report.pdf",
    done: "Read inspection_report.pdf",
    meta: "24 pages parsed",
    tag: "docling",
    tone: "parse",
  },
  {
    doing: "Extracting findings and tag numbers",
    done: "Extracted findings and tag numbers",
    meta: "7 figures analysed",
    tag: "vision",
    tone: "vision",
  },
  {
    doing: "Searching the knowledge base",
    done: "Retrieved SOP-114, SOP-232",
    meta: "2 documents cited",
    tag: "local rag",
    tone: "retrieval",
  },
  {
    doing: "Cross-checking thickness limits",
    done: "Cross-checked thickness limits",
    meta: "against API 570",
    tag: "reasoning",
    tone: "reasoning",
  },
  {
    doing: "Drafting approval note",
    done: "Drafted approval note",
    meta: "1,240 words written",
    tag: "generating",
    tone: "reasoning",
  },
] satisfies {
  doing: string;
  done: string;
  meta: string;
  tag: string;
  tone: keyof typeof TONES;
}[];

/** how long each step appears to take, and the beat held on the finished run */
const STEP_MS = 1500;
const HOLD_MS = 3200;

/**
 * Retrieval is the step that actually uses the knowledge base, so the workbench
 * switches to the graph while it runs and switches back after. It gets a longer
 * beat than the others because a graph needs time to be read — at 1.5s it would
 * flash past before anyone registered what it was.
 */
const RETRIEVAL_STEP = 2;
const RETRIEVAL_MS = 6200;

export function Workbench({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // not `once` — the run pauses when the mock scrolls out of view
  const inView = useInView(ref, { margin: "-12% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  // null while the demo drives itself; set once a viewer takes over
  const [pinned, setPinned] = useState<View | null>(null);

  // The agent walks the log a step at a time, holds on the finished run, then
  // starts over — so the mock behaves like a short loop of the product working
  // rather than a screenshot that animated in once and stopped.
  useEffect(() => {
    if (!inView || reduce) return;
    const finished = active >= STEPS.length;
    const wait = finished
      ? HOLD_MS
      : active === RETRIEVAL_STEP
        ? RETRIEVAL_MS
        : STEP_MS;
    const timer = setTimeout(() => setActive(finished ? 0 : active + 1), wait);
    return () => clearTimeout(timer);
  }, [active, inView, reduce]);

  // reduced motion gets the completed run, held still
  const at = reduce ? STEPS.length : active;
  const complete = at >= STEPS.length;
  const doneCount = Math.min(at, STEPS.length);

  const following: View = at === RETRIEVAL_STEP ? "knowledge" : "task";
  const view = pinned ?? following;
  const touring = pinned === null && following === "knowledge";

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-[16px] bg-surface shadow-e3 ring-1 ring-line",
        className,
      )}
    >
      {/* title bar */}
      <div className="flex items-center gap-3 border-b border-line bg-veil/60 px-4 py-3">
        <div className="flex gap-[5px]">
          <span className="h-[9px] w-[9px] rounded-full bg-line-2" />
          <span className="h-[9px] w-[9px] rounded-full bg-line-2" />
          <span className="h-[9px] w-[9px] rounded-full bg-line-2" />
        </div>
        <p className="text-[12px] text-muted">Sangam Workbench</p>
        <div className="ml-auto flex items-center gap-2 rounded-full bg-surface px-2.5 py-1 shadow-e1 ring-1 ring-line">
          <span className="relative flex h-1.5 w-1.5">
            <span className="dot-live absolute inline-flex h-full w-full rounded-full bg-signal" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-body">
            Local
          </span>
        </div>
      </div>

      <div className="flex">
        {/* sidebar */}
        <aside className="hidden w-[192px] shrink-0 flex-col justify-between border-r border-line bg-paper/70 p-3 sm:flex">
          <nav className="flex flex-col gap-0.5">
            {NAV.map(({ icon: Icon, label, view: target }) => {
              const on = target !== undefined && target === view;
              return (
                <button
                  key={label}
                  type="button"
                  disabled={target === undefined}
                  onClick={() => target && setPinned(target)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-left text-[13px] transition-colors duration-300",
                    on ? "bg-ink text-paper shadow-e1" : "text-body",
                    target !== undefined && !on && "hover:bg-ink/[0.05]",
                    target === undefined && "cursor-default",
                  )}
                >
                  <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                  <span className="truncate">{label}</span>
                </button>
              );
            })}
          </nav>

          <div className="mt-8 rounded-[11px] bg-surface p-3 shadow-e1 ring-1 ring-line">
            <p className="label text-[9.5px]">Active model</p>
            <p className="mt-1.5 truncate text-[12.5px] text-ink">
              Reasoning · 30B
            </p>
            <p className="mt-0.5 font-mono text-[10px] text-muted">
              gpu-01 · on-prem
            </p>
            <div className="mt-2.5 flex items-center gap-1.5 border-t border-line pt-2.5">
              <span className="dot-live h-1 w-1 rounded-full bg-signal" />
              <span className="font-mono text-[10px] text-muted">42 tok/s</span>
            </div>
          </div>
        </aside>

        {/* main pane */}
        <div className="min-w-0 flex-1 space-y-5 p-5 sm:p-6">
          {/* the sidebar is hidden on small screens, so the views need a way in */}
          <div className="flex gap-1 rounded-full bg-veil p-1 sm:hidden">
            {(["task", "knowledge"] as View[]).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setPinned(v)}
                className={cn(
                  "flex-1 rounded-full px-3 py-1.5 text-[12.5px] capitalize transition-colors duration-300",
                  view === v ? "bg-surface text-ink shadow-e1" : "text-body",
                )}
              >
                {v === "task" ? "Task" : "Knowledge"}
              </button>
            ))}
          </div>

          {view === "knowledge" ? (
            <>
              <div>
                <p className="label">Knowledge</p>
                <p className="mt-2 text-[18px] tracking-[-0.015em] text-ink sm:text-[20px]">
                  {touring
                    ? "Searching what it knows about TK-402…"
                    : "What the workbench knows about TK-402."}
                </p>
              </div>
              <KnowledgeGraph tour={touring} onInteract={() => setPinned("knowledge")} />
            </>
          ) : (
            <>
              <div>
                <p className="label">Task</p>
                <p className="mt-2 text-[18px] tracking-[-0.015em] text-ink sm:text-[20px]">
                  Analyse this inspection report and prepare an approval note.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Attachment
                  icon={FileText}
                  name="inspection_report.pdf"
                  meta="4.2 MB"
                  tone="bg-[#fdecea] text-[#c0392b]"
                />
                <Attachment
                  icon={FileSpreadsheet}
                  name="thickness_log.xlsx"
                  meta="118 KB"
                  tone="bg-[#e9f6ef] text-[#0f8b55]"
                />
              </div>

              <div className="rounded-[13px] bg-veil/70 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <p className="label">Agent activity</p>
                  <p className="font-mono text-[10px] text-muted tabular-nums">
                    {doneCount} / {STEPS.length}
                  </p>
                </div>

                {/* the bar tracks the run rather than playing once on entry */}
                <div className="mb-4 h-[3px] overflow-hidden rounded-full bg-ink/[0.07]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-accent via-[#5551c4] to-signal"
                    animate={{ width: `${(doneCount / STEPS.length) * 100}%` }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { duration: 0.9, ease: [0.22, 1, 0.36, 1] }
                    }
                  />
                </div>

                <ol className="space-y-3">
                  {STEPS.map((step, i) => {
                    const state =
                      i < at ? "done" : i === at ? "running" : "pending";
                    return (
                      <motion.li
                        key={step.done}
                        className="flex items-start gap-2.5"
                        animate={{ opacity: state === "pending" ? 0.32 : 1 }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span
                          className={cn(
                            "mt-px flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full transition-colors duration-300",
                            state === "done"
                              ? "bg-signal/15 text-signal"
                              : "bg-surface ring-1 ring-line-2",
                          )}
                        >
                          {state === "done" ? (
                            <motion.span
                              initial={
                                reduce ? false : { scale: 0.4, opacity: 0 }
                              }
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{
                                duration: 0.35,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                            >
                              <Check className="h-2.5 w-2.5" strokeWidth={3} />
                            </motion.span>
                          ) : state === "running" ? (
                            <span className="dot-live h-[5px] w-[5px] rounded-full bg-[#b0670f]" />
                          ) : (
                            <span className="h-[5px] w-[5px] rounded-full bg-line-2" />
                          )}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span
                              className={cn(
                                "text-[13px] leading-snug transition-colors duration-300",
                                state === "done" ? "text-ink" : "text-muted",
                              )}
                            >
                              {state === "done" ? step.done : step.doing}
                            </span>
                            {state !== "pending" ? (
                              <span
                                className={cn(
                                  "rounded-full px-1.5 py-px font-mono text-[9.5px] tracking-[0.04em]",
                                  TONES[step.tone],
                                )}
                              >
                                {step.tag}
                              </span>
                            ) : null}
                          </span>

                          {state === "running" ? (
                            // work being produced, rather than a spinner saying "busy"
                            <span className="mt-2 block space-y-1.5">
                              <span className="shimmer-bar block h-1.5 w-[86%] rounded-full" />
                              <span className="shimmer-bar block h-1.5 w-[62%] rounded-full [animation-delay:0.25s]" />
                            </span>
                          ) : state === "done" ? (
                            <span className="text-[11px] text-muted">
                              {step.meta}
                            </span>
                          ) : null}
                        </span>
                      </motion.li>
                    );
                  })}
                </ol>
              </div>

              {/* stays in the layout so nothing jumps when the run completes */}
              <motion.div
                className="flex items-center gap-3 rounded-[13px] bg-accent-tint px-4 py-3.5 ring-1 ring-accent/12"
                animate={
                  complete
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0.25, y: 4, scale: 0.995 }
                }
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
                }
              >
                <FileText
                  className="h-4 w-4 shrink-0 text-accent"
                  strokeWidth={1.75}
                />
                <div className="min-w-0">
                  <p className="truncate text-[13px] text-ink">
                    Approval_Note_TK-402.docx
                  </p>
                  <p className="text-[11px] text-muted">
                    generated locally · never left this machine
                  </p>
                </div>
                <span className="ml-auto hidden shrink-0 rounded-full bg-ink px-3.5 py-1.5 text-[11.5px] text-paper sm:block">
                  Open
                </span>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Attachment({
  icon: Icon,
  name,
  meta,
  tone,
}: {
  icon: typeof FileText;
  name: string;
  meta: string;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-[10px] bg-surface py-1.5 pl-1.5 pr-2.5 shadow-e1 ring-1 ring-line">
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-[7px]",
          tone,
        )}
      >
        <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
      </span>
      <span className="text-[12.5px] text-ink">{name}</span>
      <span className="font-mono text-[10px] text-muted">{meta}</span>
    </div>
  );
}
