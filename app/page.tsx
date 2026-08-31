import { Hero } from "@/components/sections/hero";
import { BigStatement, Problem, TrustBar } from "@/components/sections/narrative";
import { Platform, Solution } from "@/components/sections/solution";
import { Agentic, Deliverables } from "@/components/sections/agentic";
import { Knowledge, MultiModel, Multimodal } from "@/components/sections/intelligence";
import { Security, Showcase } from "@/components/sections/security";
import {
  Architecture,
  CTA,
  Deployment,
  UseCases,
} from "@/components/sections/enterprise";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <BigStatement />
      <Problem />
      <Solution />
      <Platform />
      <Agentic />
      <MultiModel />
      <Multimodal />
      <Knowledge />
      <Security />
      <Showcase />
      <UseCases />
      <Deliverables />
      <Architecture />
      <Deployment />
      <CTA />
    </>
  );
}
