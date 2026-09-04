import { Hero } from "@/components/sections/hero";
import {
  Pillars,
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
      <Statement />
      <Pillars />
      <ProductMoment />
      <SovereigntyTeaser />
      <SolutionsTeaser />
      <CTA />
    </>
  );
}
