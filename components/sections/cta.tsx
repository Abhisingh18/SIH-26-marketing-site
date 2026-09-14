import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { PixelRover } from "@/components/ui/pixel-rover";

/** lucide dropped its brand glyphs, so the GitHub mark is inlined */
function GitHubMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

const REPO = "https://github.com/vermarjun/sih26";

export function CTA({
  title = "Run Pragyan on your network",
  body = "Install the CLI and connect it to your GPU server.",
  primary = { href: "/demo", label: "Download Pragyan" },
  secondary = { href: REPO, label: "View on GitHub" },
}: {
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  const secondaryIsRepo = secondary.href.startsWith("http");

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(120deg,#c7ceff,#dfe3fb_46%,#eef0fb)] px-6 py-28 sm:px-8 md:py-36">
      {/* a fine grain over the wash, so the panel reads as a surface rather than
          a flat fill — kept faint via SVG fractal noise as a data URI */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5] mix-blend-soft-light [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]"
      />
      {/* a soft light pooling toward the centre-right, as in the reference */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_90%_at_62%_40%,rgba(255,255,255,0.55),transparent_70%)]" />

      <div className="relative mx-auto flex max-w-[820px] flex-col items-center text-center">
        <Reveal>
          <PixelRover unit={6} />
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-7 max-w-[14ch] text-[clamp(2.1rem,5.4vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-ink">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-[46ch] text-balance text-[16.5px] leading-[1.6] text-[#3b3f57]">
            {body}
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button
              href={primary.href}
              size="lg"
              arrow
              className="bg-accent text-paper hover:bg-[#1b2ea8]"
            >
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="secondary" size="lg">
              {secondaryIsRepo ? (
                <GitHubMark className="h-4 w-4" />
              ) : null}
              {secondary.label}
              {secondaryIsRepo ? null : (
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
              )}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
