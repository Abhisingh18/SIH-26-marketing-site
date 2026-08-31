import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Vertical connector with an arrowhead. */
export function Down({ className, height = 28 }: { className?: string; height?: number }) {
  return (
    <div className={cn("flex flex-col items-center", className)} aria-hidden>
      <span className="w-px bg-line-strong" style={{ height }} />
      <svg width="9" height="6" viewBox="0 0 9 6" className="-mt-px fill-line-strong">
        <path d="M4.5 6 0 0h9L4.5 6Z" />
      </svg>
    </div>
  );
}

/**
 * Bracket that fans one rail out into `count` columns (`direction="out"`)
 * or gathers those columns back into one rail (`direction="in"`).
 * Purely decorative.
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

  /** the horizontal bracket spanning the outer column centres */
  const bracket = (
    <div className="flex">
      {cols.map((_, i) => (
        <div key={i} className="flex-1">
          <div
            className={cn(
              "h-5 border-line-strong",
              direction === "out" ? "border-t" : "border-b",
              i === 0 &&
                (direction === "out"
                  ? "ml-[50%] rounded-tl-[10px] border-l"
                  : "ml-[50%] rounded-bl-[10px] border-l"),
              i === cols.length - 1 &&
                (direction === "out"
                  ? "mr-[50%] rounded-tr-[10px] border-r"
                  : "mr-[50%] rounded-br-[10px] border-r"),
            )}
          />
        </div>
      ))}
    </div>
  );

  /** the short stubs that run from the bracket to each column */
  const stubs = (
    <div className="flex">
      {cols.map((_, i) => (
        <div key={i} className="flex flex-1 flex-col items-center">
          <span className="h-4 w-px bg-line-strong" />
          {direction === "out" ? (
            <svg width="9" height="6" viewBox="0 0 9 6" className="-mt-px fill-line-strong">
              <path d="M4.5 6 0 0h9L4.5 6Z" />
            </svg>
          ) : null}
        </div>
      ))}
    </div>
  );

  /** the single rail on the other side of the bracket */
  const stem =
    direction === "out" ? (
      <div className="mx-auto h-5 w-px bg-line-strong" />
    ) : (
      <Down height={20} />
    );

  return (
    <div className={cn("w-full", className)} aria-hidden>
      {direction === "out" ? (
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

/** A labelled slab in a layered architecture stack. */
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
        "w-full rounded-[12px] border px-5 py-4 text-center",
        tone === "default" && "border-line bg-surface",
        tone === "accent" && "border-accent/25 bg-accent-soft",
        tone === "ink" && "border-ink bg-ink",
        className,
      )}
    >
      <p
        className={cn(
          "font-mono text-[11.5px] uppercase tracking-[0.16em]",
          tone === "ink" ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </p>
      {detail ? (
        <p
          className={cn(
            "mt-1.5 text-[12.5px]",
            tone === "ink" ? "text-paper/55" : "text-muted",
          )}
        >
          {detail}
        </p>
      ) : null}
    </div>
  );
}

/** Rounded pill used in horizontal step chains. */
export function Step({
  index,
  label,
  detail,
  className,
}: {
  index: number;
  label: string;
  detail?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-full border border-line bg-surface py-2.5 pl-2.5 pr-5",
        className,
      )}
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-[10px] text-paper">
        {index}
      </span>
      <span className="text-[13.5px] text-ink">{label}</span>
      {detail ? (
        <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.12em] text-muted sm:inline">
          {detail}
        </span>
      ) : null}
    </div>
  );
}

export function DiagramFrame({
  children,
  className,
  caption,
}: {
  children: ReactNode;
  className?: string;
  caption?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[18px] border border-line bg-surface px-5 py-10 sm:px-10 sm:py-14",
        className,
      )}
    >
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-45 [mask-image:radial-gradient(100%_100%_at_50%_50%,#000,transparent_78%)]" />
      <div className="relative">{children}</div>
      {caption ? (
        <p className="relative mt-10 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
