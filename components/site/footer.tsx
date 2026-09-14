import Link from "next/link";
import { Logomark } from "./nav";

const REPO = "https://github.com/Abhisingh18/SIH-26-marketing-site";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#features" },
      { label: "Features", href: "/#features" },
      { label: "Platform", href: "/platform" },
      { label: "Download", href: "/demo" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "Security", href: "/security" },
      { label: "Architecture", href: "/architecture" },
      { label: "GitHub", href: REPO },
      { label: "Request a demo", href: "/demo" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-paper px-6 pb-10 pt-24 sm:px-8">
      {/* the blueprint grid surfaces one last time under the foot of the page */}
      <div
        aria-hidden
        className="grid-paper pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(130%_90%_at_50%_120%,#000,transparent_70%)]"
      />

      <div className="relative mx-auto w-full max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link href="/" className="group flex w-fit items-center gap-2.5" aria-label="Pragyan home">
              <Logomark className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-px" />
              <span className="text-[16px] font-medium tracking-[-0.015em] text-ink">
                Pragyan
              </span>
            </Link>
            <p className="mt-5 max-w-[260px] text-[14px] leading-[1.6] text-body">
              Confidential work stays inside your network.
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

        {/* the name at wall size, in the pixel face, held low-contrast so it
            reads as a watermark the page is printed on rather than a headline */}
        <p
          aria-hidden
          className="pointer-events-none mt-16 select-none text-center font-[family-name:var(--font-pixel)] text-[clamp(3.5rem,18vw,15rem)] leading-[0.8] tracking-[0.02em] text-line-2/70"
        >
          PRAGYAN
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-line pt-7 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="label">© 2026 Pragyan</p>
          <p className="label">Smart India Hackathon 2026</p>
          <a
            href={REPO}
            className="label transition-colors duration-300 hover:text-ink"
          >
            github.com/Abhisingh18/SIH-26-marketing-site
          </a>
        </div>
      </div>
    </footer>
  );
}
