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
    <footer className="relative overflow-hidden border-t border-line bg-paper px-6 pb-12 pt-24 sm:px-8">
      {/* The grid the rest of the site is drawn on, surfacing one last time at
          the foot of the page and fading out before the fine print. */}
      <div
        aria-hidden
        className="grid-paper pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(120%_80%_at_50%_0%,#000_5%,transparent_65%)]"
      />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="grid gap-14 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div>
            <Link href="/" className="group flex w-fit items-center gap-2.5" aria-label="Sangam home">
              <Logomark className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-px" />
              <span className="text-[15.5px] font-medium tracking-[-0.015em] text-ink">
                Sangam
              </span>
            </Link>
            <p className="mt-6 max-w-[270px] text-[14px] leading-[1.6] text-body">
              Private intelligence infrastructure — an on-premise agentic AI workbench for
              confidential industrial work.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="label mb-6">{col.title}</p>
              <ul className="space-y-3.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="link-underline inline-block text-[14px] text-body transition-colors duration-300 hover:text-ink"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* The name is the argument, so the page closes on it in the display
            serif rather than trailing off in a column of links. */}
        <p className="display mt-24 max-w-[30ch] text-[clamp(1.3rem,2.6vw,1.85rem)]">
          Sangam{" "}
          <span className="text-muted">
            — a confluence. Models, knowledge and tools meeting in one place, inside your
            perimeter.
          </span>
        </p>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="label">© 2026 Sangam</p>
          <p className="label">Designed for confidential industrial environments</p>
        </div>
      </div>
    </footer>
  );
}
