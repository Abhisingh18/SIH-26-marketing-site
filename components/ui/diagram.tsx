import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Nodes                                                               */
/* ------------------------------------------------------------------ */

export function Node({
  children,
  meta,
  tone = "default",
  className,
}: {
  children: ReactNode;
  meta?: string;
  tone?: "default" | "quiet" | "accent" | "ink";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[12px] px-4 py-3 text-center",
        tone === "default" && "bg-surface shadow-e1 ring-1 ring-line",
        tone === "quiet" && "bg-veil ring-1 ring-line/60",
        tone === "accent" && "bg-accent-tint ring-1 ring-accent/15",
        tone === "ink" && "bg-ink shadow-e2",
        className,
      )}
    >
      <span
        className={cn(
          "text-[13.5px] leading-tight",
          tone === "ink" ? "text-paper" : "text-ink",
          tone === "accent" && "text-accent",
        )}
      >
        {children}
      </span>
      {meta ? (
        <span
          className={cn(
            "mt-1 font-mono text-[10px] tracking-[0.08em]",
            tone === "ink" ? "text-paper/45" : "text-muted",
          )}
        >
          {meta}
        </span>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Connectors                                                          */
/* ------------------------------------------------------------------ */

export function Down({ className, height = 26 }: { className?: string; height?: number }) {
  return (
    <div className={cn("flex flex-col items-center", className)} aria-hidden>
      <span className="w-px bg-line-2" style={{ height }} />
      <svg width="8" height="5" viewBox="0 0 8 5" className="-mt-px fill-line-2">
        <path d="M4 5 0 0h8L4 5Z" />
      </svg>
    </div>
  );
}

/**
 * Bracket that fans one rail out into `count` columns (`direction="out"`)
 * or gathers those columns back into one rail (`direction="in"`).
 */
export function Split({
  count = 3,
  direction = "out",
  className,
}: {
  count?: number;
  direction?: "out" | "in";
  className?: string;
}) {
  const cols = Array.from({ length: count });
  const out = direction === "out";

  const bracket = (
    <div className="flex">
      {cols.map((_, i) => (
        <div key={i} className="flex-1">
          <div
            className={cn(
              "h-5 border-line-2",
              out ? "border-t" : "border-b",
              i === 0 && (out ? "ml-[50%] rounded-tl-[12px] border-l" : "ml-[50%] rounded-bl-[12px] border-l"),
              i === cols.length - 1 &&
                (out ? "mr-[50%] rounded-tr-[12px] border-r" : "mr-[50%] rounded-br-[12px] border-r"),
            )}
          />
        </div>
      ))}
    </div>
  );

  const stubs = (
    <div className="flex">
      {cols.map((_, i) => (
        <div key={i} className="flex flex-1 flex-col items-center">
          <span className="h-4 w-px bg-line-2" />
          {out ? (
            <svg width="8" height="5" viewBox="0 0 8 5" className="-mt-px fill-line-2">
              <path d="M4 5 0 0h8L4 5Z" />
            </svg>
          ) : null}
        </div>
      ))}
    </div>
  );

  const stem = out ? <div className="mx-auto h-5 w-px bg-line-2" /> : <Down height={20} />;

  return (
    <div className={cn("w-full", className)} aria-hidden>
      {out ? (
        <>
          {stem}
          {bracket}
          {stubs}
        </>
      ) : (
        <>
          {stubs}
          {bracket}
          {stem}
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Layers & frames                                                     */
/* ------------------------------------------------------------------ */

export function Layer({
  title,
  detail,
  tone = "default",
  className,
}: {
  title: string;
  detail?: string;
  tone?: "default" | "ink" | "accent";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "w-full rounded-[14px] px-6 py-4 text-center",
        tone === "default" && "bg-surface shadow-e1 ring-1 ring-line",
        tone === "accent" && "bg-accent-tint ring-1 ring-accent/15",
        tone === "ink" && "bg-ink shadow-e2",
        className,
      )}
    >
      <p
        className={cn(
          "text-[14.5px] font-medium tracking-[-0.01em]",
          tone === "ink" ? "text-paper" : tone === "accent" ? "text-accent" : "text-ink",
        )}
      >
        {title}
      </p>
      {detail ? (
        <p className={cn("mt-1 text-[12.5px]", tone === "ink" ? "text-paper/45" : "text-muted")}>
          {detail}
        </p>
      ) : null}
    </div>
  );
}

export function DiagramFrame({
  children,
  caption,
  className,
}: {
  children: ReactNode;
  caption?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[22px] bg-veil px-6 py-12 sm:px-12 sm:py-16",
        className,
      )}
    >
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(95%_95%_at_50%_50%,#000,transparent_80%)]" />
      <div className="relative">{children}</div>
      {caption ? <p className="label relative mt-12 text-center">{caption}</p> : null}
    </div>
  );
}
