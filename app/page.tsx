import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Download } from "@/components/sections/download";
import {
  ProductMoment,
  SolutionsTeaser,
  SovereigntyTeaser,
  Statement,
} from "@/components/sections/home";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Statement />
      <Features />
      <Download />
      <ProductMoment />
      <SovereigntyTeaser />
      <SolutionsTeaser />
      <CTA />
    </>
  );
}
