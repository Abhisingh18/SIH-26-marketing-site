import type { Metadata } from "next";
import { PageHero } from "@/components/ui/section";
import {
  Agentic,
  Deliverables,
  Knowledge,
  ModelRouting,
  Multimodal,
} from "@/components/sections/platform";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "An agentic AI workbench that plans, retrieves, reasons, executes and verifies — routing every task to the right open-weight model running on your own hardware.",
};

export default function PlatformPage() {
  return (
    <>
      <PageHero
        label="Platform"
        title="One workbench. Every AI workflow."
        body="Agentic execution, multi-model routing, multimodal understanding and private knowledge — assembled into a single desktop application that runs inside your infrastructure."
        meta={["Agentic", "Multi-model", "Multimodal", "Local RAG", "Sandboxed tools"]}
      />
      <Agentic />
      <ModelRouting />
      <Multimodal />
      <Knowledge />
      <Deliverables />
      <CTA
        title="See it run on your own documents."
        body="We deploy a workbench against a sample of your data, on your hardware, and show you the sovereignty monitor while it works."
        primary={{ href: "/demo", label: "Request a demo" }}
        secondary={{ href: "/security", label: "How it stays private" }}
      />
    </>
  );
}
