import Link from "next/link";
import { ArrowUpRight, Bot, Layers, ShieldCheck } from "lucide-react";
import { SovereigntyMonitor } from "@/components/mock/monitor";
import { Label, Panel, TextLink } from "@/components/ui/primitives";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";

/* ------------------------------------------------------------------ */
/* Trust strip                                                         */
/* ------------------------------------------------------------------ */

const DOCS = ["P&IDs", "SOPs", "Inspection reports", "Engineering data", "Financials"];

export function TrustStrip() {
  return (
    <div className="border-y border-line bg-surface px-6 py-7 sm:px-8">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-5 text-center md:flex-row md:justify-between md:text-left">
        <Label className="max-w-[200px]">Designed for confidential industrial work</Label>
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {DOCS.map((d) => (
            <li key={d} className="text-[13.5px] text-body">
              {d}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Editorial statement                                                 */
/* ------------------------------------------------------------------ */

export function Statement() {
  return (
    <Section size="lg">
      <Reveal>
        <h2 className="display mx-auto max-w-[19ch] text-center text-[clamp(2rem,5vw,3.6rem)]">
          The most valuable AI is the one you can{" "}
          <span className="text-muted">trust with your most valuable data.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mx-auto mt-10 max-w-[52ch] text-center text-[16.5px] leading-[1.65] text-body">
          Refineries, plants and engineering teams already hold the information AI is best at
          using. The problem was never capability — it was custody.
        </p>
      </Reveal>
    </Section>
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
        title="Not another chatbot. An AI operating layer for industrial work."
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
