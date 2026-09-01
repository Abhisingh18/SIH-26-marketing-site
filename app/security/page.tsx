import type { Metadata } from "next";
import { PageHero } from "@/components/ui/section";
import { Boundary, Controls, Monitor } from "@/components/sections/security";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Sovereignty you can verify: zero external API calls, air-gapped deployment, sandboxed tool execution and a full audit trail — all observable from inside the workbench.",
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        label="Security"
        title="Sovereignty you can verify."
        body="Security here is not a claim on a slide. It is an observable property of the system — the workbench shows you where the perimeter is and counts every attempt to cross it."
        meta={["Air-gapped ready", "RBAC", "Audit logs", "Sandboxed", "Encrypted at rest"]}
      />
      <Boundary />
      <Monitor />
      <Controls />
      <CTA
        title="Bring your security team to the demo."
        body="We will walk through the network boundary, the audit trail and the sandbox with the people who have to sign off on it."
        primary={{ href: "/demo", label: "Request a demo" }}
        secondary={{ href: "/architecture", label: "See the architecture" }}
      />
    </>
  );
}
