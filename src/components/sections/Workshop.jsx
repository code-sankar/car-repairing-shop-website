import { ArrowRight } from "lucide-react";
import { site } from "../../lib/siteConfig";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import WorkshopScene from "../art/WorkshopScene";
import { Glow } from "../art/Texture";

const facilities = [
  { n: "06", label: "Service bays", detail: "Two on heavy-duty four-post lifts" },
  { n: "01", label: "Downdraft paint booth", detail: "Dust-controlled, with a bake cycle" },
  { n: "3D", label: "Camera wheel aligner", detail: "Printed before-and-after readings" },
  { n: "04", label: "Diagnostic benches", detail: "Launch and Autel, all makes" },
];

export default function Workshop() {
  return (
    <Section
      tone="dark"
      backdrop={<Glow className="-left-32 top-20" size={640} opacity={0.14} />}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="The floor"
            title={<>Six bays.<br />One standard.</>}
            lead={`Everything happens under this roof — diagnostics, mechanical, alignment and paint. Nothing gets sent out to a third party you never meet.`}
          />

          <Reveal delay={0.22}>
            <dl className="mt-9 space-y-5">
              {facilities.map((f) => (
                <div key={f.label} className="flex items-start gap-4">
                  <dt className="w-11 shrink-0 font-display text-2xl font-bold leading-none text-brand-400">
                    {f.n}
                  </dt>
                  <dd>
                    <span className="block font-semibold text-white">{f.label}</span>
                    <span className="block text-sm text-ink-400">{f.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.3}>
            <Button to="/about" variant="outline" className="mt-9">
              More about us <ArrowRight size={17} />
            </Button>
          </Reveal>
        </div>

        <Reveal direction="left" delay={0.12} className="lg:col-span-7">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-ink-900 to-ink-950 p-5 sm:p-8">
            <WorkshopScene className="text-ink-300" />
            <p className="mt-2 text-center text-xs text-ink-500">
              {site.address.line1}, {site.address.city} — open six days a week
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
