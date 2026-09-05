import Link from "next/link";
import { SovereigntyMonitor } from "@/components/mock/monitor";
import { PillarCards } from "@/components/sections/pillar-cards";
import { ProductFacts } from "@/components/sections/product-facts";
import { TextLink } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";
import { NeuralField } from "@/components/ui/neural-field";
import { WordRise } from "@/components/ui/word-rise";

/* ------------------------------------------------------------------ */
/* Editorial statement                                                 */
/* ------------------------------------------------------------------ */

export function Statement() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:px-8 md:py-40">
      <StatementBackdrop />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <h2 className="display mx-auto max-w-[24ch] text-center text-[clamp(2.1rem,5.4vw,4rem)]">
          <WordRise
            segments={[
              // the setup recedes so the payoff lands — the sentence is about
              // trust, and that half was the one greyed out before
              { text: "The most valuable AI is the one you can", className: "text-muted" },
              { text: "trust with your most valuable data.", className: "text-ink" },
            ]}
          />
        </h2>

        <Reveal delay={0.5}>
          <p className="mx-auto mt-12 max-w-[58ch] text-balance text-center text-[17px] leading-[1.65] text-body">
            Refineries, plants and engineering teams already hold the information AI is best
            at using. The problem was never capability — it was custody.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Drifting fields behind the statement, in the palette the page already uses:
 * saffron from the fold, periwinkle from the product wash, violet where they
 * meet. Kept at very low alpha and heavily blurred — the text sits directly on
 * this, so it can be felt but must never be read.
 *
 * The three drift on unrelated cycles, so they never line up and the loop never
 * announces itself.
 */
function StatementBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(82%_78%_at_50%_50%,#000_32%,transparent_100%)]"
    >
      <div className="grid-paper absolute inset-0 opacity-50" />

      {/* the network sits between the grid and the colour, so the wash lights
          it from behind rather than covering it */}
      <div className="absolute inset-0 opacity-[0.9]">
        <NeuralField />
      </div>

      <div className="drift-a absolute left-[4%] top-[6%] h-[66%] w-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(240,150,70,0.32),rgba(240,168,110,0.12)_58%,transparent_100%)] blur-[85px]" />
      <div className="drift-b absolute right-[2%] top-[20%] h-[74%] w-[50%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(96,120,244,0.36),rgba(140,164,248,0.14)_56%,transparent_100%)] blur-[90px]" />
      <div className="drift-c absolute left-[26%] bottom-[0%] h-[60%] w-[48%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(132,96,228,0.28),rgba(160,130,236,0.10)_58%,transparent_100%)] blur-[95px]" />

      {/* paper scrim through the middle so the headline keeps full contrast
          over all of it */}
      <div className="absolute inset-x-[8%] top-[16%] h-[68%] bg-[radial-gradient(62%_58%_at_50%_50%,rgba(252,251,249,0.8),transparent_74%)]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Three pillars — each links to its own page                          */
/* ------------------------------------------------------------------ */

export function Pillars() {
  return (
    <Section tone="surface">
      {/* The three cards below already make the argument the old subheading was
          making, so it went. What is left is the claim itself, centred. */}
      <SectionHead
        label="Why it is different"
        animateTitle="Not a chatbot. An operating layer."
        align="center"
      />
      <PillarCards />
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Product moment                                                      */
/* ------------------------------------------------------------------ */

export function ProductMoment() {
  return (
    <Section tone="veil" size="lg">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-20">
        <SectionHead
          label="The product"
          title="The website explains it. The desktop app is it."
          body="Confidential work happens inside a desktop application installed on machines in your network — not in a browser upload form, and not in a tenant somewhere else."
        >
          <TextLink href="/platform">Explore the workbench</TextLink>
        </SectionHead>

        <ProductFacts />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Sovereignty teaser                                                  */
/* ------------------------------------------------------------------ */

export function SovereigntyTeaser() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-8 md:py-32">
      <SovereigntyBackdrop />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-16">
          <Reveal delay={0.05} className="relative">
            {/* the sweep is centred on the panel, so the rings read as this
                object watching its perimeter rather than as page decoration */}
            <PerimeterRings />
            <div className="relative">
              <SovereigntyMonitor compact />
            </div>
          </Reveal>

          <SectionHead
            label="Sovereignty"
            animateTitle="Don't trust the claim. Verify the boundary."
            body="Security here is not a promise on a slide — it is an observable property of the system. The workbench shows you the perimeter and counts every attempt to cross it."
            className="relative lg:order-first"
          >
            <TextLink href="/security">See how it is enforced</TextLink>
          </SectionHead>
        </div>
      </div>
    </section>
  );
}

/**
 * Three rings leaving the panel on one long cycle, a third of a turn apart.
 *
 * Green leads because it is the tone this site uses for anything verified, and
 * a boundary reporting zero crossings is the most verified thing on the page.
 */
function PerimeterRings() {
  const rings = [
    { size: "150%", colour: "rgba(21,160,92,0.42)", delay: "0s" },
    { size: "150%", colour: "rgba(35,56,204,0.32)", delay: "2.9s" },
    { size: "150%", colour: "rgba(138,108,226,0.28)", delay: "5.8s" },
  ];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {rings.map((r, i) => (
        <div
          key={i}
          className="ring-pulse absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[36px]"
          style={{
            width: r.size,
            height: r.size,
            boxShadow: `inset 0 0 0 1.5px ${r.colour}`,
            animationDuration: "8.7s",
            animationDelay: r.delay,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Green, blue and violet drifting behind the section — the same three the rings
 * use, so the wash and the sweep are one system rather than two effects sharing
 * a section.
 *
 * Full-bleed and radially masked, with a paper scrim across the copy side: the
 * headline sits on this, and the dark monitor sits over it, so it has to stay
 * quiet enough for both.
 */
function SovereigntyBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 h-full w-screen max-w-[100vw] -translate-x-1/2 [mask-image:radial-gradient(86%_82%_at_50%_50%,#000_28%,transparent_100%)]"
    >
      <div className="grid-paper absolute inset-0 opacity-45" />

      <div className="drift-a absolute right-[4%] top-[2%] h-[76%] w-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(30,168,110,0.30),rgba(110,206,164,0.11)_56%,transparent_100%)] blur-[90px]" />
      <div className="drift-b absolute left-[2%] top-[16%] h-[80%] w-[50%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(88,114,246,0.32),rgba(142,166,250,0.12)_56%,transparent_100%)] blur-[95px]" />
      <div className="drift-c absolute bottom-[-6%] left-[30%] h-[62%] w-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(132,96,228,0.24),rgba(160,130,236,0.09)_58%,transparent_100%)] blur-[100px]" />

      <div className="absolute inset-y-[10%] left-[4%] w-[52%] bg-[radial-gradient(62%_60%_at_40%_50%,rgba(252,251,249,0.82),transparent_74%)]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Solutions teaser                                                    */
/* ------------------------------------------------------------------ */

const TEASERS = [
  { domain: "Refinery operations", outcome: "Inspection scan → approval note" },
  { domain: "Engineering", outcome: "Drawing → calculation → verified report" },
  { domain: "Maintenance", outcome: "Field report → SOP → recommendation" },
  { domain: "Compliance", outcome: "Standards → evidence → audit report" },
];

export function SolutionsTeaser() {
  return (
    <Section tone="surface">
      <SectionHead
        label="Solutions"
        title="Built for work that matters."
        body="Every workflow starts with a document that could not have been uploaded anywhere, and ends with a file someone can sign."
      >
        <TextLink href="/solutions">All use cases</TextLink>
      </SectionHead>

      <RevealGroup className="mt-14 border-t border-line" stagger={0.05}>
        {TEASERS.map((t) => (
          <RevealItem key={t.domain}>
            <Link
              href="/solutions"
              className="group flex flex-col gap-2 border-b border-line py-7 transition-colors sm:flex-row sm:items-center sm:justify-between"
            >
              <p className="display-sm text-[19px] transition-colors group-hover:text-accent">
                {t.domain}
              </p>
              <p className="text-[14px] text-body">{t.outcome}</p>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
