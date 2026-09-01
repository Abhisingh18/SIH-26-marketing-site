import { SovereigntyMonitor } from "@/components/mock/monitor";
import { Panel } from "@/components/ui/primitives";
import { Down, Node } from "@/components/ui/diagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";

/* ------------------------------------------------------------------ */
/* The boundary                                                        */
/* ------------------------------------------------------------------ */

const CHAIN = [
  { label: "Your data", meta: "documents never copied out" },
  { label: "Your hardware", meta: "workstation or on-prem GPU" },
  { label: "Your models", meta: "open weights you can inspect" },
  { label: "Your output", meta: "files written to your disk" },
];

export function Boundary() {
  return (
    <Section tone="surface">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16">
        <SectionHead
          label="The boundary"
          title="Private by architecture, not by policy."
          body="There is no setting to switch off and no vendor promise to audit. The application has no cloud dependency, so there is no path for a document to leave — even by mistake."
        />

        <Reveal delay={0.1}>
          <Panel className="px-6 py-12 sm:px-10">
            <div className="mx-auto flex max-w-[320px] flex-col items-center">
              {CHAIN.map((c, i) => (
                <div key={c.label} className="flex w-full flex-col items-center">
                  <Node
                    tone={i === CHAIN.length - 1 ? "ink" : "default"}
                    meta={c.meta}
                    className="w-full"
                  >
                    {c.label}
                  </Node>
                  {i < CHAIN.length - 1 ? <Down height={22} /> : null}
                </div>
              ))}
            </div>
          </Panel>
        </Reveal>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Monitor                                                             */
/* ------------------------------------------------------------------ */

export function Monitor() {
  return (
    <Section>
      <SectionHead
        label="Sovereignty monitor"
        title="Don't trust the claim. Verify the boundary."
        body="The workbench ships with a monitor that counts every outbound attempt and reports the health of each local service. If a number ever moves off zero, you will know before anyone else does."
        align="center"
      />
      <Reveal delay={0.1} className="mt-16">
        <SovereigntyMonitor />
      </Reveal>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Controls                                                            */
/* ------------------------------------------------------------------ */

const CONTROLS = [
  {
    title: "Air-gapped deployment",
    body: "Runs with no outbound route at all. Models and updates are staged through controlled media.",
  },
  {
    title: "Role-based access",
    body: "Control which teams can reach which models, tools and document collections.",
  },
  {
    title: "Full audit trail",
    body: "Every prompt, retrieval, tool call and generated file is recorded and exportable.",
  },
  {
    title: "Sandboxed execution",
    body: "Generated code runs in an isolated container with no network and a scoped filesystem.",
  },
  {
    title: "Encryption at rest",
    body: "Document stores, vector indexes and artifacts stay encrypted on local disk.",
  },
  {
    title: "Inspectable weights",
    body: "Open-weight models you can pin, review and replace — no opaque hosted endpoint.",
  },
];

export function Controls() {
  return (
    <Section tone="veil">
      <SectionHead
        label="Controls"
        title="The guarantees your security team will ask about."
      />

      <RevealGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CONTROLS.map((c) => (
          <RevealItem key={c.title}>
            <Panel hover className="h-full p-7">
              <p className="text-[15.5px] font-medium tracking-[-0.01em] text-ink">{c.title}</p>
              <p className="mt-3 text-[13.5px] leading-[1.6] text-body">{c.body}</p>
            </Panel>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
