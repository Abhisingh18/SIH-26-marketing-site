import { cn } from "@/lib/utils";
import { LiveDot } from "@/components/ui/primitives";

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
  { label: "Audit log", state: "Writing" },
];

export function SovereigntyMonitor({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] bg-obsidian p-7 shadow-e3 sm:p-9",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/[0.05] to-transparent" />

      <div className="relative flex items-center justify-between">
        <p className="label text-white/40">Sovereignty Monitor</p>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-signal">
          <LiveDot />
          Live
        </span>
      </div>

      <dl className="relative mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] bg-white/[0.06]">
        {COUNTERS.map((c) => (
          <div key={c.label} className="bg-obsidian px-5 py-6">
            <dd className="font-mono text-[34px] leading-none tracking-[-0.03em] text-paper">
              {c.value}
            </dd>
            <dt className="mt-3 text-[12.5px] leading-snug text-paper/50">{c.label}</dt>
          </div>
        ))}
      </dl>

      <p className="label relative mt-4 text-white/30">Since deployment · 47 days</p>

      {!compact ? (
        <ul className="relative mt-9 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {SERVICES.map((s) => (
            <li key={s.label} className="rounded-[11px] bg-white/[0.04] px-3.5 py-3">
              <p className="text-[12.5px] text-paper/85">{s.label}</p>
              <p className="mt-1.5 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-signal">
                <span className="h-1 w-1 rounded-full bg-signal" />
                {s.state}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
