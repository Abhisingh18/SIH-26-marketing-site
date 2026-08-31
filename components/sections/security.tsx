import { Workbench } from "@/components/mock/workbench";
import { LiveDot, Node } from "@/components/ui/primitives";
import { Down } from "@/components/ui/diagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { Section, SectionHead } from "@/components/ui/section";

/* ------------------------------------------------------------------ */
/* Sovereignty                                                         */
/* ------------------------------------------------------------------ */

const COUNTERS = [
  { label: "External API calls", value: "00" },
  { label: "Cloud AI requests", value: "00" },
  { label: "Outbound connections", value: "00" },
  { label: "Data uploads", value: "00" },
];

const SERVICES = [
  { label: "Local LLM", state: "Online" },
  { label: "Local VLM", state: "Online" },
  { label: "Local RAG", state: "Online" },
  { label: "Local OCR", state: "Online" },
  { label: "Sandbox", state: "Secure" },
];

const CONTROLS = [
  { title: "Air-gapped deployment", body: "Runs with no outbound route at all." },
  { title: "Role-based access", body: "Control who can reach which models and documents." },
  { title: "Audit trail", body: "Every agent action and tool call is recorded." },
  { title: "Sandboxed execution", body: "Generated code runs in an isolated container." },
  { title: "Encryption at rest", body: "Indexes and artifacts stay encrypted on disk." },
  { title: "Open weights", body: "Inspect, swap or pin the models you run." },
];

export function Security() {
  return (
    <Section id="security" tone="surface">
      <SectionHead
        eyebrow="Sovereignty"
        title="Sovereignty you can verify."
        sub="Security here is not a promise on a slide. It is an observable property of the system — the workbench shows you the boundary and counts every crossing."
        align="center"
      />

      <div className="mt-16 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <Reveal>
          <div className="relative h-full overflow-hidden rounded-[18px] border border-line bg-ink p-7 sm:p-8">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-paper/[0.06] to-transparent" />
            <div className="relative flex items-center justify-between">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-paper/45">
                Sovereignty Monitor
              </p>
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
                <LiveDot />
                Live
              </span>
            </div>

            <dl className="relative mt-8 space-y-px overflow-hidden rounded-[12px] border border-paper/10">
              {COUNTERS.map((c) => (
                <div
                  key={c.label}
                  className="flex items-baseline justify-between bg-paper/[0.03] px-4 py-3.5"
                >
                  <dt className="text-[13.5px] text-paper/70">{c.label}</dt>
                  <dd className="font-mono text-[22px] leading-none tracking-tight text-paper">
                    {c.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="relative mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-paper/35">
              Since deployment · 47 days
            </p>

            <ul className="relative mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {SERVICES.map((s) => (
                <li
                  key={s.label}
                  className="rounded-[10px] border border-paper/10 bg-paper/[0.03] px-3 py-2.5"
                >
                  <p className="text-[12.5px] text-paper/85">{s.label}</p>
                  <p className="mt-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-signal">
                    <span className="h-1 w-1 rounded-full bg-signal" />
                    {s.state}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex h-full flex-col rounded-[18px] border border-line bg-paper/60 p-7 sm:p-8">
            <p className="eyebrow">The boundary</p>
            <div className="mt-8 flex flex-col items-center">
              {["Your data", "Your hardware", "Your models", "Your output"].map((l, i, arr) => (
                <div key={l} className="flex w-full flex-col items-center">
                  <Node
                    tone={i === arr.length - 1 ? "ink" : "default"}
                    className="w-full max-w-[240px]"
                  >
                    {l}
                  </Node>
                  {i < arr.length - 1 ? <Down height={20} /> : null}
                </div>
              ))}
            </div>
            <p className="mt-9 text-center text-[15px] leading-relaxed text-ink">
              Don&rsquo;t trust the claim.
              <br />
              <span className="text-muted">Verify the boundary.</span>
            </p>
          </div>
        </Reveal>
      </div>

      <RevealGroup className="mt-4 grid gap-px overflow-hidden rounded-[18px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {CONTROLS.map((c) => (
          <RevealItem key={c.title} className="bg-surface">
            <div className="h-full p-6 transition-colors duration-300 hover:bg-paper">
              <p className="text-[14.5px] font-medium text-ink">{c.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{c.body}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Desktop app showcase                                                */
/* ------------------------------------------------------------------ */

export function Showcase() {
  return (
    <Section tone="paper">
      <SectionHead
        eyebrow="The product"
        title="Meet your new AI workbench."
        sub="The website explains the platform. This is the platform — a desktop application installed inside your network, where the confidential work actually happens."
        align="center"
      />

      <Reveal delay={0.1} y={26} className="mt-16">
        <Workbench />
      </Reveal>

      <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-3">
        {[
          {
            t: "Installed, not accessed",
            b: "A desktop client on managed machines — no browser upload, no tenant, no account.",
          },
          {
            t: "Runs against your GPU",
            b: "Points at a workstation card or a shared on-premise inference server.",
          },
          {
            t: "Works offline",
            b: "Once models are staged, the application needs no network route to function.",
          },
        ].map((c) => (
          <RevealItem key={c.t}>
            <p className="text-[14.5px] font-medium text-ink">{c.t}</p>
            <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{c.b}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
