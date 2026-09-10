import { ArrowRight, LifeBuoy, Phone } from "lucide-react";
import { site } from "../../lib/siteConfig";
import Button from "../ui/Button";
import Reveal from "../ui/Reveal";
import { GridBackdrop, Glow } from "../art/Texture";
import TyreTrack from "../art/TyreTrack";

export default function CTABand() {
  return (
    <section className="noise relative overflow-hidden bg-ink-950 py-20 sm:py-24">
      <GridBackdrop />
      <Glow className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={820} opacity={0.16} />
      <TyreTrack className="absolute inset-x-0 top-16 text-brand-500/20" height={72} />
      <TyreTrack className="absolute inset-x-0 bottom-12 text-white/8" height={58} />

      <div className="shell relative z-10">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">
              <span aria-hidden="true" className="h-px w-8 bg-brand-500" />
              Broken down right now?
            </p>
            <h2 className="mt-6 text-[2.1rem] font-bold uppercase leading-[0.96] sm:text-[2.6rem] lg:text-[3.4rem]">
              One number.<br />
              <span className="brand-text">Any hour. Any day.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
              {site.emergencyNote}. Average response inside the city is 45 minutes, and towing to
              the workshop is free for service customers.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <Button href={site.emergencyPhoneHref} size="lg">
                <LifeBuoy size={19} /> {site.emergencyPhone}
              </Button>
              <Button to="/book" variant="secondary" size="lg">
                Book a service instead <ArrowRight size={18} />
              </Button>
            </div>

            <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-500">
              <span className="flex items-center gap-2">
                <Phone size={14} className="text-brand-500" /> Workshop: {site.phone}
              </span>
              <span className="hidden sm:inline text-ink-700">|</span>
              <span>{site.hours[0].days}: {site.hours[0].time}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
