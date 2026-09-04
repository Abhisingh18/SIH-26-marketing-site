import Link from "next/link";
import { Logomark } from "./nav";

const COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Overview", href: "/platform" },
      { label: "Agentic workflows", href: "/platform#agentic" },
      { label: "Model routing", href: "/platform#models" },
      { label: "Private knowledge", href: "/platform#knowledge" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "All use cases", href: "/solutions" },
      { label: "Refinery operations", href: "/solutions#operations" },
      { label: "Engineering", href: "/solutions#engineering" },
      { label: "Compliance", href: "/solutions#compliance" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Security", href: "/security" },
      { label: "Architecture", href: "/architecture" },
      { label: "Deployment", href: "/architecture#deployment" },
      { label: "Request demo", href: "/demo" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper px-6 pb-12 pt-20 sm:px-8">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="grid gap-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <Logomark />
              <span className="text-[15.5px] font-medium tracking-[-0.015em] text-ink">
                Sangam
              </span>
            </div>
            <p className="mt-5 max-w-[270px] text-[14px] leading-[1.6] text-body">
              Private intelligence infrastructure — an on-premise agentic AI workbench for
              confidential industrial work.
            </p>
            <p className="mt-4 max-w-[270px] text-[13px] leading-[1.6] text-muted">
              <span className="text-ink">Sangam</span> — a confluence. Models, knowledge and
              tools meeting in one place, inside your perimeter.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="label mb-5">{col.title}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[14px] text-body transition-colors duration-300 hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">© 2026 Sangam</p>
          <p className="label">Designed for confidential industrial environments</p>
        </div>
      </div>
    </footer>
  );
}
