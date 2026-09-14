import { Hero } from "@/components/sections/hero";
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
      <ProductMoment />
      <SovereigntyTeaser />
      <SolutionsTeaser />
      <CTA />
    </>
  );
}
