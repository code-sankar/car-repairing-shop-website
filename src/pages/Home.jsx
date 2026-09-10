import useSeo from "../hooks/useSeo";
import Hero from "../components/sections/Hero";
import StatsBand from "../components/sections/StatsBand";
import BrandMarquee from "../components/sections/BrandMarquee";
import ServicesPreview from "../components/sections/ServicesPreview";
import WhyUs from "../components/sections/WhyUs";
import Inspection from "../components/sections/Inspection";
import Workshop from "../components/sections/Workshop";
import Process from "../components/sections/Process";
import Estimate from "../components/sections/Estimate";
import Testimonials from "../components/sections/Testimonials";
import Team from "../components/sections/Team";
import FAQ from "../components/sections/FAQ";
import CTABand from "../components/sections/CTABand";

export default function Home() {
  useSeo({
    title: "Car Service & Repair Garage",
    description:
      "Multi-brand car service and repair in Guwahati. Transparent fixed-price quotes, genuine OEM parts, free pickup and drop, and a 12-month workmanship warranty.",
  });

  return (
    <>
      <Hero />
      <StatsBand />
      <BrandMarquee />
      <ServicesPreview />
      <WhyUs />
      <Inspection />
      <Workshop />
      <Process />
      <Estimate />
      <Testimonials />
      <Team />
      <FAQ />
      <CTABand />
    </>
  );
}
