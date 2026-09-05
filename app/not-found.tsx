import { Button, Label, TextLink } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";

/**
 * Rendered inside the root layout, so nav and footer still wrap it. Deliberately
 * quiet: a 404 is an interruption, and the useful thing to hand someone is the
 * way back rather than a joke.
 */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[76vh] items-center overflow-hidden px-6 pb-24 pt-36 sm:px-8 md:pt-44">
      <div className="grid-paper pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(110%_75%_at_50%_0%,#000_10%,transparent_70%)]" />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <Reveal>
          <Label>404</Label>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="display mt-7 max-w-[14ch] text-[clamp(2.4rem,5.6vw,4rem)]">
            This page is not here.
          </h1>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="measure mt-8 text-[17px] leading-[1.65] text-body">
            The address may be out of date, or the page may have moved. Everything the site
            does is one step from here.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Button href="/" size="lg">
              Back to home
            </Button>
            <Button href="/platform" variant="secondary" size="lg">
              Explore the platform
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.24}>
          <div className="mt-10 border-t border-line pt-7">
            <TextLink href="/demo">Request a demo</TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
