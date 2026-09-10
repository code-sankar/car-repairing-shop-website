import { ArrowRight } from "lucide-react";
import { featuredServices } from "../../lib/data/services";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import ServiceCard from "../ui/ServiceCard";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import { Glow } from "../art/Texture";

export default function ServicesPreview() {
  return (
    <Section
      id="services"
      tone="dark"
      backdrop={<Glow className="-right-40 top-10" size={560} opacity={0.13} />}
    >

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="What we do"
          title={<>Everything your car needs,<br />under one roof</>}
          lead="Twelve service lines, one job card, one point of contact. Every one of them quoted before the work starts."
        />
        <Reveal delay={0.2} className="shrink-0">
          <Button to="/services" variant="outline" size="md">
            All 12 services <ArrowRight size={17} />
          </Button>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredServices.map((service, i) => (
          <Reveal key={service.slug} delay={(i % 3) * 0.09} amount={0.15}>
            <ServiceCard service={service} className="h-full" />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
