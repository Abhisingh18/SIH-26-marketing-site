"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check, Loader2, Lock } from "lucide-react";
import { Panel } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

const INTERESTS = [
  "Refinery operations",
  "Engineering analysis",
  "Maintenance",
  "Compliance",
  "Internal development",
  "Evaluating for the org",
];

const DEPLOYMENTS = ["Workstation", "On-premise server", "Air-gapped", "Not sure yet"];

/**
 * Fields sit in a well and lift to surface on focus — the same elevation-over-
 * borders move the rest of the site makes, so the active field is the one that
 * looks nearest rather than the one with the heaviest outline.
 */
const FIELD =
  "w-full rounded-[12px] bg-veil px-4 text-[14.5px] text-ink outline-none ring-1 ring-line transition-all duration-300 placeholder:text-muted hover:ring-line-2 focus:bg-surface focus:shadow-e2 focus:ring-[1.5px] focus:ring-accent";

type Status = "idle" | "sending" | "sent";

export function DemoForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [deployment, setDeployment] = useState(DEPLOYMENTS[0]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    // TODO: point this at your intake endpoint (form service, CRM or /api route).
    // Deliberately no document upload here — confidential files belong in the
    // desktop application, never on the marketing site.
    await new Promise((r) => setTimeout(r, 700));
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <Panel className="p-10 text-center sm:p-12">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-signal/12 text-signal">
          <Check className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <h2 className="display-sm mt-7 text-[22px]">Request received.</h2>
        <p className="measure mx-auto mt-4 text-[14.5px] leading-[1.6] text-body">
          We will reply within two working days with a proposed scope and the hardware you
          would need for a pilot.
        </p>
      </Panel>
    );
  }

  return (
    <Panel className="p-7 sm:p-9">
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" name="name" placeholder="Your name" required />
          <Field label="Work email" name="email" type="email" placeholder="you@org.in" required />
          <Field label="Organization" name="org" placeholder="Company or department" required />
          <Field label="Role" name="role" placeholder="Engineer, IT, security…" />
        </div>

        <Choice
          legend="Primary interest"
          name="interest"
          options={INTERESTS}
          value={interest}
          onChange={setInterest}
        />
        <Choice
          legend="Deployment target"
          name="deployment"
          options={DEPLOYMENTS}
          value={deployment}
          onChange={setDeployment}
        />

        <div>
          <label htmlFor="notes" className="label">
            What would you want it to do first?
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            placeholder="e.g. turn scanned inspection reports into approval notes"
            className={cn(FIELD, "mt-3 resize-none py-3.5 leading-[1.55]")}
          />
        </div>

        {/* The one claim on this page the form itself has to keep, so it is
            given a surface of its own rather than left as fine print. */}
        <p className="flex gap-3 rounded-[12px] bg-veil px-4 py-3.5 text-[12.5px] leading-relaxed text-muted">
          <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} aria-hidden />
          <span>
            Please don&rsquo;t attach confidential documents here. Sensitive material stays
            inside the desktop application on your own infrastructure.
          </span>
        </p>

        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[15px] font-medium text-paper shadow-e1 outline-none transition-all duration-300 hover:bg-accent hover:shadow-e2 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-60"
        >
          {status === "sending" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2} />
              Sending
            </>
          ) : (
            <>
              Request demo
              <ArrowRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </>
          )}
        </button>
      </form>
    </Panel>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={cn(FIELD, "mt-3 h-12")}
      />
    </div>
  );
}

function Choice({
  legend,
  name,
  options,
  value,
  onChange,
}: {
  legend: string;
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="label">{legend}</legend>
      {/* The pills are buttons, so the selection would otherwise be invisible to
          whoever wires the endpoint up. */}
      <input type="hidden" name={name} value={value} />
      <div className="mt-3.5 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={cn(
              "rounded-full px-4 py-2 text-[13.5px] outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
              value === o
                ? "bg-ink text-paper shadow-e2"
                : "bg-veil text-body ring-1 ring-line hover:bg-surface hover:text-ink hover:shadow-e1 hover:ring-line-2",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
