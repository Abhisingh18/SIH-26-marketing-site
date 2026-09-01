import { Button } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

export function CTA({
  title = "Your data doesn't need to leave your perimeter for AI to work.",
  body = "Deploy a private AI workbench on your own infrastructure — and keep intelligence where your organization already keeps its most valuable information.",
  primary = { href: "/demo", label: "Request a demo" },
  secondary = { href: "/architecture", label: "Explore architecture" },
}: {
  title?: string;
  body?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="relative overflow-hidden bg-obsidian px-6 py-28 sm:px-8 md:py-36">
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(80%_65%_at_50%_50%,#000,transparent_78%)]" />
      <div className="relative mx-auto w-full max-w-[860px] text-center">
        <Reveal>
          <h2 className="display text-[clamp(2rem,4.8vw,3.4rem)] text-paper">{title}</h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mx-auto mt-8 max-w-[54ch] text-[16.5px] leading-[1.65] text-paper/55">
            {body}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <Button href={primary.href} variant="light" size="lg" arrow>
              {primary.label}
            </Button>
            <Button href={secondary.href} variant="outline-light" size="lg">
              {secondary.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
