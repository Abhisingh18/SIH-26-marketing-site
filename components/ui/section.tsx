import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Section({
  id,
  children,
  className,
  tone = "paper",
  bordered = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  tone?: "paper" | "surface" | "sand" | "ink";
  bordered?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 px-5 py-20 sm:px-8 md:py-28 lg:py-32",
        tone === "paper" && "bg-paper",
        tone === "surface" && "bg-surface",
        tone === "sand" && "bg-sand",
        tone === "ink" && "bg-ink text-paper",
        bordered && tone !== "ink" && "border-t border-line",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-[1180px]">{children}</div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "left",
  className,
  invert = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: "left" | "center";
  className?: string;
  invert?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-[760px]",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow mb-5", invert && "text-paper/45")}>{eyebrow}</p>
      ) : null}
      <h2
        className={cn(
          "display text-[clamp(1.9rem,4.4vw,3.2rem)]",
          invert ? "text-paper" : "text-ink",
        )}
      >
        {title}
      </h2>
      {sub ? (
        <p
          className={cn(
            "mt-5 text-[16px] leading-relaxed sm:text-[17px]",
            invert ? "text-paper/60" : "text-muted",
          )}
        >
          {sub}
        </p>
      ) : null}
    </Reveal>
  );
}
