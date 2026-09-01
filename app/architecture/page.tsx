import type { Metadata } from "next";
import { PageHero } from "@/components/ui/section";
import {
  Deployment,
  Layers,
  Principles,
  Stack,
} from "@/components/sections/architecture";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "A modular on-premise AI stack: desktop client, agent harness, model orchestrator, local RAG and sandboxed tools — each layer replaceable, none of them dependent on the internet.",
};

export default function ArchitecturePage() {
  return (
    <>
      <PageHero
        label="Architecture"
        title="Designed as infrastructure, not as an app feature."
        body="A layered stack you can reason about, audit and replace piece by piece — built on open-source components and open-weight models running on hardware you own."
        meta={["Modular", "Open-weight", "Offline first", "Auditable"]}
      />
      <Layers />
      <Principles />
      <Stack />
      <Deployment />
      <CTA
        title="Deploy it against your own stack."
        body="Tell us what hardware and document stores you already run, and we will map the workbench onto them."
        primary={{ href: "/demo", label: "Request a demo" }}
        secondary={{ href: "/platform", label: "See the platform" }}
      />
    </>
  );
}
