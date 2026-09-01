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
  { icon: Plus, label: "New task", active: true },
  { icon: Boxes, label: "Projects" },
  { icon: Database, label: "Knowledge" },
  { icon: Sparkles, label: "Models" },
  { icon: Shield, label: "Security" },
];

const STEPS = [
  { label: "Read inspection_report.pdf", meta: "24 pages parsed" },
  { label: "Extracted findings and tag numbers", meta: "7 figures analysed" },
  { label: "Retrieved SOP-114, SOP-232", meta: "local knowledge base" },
  { label: "Cross-checked thickness limits", meta: "reasoning model" },
  { label: "Drafting approval note", meta: "in progress", running: true },
];

export function Workbench({
  variant = "full",
  className,
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduce = useReducedMotion();
  const compact = variant === "compact";

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
        <p className="text-[12px] text-muted">Sovereign Workbench</p>
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
        <aside
          className={cn(
            "hidden shrink-0 flex-col justify-between border-r border-line bg-paper/70 p-3 sm:flex",
            compact ? "w-[152px]" : "w-[192px]",
          )}
        >
          <nav className="flex flex-col gap-0.5">
            {NAV.map(({ icon: Icon, label, active }) => (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-[13px]",
                  active ? "bg-ink text-paper shadow-e1" : "text-body",
                )}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                <span className="truncate">{label}</span>
              </div>
            ))}
          </nav>
          <div className="mt-8 rounded-[11px] bg-surface p-3 shadow-e1 ring-1 ring-line">
            <p className="label text-[9.5px]">Active model</p>
            <p className="mt-1.5 truncate text-[12.5px] text-ink">Reasoning · 30B</p>
            <p className="mt-0.5 font-mono text-[10px] text-muted">gpu-01 · on-prem</p>
          </div>
        </aside>

        <div className={cn("min-w-0 flex-1 p-5 sm:p-6", compact ? "space-y-4" : "space-y-5")}>
          <div>
            <p className="label">Task</p>
            <p
              className={cn(
                "mt-2 tracking-[-0.015em] text-ink",
                compact ? "text-[16px]" : "text-[18px] sm:text-[20px]",
              )}
            >
              Analyse this inspection report and prepare an approval note.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Attachment icon={FileText} name="inspection_report.pdf" meta="4.2 MB" />
            <Attachment icon={Table2} name="thickness_log.xlsx" meta="118 KB" />
          </div>

          <div className="rounded-[13px] bg-veil/70 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="label">Agent activity</p>
              <p className="font-mono text-[10px] text-muted">4 / 5</p>
            </div>
            <ol className="space-y-3">
              {STEPS.slice(0, compact ? 4 : 5).map((step, i) => (
                <motion.li
                  key={step.label}
                  className="flex items-start gap-2.5"
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={inView ? { opacity: 1, x: 0 } : undefined}
                  transition={{ delay: 0.4 + i * 0.4, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span
                    className={cn(
                      "mt-px flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-full",
                      step.running
                        ? "bg-surface text-muted ring-1 ring-line-2"
                        : "bg-signal/12 text-signal",
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
                        "block text-[13px] leading-snug",
                        step.running ? "text-muted" : "text-ink",
                      )}
                    >
                      {step.label}
                    </span>
                    <span className="text-[11px] text-muted">{step.meta}</span>
                  </span>
                </motion.li>
              ))}
            </ol>
          </div>

          <motion.div
            className="flex items-center gap-3 rounded-[13px] bg-accent-tint px-4 py-3.5 ring-1 ring-accent/12"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 2.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <FileText className="h-4 w-4 shrink-0 text-accent" strokeWidth={1.75} />
            <div className="min-w-0">
              <p className="truncate text-[13px] text-ink">Approval_Note_TK-402.docx</p>
              <p className="text-[11px] text-muted">generated locally · never left this machine</p>
            </div>
            <span className="ml-auto hidden shrink-0 rounded-full bg-ink px-3.5 py-1.5 text-[11.5px] text-paper sm:block">
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
    <div className="flex items-center gap-2 rounded-[10px] bg-surface px-2.5 py-1.5 shadow-e1 ring-1 ring-line">
      <Icon className="h-3.5 w-3.5 text-muted" strokeWidth={1.75} />
      <span className="text-[12.5px] text-ink">{name}</span>
      <span className="font-mono text-[10px] text-muted">{meta}</span>
    </div>
  );
}
