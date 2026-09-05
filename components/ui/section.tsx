import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { WordRise } from "./word-rise";

export function Section({
  id,
  children,
  className,
  tone = "paper",
  size = "md",
  divider = false,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "paper" | "surface" | "veil" | "ink";
  size?: "sm" | "md" | "lg";
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 px-6 sm:px-8",
        size === "sm" && "py-16 md:py-20",
        size === "md" && "py-20 md:py-28",
        size === "lg" && "py-24 md:py-36",
        tone === "paper" && "bg-paper",
        tone === "surface" && "bg-surface",
        tone === "veil" && "bg-veil",
        tone === "ink" && "bg-obsidian",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1200px]">
        {divider ? <div className="rule mb-20" /> : null}
        {children}
      </div>
    </section>
  );
}

export function SectionHead({
  label,
  title,
  body,
  align = "left",
  invert = false,
  className,
  children,
  /**
   * Pass the heading here instead of `title` for a word-by-word entry rather
   * than the block fade — for headings worth the extra beat.
   */
  animateTitle,
}: {
  label?: string;
  title?: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
  children?: ReactNode;
  animateTitle?: string;
}) {
  return (
    <Reveal className={cn(align === "center" && "flex flex-col items-center text-center", className)}>
      {label ? (
        <p className={cn("label mb-6", invert && "text-white/40")}>{label}</p>
      ) : null}
      <h2
        className={cn(
          "display-sm max-w-[20ch] text-[clamp(1.75rem,3.6vw,2.75rem)]",
          invert && "text-paper",
        )}
      >
        {animateTitle ? <WordRise segments={[{ text: animateTitle }]} /> : title}
      </h2>
      {body ? (
        <p
          className={cn(
            "measure mt-6 text-[16.5px] leading-[1.65]",
            invert ? "text-paper/55" : "text-body",
          )}
        >
          {body}
        </p>
      ) : null}
      {children ? <div className="mt-8">{children}</div> : null}
    </Reveal>
  );
}

/** Hero band for every page except home. */
export function PageHero({
  label,
  title,
  animateTitle,
  body,
  meta,
  align = "left",
  ornament,
  backdrop,
  art,
}: {
  label: string;
  title?: ReactNode;
  /** pass the heading here instead of `title` for a word-by-word entry */
  animateTitle?: string;
  body: string;
  meta?: string[];
  align?: "left" | "center";
  /** decorative mark above the kicker */
  ornament?: ReactNode;
  /** an animated wash behind the copy — opt-in, so a page can stay quiet */
  backdrop?: ReactNode;
  /** full-bleed artwork closing the band, under the copy */
  art?: ReactNode;
}) {
  const centred = align === "center";

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper px-6 pb-20 pt-36 sm:px-8 md:pb-28 md:pt-44">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(110%_75%_at_50%_0%,#000_10%,transparent_70%)]" />
      {backdrop}
      <div
        className={cn(
          "relative mx-auto w-full max-w-[1200px]",
          centred && "flex flex-col items-center text-center",
        )}
      >
        {ornament ? (
          <Reveal className={cn(centred && "flex justify-center")}>{ornament}</Reveal>
        ) : null}
        <Reveal delay={ornament ? 0.04 : 0}>
          <p className="label">{label}</p>
        </Reveal>
        <Reveal delay={ornament ? 0.1 : 0.06}>
          <h1
            className={cn(
              "display mt-7 max-w-[16ch] text-[clamp(2.4rem,5.6vw,4.2rem)]",
              centred && "mx-auto",
            )}
          >
            {animateTitle ? <WordRise segments={[{ text: animateTitle }]} /> : title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p
            className={cn(
              "measure mt-8 text-[17px] leading-[1.65] text-body",
              centred && "mx-auto text-balance",
            )}
          >
            {body}
          </p>
        </Reveal>
        {meta?.length ? (
          <RevealGroup
            className={cn(
              "mt-12 flex flex-wrap items-center gap-x-2.5 gap-y-2",
              centred && "justify-center",
            )}
            stagger={0.06}
          >
            {meta.map((m) => (
              <RevealItem key={m}>
                {/* elevated chips rather than bare words: the row reads as a
                    set of facets you could pick from, which is what it is */}
                <span className="rounded-full bg-surface px-3.5 py-1.5 text-[13px] text-body shadow-e1 ring-1 ring-line/70">
                  {m}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        ) : null}
      </div>

      {art ? (
        // breaks the 1200px column: the artwork is a horizon, and a horizon that
        // stops at the gutter draws a box instead
        <div className="relative -mb-20 mt-14 md:-mb-28 md:mt-16">
          <div className="w-screen max-w-[100vw] -translate-x-1/2 [margin-left:50%]">
            {art}
          </div>
        </div>
      ) : null}
    </section>
  );
}
