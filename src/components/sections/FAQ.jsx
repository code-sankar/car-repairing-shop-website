import { MessageCircle, Phone } from "lucide-react";
import { faqs } from "../../lib/data/content";
import { site } from "../../lib/siteConfig";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Accordion from "../ui/Accordion";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";

export default function FAQ({ items = faqs }) {
  return (
    <Section tone="dark">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Straight answers"
            title={<>Common<br />questions</>}
            lead="If yours is not here, ring the workshop. A technician picks up, not a script."
          />

          <Reveal delay={0.24}>
            <div className="mt-9 rounded-2xl border border-white/8 bg-ink-900 p-6">
              <p className="font-display text-lg font-semibold text-white">Still not sure?</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-400">
                Send us the symptom and your car's make. We will tell you what it is likely to be,
                and what it should cost — before you commit to anything.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <Button href={site.phoneHref} size="sm">
                  <Phone size={16} /> {site.phone}
                </Button>
                <Button
                  href={`https://wa.me/${site.whatsapp}`}
                  variant="secondary"
                  size="sm"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <MessageCircle size={16} /> Ask on WhatsApp
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <Accordion items={items} />
        </div>
      </div>
    </Section>
  );
}
