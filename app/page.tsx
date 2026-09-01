import { Hero } from "@/components/sections/hero";
import {
  Pillars,
  ProductMoment,
  SolutionsTeaser,
  SovereigntyTeaser,
  Statement,
  TrustStrip,
} from "@/components/sections/home";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Statement />
      <Pillars />
      <ProductMoment />
      <SovereigntyTeaser />
      <SolutionsTeaser />
      <CTA />
    </>
  );
}
