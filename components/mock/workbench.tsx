"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import {
  Boxes,
  Check,
  Database,
  FileText,
  Loader2,
  Plus,
  Shield,
  Sparkles,
  Table2,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { icon: Plus, label: "New Task", active: true },
  { icon: Boxes, label: "Projects" },
  { icon: Database, label: "Knowledge" },
  { icon: Sparkles, label: "Models" },
  { icon: Shield, label: "Security" },
];

const STEPS = [
  { label: "Read inspection_report.pdf", meta: "docling · 24 pages" },
  { label: "Extracted findings and tag numbers", meta: "vision · 7 figures" },
  { label: "Retrieved SOP-114, SOP-232", meta: "local rag" },
  { label: "Cross-checked against thickness limits", meta: "reasoning" },
  { label: "Drafting approval note", meta: "generating", running: true },
];

export function Workbench({
  variant = "full",
  className,
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduce = useReducedMotion();
  const compact = variant === "compact";

  return (
    <div
      ref={ref}
      className={cn(
        "overflow-hidden rounded-[14px] border border-line-strong bg-surface",
        "shadow-[0_40px_90px_-50px_rgba(12,12,13,0.45),0_2px_8px_-2px_rgba(12,12,13,0.08)]",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-sand/70 px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
        </div>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
          Sovereign Workbench
        </p>
        <div className="ml-auto flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1">
          <span className="relative flex h-1.5 w-1.5">
            <span className="dot-live absolute inline-flex h-full w-full rounded-full bg-signal" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
            Local
          </span>
        </div>
      </div>

      <div className="flex">
        <aside
          className={cn(
            "hidden shrink-0 flex-col justify-between border-r border-line bg-paper/60 p-3 sm:flex",
            compact ? "w-[148px]" : "w-[186px]",
          )}
        >
          <nav className="flex flex-col gap-0.5">
            {NAV.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-2.5 rounded-[8px] px-2.5 py-2 text-[12.5px]",
                  active ? "bg-ink text-paper" : "text-ink-soft",
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </nav>
          <div className="mt-6 rounded-[10px] border border-line bg-surface p-2.5">
            <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-muted">
              Active model
            </p>
            <p className="mt-1 truncate text-[12px] text-ink">Reasoning · 30B</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted">gpu-01 · on-prem</p>
          </div>
        </aside>

        <div className={cn("min-w-0 flex-1 p-4 sm:p-5", compact ? "space-y-3.5" : "space-y-4")}>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Task</p>
            <p
              className={cn(
                "mt-1.5 text-ink",
                compact ? "text-[15px]" : "text-[17px] sm:text-[19px]",
              )}
            >
              Analyse this inspection report and prepare an approval note.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Attachment icon={FileText} name="inspection_report.pdf" meta="4.2 MB" />
            <Attachment icon={Table2} name="thickness_log.xlsx" meta="118 KB" />
          </div>

          <div className="rounded-[12px] border border-line bg-paper/70 p-3.5">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                Agent activity
              </p>
              <p className="font-mono text-[10px] text-muted">4 / 5</p>
            </div>
            <ol className="space-y-2.5">
              {STEPS.slice(0, compact ? 4 : 5).map((step, i) => (
                <motion.li
                  key={step.label}
                  className="flex items-start gap-2.5"
                  initial={reduce ? false : { opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 0.35 + i * 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className={cn(
                      "mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                      step.running
                        ? "border border-line-strong bg-surface text-muted"
                        : "bg-signal/15 text-signal",
                    )}
                  >
                    {step.running ? (
                      <Loader2 className="h-2.5 w-2.5 animate-spin" strokeWidth={2.5} />
                    ) : (
                      <Check className="h-2.5 w-2.5" strokeWidth={3} />
                    )}
                  </span>
                  <span className="min-w-0">
                    <span
                      className={cn(
                        "block text-[12.5px] leading-snug",
                        step.running ? "text-muted" : "text-ink",
                      )}
                    >
                      {step.label}
                    </span>
                    <span className="font-mono text-[10px] text-muted">{step.meta}</span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>

          <motion.div
            className="flex items-center gap-3 rounded-[12px] border border-accent/20 bg-accent-soft px-3.5 py-3"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 2.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <FileText className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
            <div className="min-w-0">
              <p className="truncate text-[12.5px] text-ink">Approval_Note_TK-402.docx</p>
              <p className="font-mono text-[10px] text-muted">
                generated locally · never left this machine
              </p>
            </div>
            <span className="ml-auto hidden shrink-0 rounded-full bg-ink px-3 py-1.5 text-[11px] text-paper sm:block">
              Open
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Attachment({
  icon: Icon,
  name,
  meta,
}: {
  icon: typeof FileText;
  name: string;
  meta: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-[9px] border border-line bg-surface px-2.5 py-1.5">
      <Icon className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} />
      <span className="text-[12px] text-ink">{name}</span>
      <span className="font-mono text-[10px] text-muted">{meta}</span>
    </div>
  );
}
