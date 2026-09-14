import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
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
      <Statement />
      <Features />
      <ProductMoment />
      <SovereigntyTeaser />
      <SolutionsTeaser />
      <CTA />
    </>
  );
}
