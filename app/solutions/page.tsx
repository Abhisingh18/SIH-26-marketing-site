import type { Metadata } from "next";
import { PageHero } from "@/components/ui/section";
import { SolutionsWash, SolutionsWave } from "@/components/sections/solutions-wave";
import { Flourish } from "@/components/ui/flourish";
import { Problem, Sectors, UseCases } from "@/components/sections/solutions";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Refinery operations, engineering, maintenance, management, internal development and compliance workflows — run entirely on documents that cannot leave your network.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        label="Solutions"
        animateTitle="Real workflows, not demos."
        align="center"
        ornament={<Flourish variant="ink" className="w-[130px] sm:w-[148px]" />}
        body="Six industrial workflows where the bottleneck is not intelligence but access — documents too sensitive to upload, and too slow to process by hand."
        meta={["Operations", "Engineering", "Maintenance", "Compliance"]}
        backdrop={<SolutionsWash />}
        art={<SolutionsWave />}
      />
      <Problem />
      <UseCases />
      <Sectors />
      <CTA
        title="Start with one workflow."
        body="Pick the process that costs your team the most hours today. We will show it running end to end on your own hardware."
        primary={{ href: "/demo", label: "Request a demo" }}
        secondary={{ href: "/platform", label: "See the platform" }}
      />
    </>
  );
}
