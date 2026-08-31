import Link from "next/link";
import { Logomark } from "./nav";

const COLUMNS = [
  {
    title: "Platform",
    links: ["Agentic Workflows", "Multi-Model Routing", "Multimodal Understanding", "Private Knowledge"],
  },
  {
    title: "Solutions",
    links: ["Refinery Operations", "Engineering", "Maintenance", "Compliance"],
  },
  {
    title: "Company",
    links: ["Security", "Architecture", "Documentation", "Contact"],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-5 py-16 sm:px-8">
      <div className="mx-auto w-full max-w-[1180px]">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logomark />
              <span className="text-[15px] font-medium text-ink">Sovereign</span>
            </div>
            <p className="mt-4 max-w-[280px] text-[13.5px] leading-relaxed text-muted">
              Private intelligence infrastructure. An on-premise agentic AI workbench for
              confidential industrial work.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <Link
                      href="#"
                      className="text-[13.5px] text-ink-soft transition-colors hover:text-ink"
                    >
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            © 2026 Sovereign AI
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
            Designed for confidential industrial environments
          </p>
        </div>
      </div>
    </footer>
  );
}
