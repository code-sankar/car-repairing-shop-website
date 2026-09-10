import useSeo from "../hooks/useSeo";
import { services } from "../lib/data/services";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import ServiceCard from "../components/ui/ServiceCard";
import Reveal from "../components/ui/Reveal";
import Process from "../components/sections/Process";
import CTABand from "../components/sections/CTABand";
import FAQ from "../components/sections/FAQ";
import { faqs } from "../lib/data/content";

export default function Services() {
  useSeo({
    title: "Car Services",
    description:
      "Twelve service lines under one roof: periodic servicing, engine diagnostics, brakes, AC, denting and painting, alignment, detailing and 24/7 roadside assistance.",
  });

  return (
    <>
      <PageHero
        eyebrow="Service catalogue"
        title={<>Twelve ways we<br />keep you moving</>}
        lead="Every line below is quoted before the work starts and carries the same 12-month warranty on parts and labour."
        crumbs={[{ label: "Services" }]}
      />

      <Section tone="dark">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={(i % 3) * 0.08} amount={0.1}>
              <ServiceCard service={service} className="h-full" />
            </Reveal>
          ))}
        </div>
      </Section>

      <Process />
      <FAQ items={faqs.slice(0, 5)} />
      <CTABand />
    </>
  );
}
