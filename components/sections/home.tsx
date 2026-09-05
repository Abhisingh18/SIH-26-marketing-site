import Link from "next/link";
import { ArrowUpRight, Bot, Layers, ShieldCheck } from "lucide-react";
import { SovereigntyMonitor } from "@/components/mock/monitor";
import { Panel, TextLink } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";
import { WordRise } from "@/components/ui/word-rise";

/* ------------------------------------------------------------------ */
/* Editorial statement                                                 */
/* ------------------------------------------------------------------ */

export function Statement() {
  return (
    <section className="relative overflow-hidden px-6 py-28 sm:px-8 md:py-40">
      <StatementBackdrop />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <h2 className="display mx-auto max-w-[19ch] text-center text-[clamp(2rem,5vw,3.6rem)]">
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
          <p className="mx-auto mt-12 max-w-[52ch] text-balance text-center text-[16.5px] leading-[1.65] text-body">
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
      className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(80%_75%_at_50%_50%,#000_35%,transparent_100%)]"
    >
      <div className="grid-paper absolute inset-0 opacity-60" />
      <div className="drift-a absolute left-[6%] top-[8%] h-[62%] w-[42%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(240,158,88,0.20),transparent_100%)] blur-[90px]" />
      <div className="drift-b absolute right-[4%] top-[22%] h-[70%] w-[46%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(126,150,246,0.24),transparent_100%)] blur-[95px]" />
      <div className="drift-c absolute left-[28%] bottom-[2%] h-[56%] w-[44%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(138,108,226,0.16),transparent_100%)] blur-[100px]" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Three pillars — each links to its own page                          */
/* ------------------------------------------------------------------ */

const PILLARS = [
  {
    icon: Bot,
    label: "Platform",
    title: "It does the work, not just the talking",
    body: "Plans a task, reads your documents, routes each step to the right local model, runs the tools and hands back a finished file.",
    href: "/platform",
    cta: "See the platform",
  },
  {
    icon: ShieldCheck,
    label: "Security",
    title: "Sovereignty you can verify",
    body: "Every crossing of the boundary is counted, every agent action is logged, and the whole system runs with no outbound route.",
    href: "/security",
    cta: "See the security model",
  },
  {
    icon: Layers,
    label: "Architecture",
    title: "Open weights, modular layers",
    body: "Swap the model, the vector store or the serving runtime without rewriting the workbench sitting on top of them.",
    href: "/architecture",
    cta: "See the architecture",
  },
];

export function Pillars() {
  return (
    <Section tone="surface">
      <SectionHead
        label="Why it is different"
        animateTitle="Not another chatbot. An AI operating layer for industrial work."
        body="Three things separate a sovereign workbench from a browser tab with a text box."
      />

      <RevealGroup className="mt-16 grid gap-4 lg:grid-cols-3">
        {PILLARS.map(({ icon: Icon, label, title, body, href, cta }) => (
          <RevealItem key={label}>
            <Link href={href} className="group block h-full">
              <Panel hover className="flex h-full flex-col p-8">
                <div className="flex items-center justify-between">
                  <Icon className="h-5 w-5 text-accent" strokeWidth={1.6} />
                  <ArrowUpRight
                    className="h-4 w-4 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                    strokeWidth={1.75}
                  />
                </div>
                <p className="label mt-12">{label}</p>
                <h3 className="display-sm mt-3 text-[21px]">{title}</h3>
                <p className="mt-4 text-[14.5px] leading-[1.6] text-body">{body}</p>
                <span className="mt-8 text-[13.5px] font-medium text-ink transition-colors group-hover:text-accent">
                  {cta}
                </span>
              </Panel>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Product moment                                                      */
/* ------------------------------------------------------------------ */

const PRODUCT_FACTS = [
  {
    n: "01",
    title: "Installed, not accessed",
    body: "A desktop client on managed machines — no browser upload, no tenant, no account with anyone else.",
  },
  {
    n: "02",
    title: "Runs against your GPU",
    body: "Points at a workstation card or a shared on-premise inference server behind your firewall.",
  },
  {
    n: "03",
    title: "Works offline",
    body: "Once models are staged, the application needs no network route to do its job.",
  },
];

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

        <RevealGroup className="border-t border-line">
          {PRODUCT_FACTS.map((f) => (
            <RevealItem key={f.n}>
              <div className="flex gap-6 border-b border-line py-7">
                <span className="font-mono text-[11px] tracking-[0.14em] text-muted">{f.n}</span>
                <div>
                  <p className="text-[16px] font-medium tracking-[-0.01em] text-ink">{f.title}</p>
                  <p className="mt-2 text-[14px] leading-[1.6] text-body">{f.body}</p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Sovereignty teaser                                                  */
/* ------------------------------------------------------------------ */

export function SovereigntyTeaser() {
  return (
    <Section>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-center lg:gap-16">
        <Reveal delay={0.05}>
          <SovereigntyMonitor compact />
        </Reveal>

        <SectionHead
          label="Sovereignty"
          title="Don't trust the claim. Verify the boundary."
          body="Security here is not a promise on a slide — it is an observable property of the system. The workbench shows you the perimeter and counts every attempt to cross it."
          className="lg:order-first"
        >
          <TextLink href="/security">See how it is enforced</TextLink>
        </SectionHead>
      </div>
    </Section>
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
