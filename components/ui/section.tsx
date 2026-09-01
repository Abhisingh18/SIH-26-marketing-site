import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

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
}: {
  label?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
  children?: ReactNode;
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
        {title}
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
  body,
  meta,
}: {
  label: string;
  title: ReactNode;
  body: string;
  meta?: string[];
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper px-6 pb-20 pt-36 sm:px-8 md:pb-28 md:pt-44">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(110%_75%_at_50%_0%,#000_10%,transparent_70%)]" />
      <div className="relative mx-auto w-full max-w-[1200px]">
        <Reveal>
          <p className="label">{label}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="display mt-7 max-w-[16ch] text-[clamp(2.4rem,5.6vw,4.2rem)]">
            {title}
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="measure mt-8 text-[17px] leading-[1.65] text-body">{body}</p>
        </Reveal>
        {meta?.length ? (
          <Reveal delay={0.18}>
            <ul className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
              {meta.map((m) => (
                <li key={m} className="label text-body/70">
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
