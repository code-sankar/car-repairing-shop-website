import { useState } from "react";
import { Check, Info, Phone, X } from "lucide-react";
import useSeo from "../hooks/useSeo";
import { packages, rateCard } from "../lib/data/pricing";
import { price, site } from "../lib/siteConfig";
import { cn } from "../lib/cn";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import Estimate from "../components/sections/Estimate";
import FAQ from "../components/sections/FAQ";
import CTABand from "../components/sections/CTABand";
import { faqs } from "../lib/data/content";

function PackageCard({ pkg }) {
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-2xl border p-8",
        pkg.popular
          ? "border-brand-500 bg-gradient-to-b from-brand-500/12 to-ink-900 shadow-[0_30px_80px_-40px_rgba(255,106,0,0.8)] lg:-my-4 lg:py-12"
          : "border-white/10 bg-ink-900",
      )}
    >
      {pkg.popular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand-500 px-4 py-1.5 font-display text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white">
          Most booked
        </span>
      )}

      <h3 className="font-display text-3xl font-bold uppercase text-white">{pkg.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-400">{pkg.tagline}</p>

      <p className="mt-7 flex items-baseline gap-2">
        <span className="font-display text-5xl font-bold text-white">{price(pkg.price)}</span>
        <span className="text-sm text-ink-400">{pkg.cadence}</span>
      </p>
      <p className="mt-2 text-sm text-brand-400">{pkg.interval}</p>
      <p className="mt-1 text-sm text-ink-500">Workshop time: {pkg.duration}</p>

      <ul className="mt-8 flex-1 space-y-3.5 border-t border-white/8 pt-8">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[0.95rem] text-ink-200">
            <Check size={17} className="mt-0.5 shrink-0 text-brand-500" />
            {f}
          </li>
        ))}
        {pkg.excludes.map((f) => (
          <li key={f} className="flex items-start gap-3 text-[0.95rem] text-ink-500">
            <X size={17} className="mt-0.5 shrink-0 text-ink-600" />
            {f}
          </li>
        ))}
      </ul>

      <Button
        to="/book"
        state={{ package: pkg.id }}
        variant={pkg.popular ? "primary" : "secondary"}
        size="lg"
        className="mt-9 w-full"
      >
        {pkg.cta}
      </Button>
    </article>
  );
}

export default function Pricing() {
  useSeo({
    title: "Service Packages & Price List",
    description:
      "Published rates for every job we do — service packages, brakes, diagnostics, AC and body work. Fixed-price quotes approved before any work begins.",
  });

  const [openGroup, setOpenGroup] = useState(rateCard[0].group);

  return (
    <>
      <PageHero
        eyebrow="Published rates"
        title={<>Our prices,<br />on the wall</>}
        lead="Most garages will not tell you a number until your car is on the lift. Here is the entire rate card, before you commit to anything."
        crumbs={[{ label: "Pricing" }]}
      />

      <Section tone="dark">
        <SectionHeading
          align="center"
          eyebrow="Service packages"
          title="Pick the one your car is due"
          lead="Prices shown for a hatchback. Sedans, SUVs and luxury cars carry a labour multiplier — the estimator below shows your exact figure."
        />

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.id} delay={i * 0.1} amount={0.15}>
              <PackageCard pkg={pkg} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-12 flex max-w-2xl items-start justify-center gap-2 text-center text-sm leading-relaxed text-ink-500">
            <Info size={16} className="mt-0.5 shrink-0" />
            All prices include parts, labour and GST. Anything found during inspection is quoted
            separately and needs your approval before we touch it.
          </p>
        </Reveal>
      </Section>

      {/* ---- Full rate card -------------------------------------- */}
      <Section tone="panel" className="border-y border-white/8">
        <SectionHeading
          eyebrow="À la carte"
          title="The full rate card"
          lead="Individual jobs, priced for a hatchback. Every figure below is what we quote at the desk."
        />

        <div className="mt-12 space-y-4">
          {rateCard.map((group, i) => {
            const open = openGroup === group.group;
            return (
              <Reveal key={group.group} delay={i * 0.06} amount={0.1}>
                <div className="overflow-hidden rounded-2xl border border-white/8 bg-ink-950">
                  <button
                    type="button"
                    onClick={() => setOpenGroup(open ? null : group.group)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/3"
                  >
                    <span className="font-display text-xl font-semibold uppercase tracking-wide text-white sm:text-2xl">
                      {group.group}
                    </span>
                    <span
                      className={cn(
                        "grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                        open ? "rotate-45 border-brand-500 bg-brand-500 text-white" : "border-white/15 text-ink-400",
                      )}
                    >
                      +
                    </span>
                  </button>

                  {open && (
                    <table className="w-full border-t border-white/8 text-left">
                      <caption className="sr-only">{group.group} price list</caption>
                      <tbody className="divide-y divide-white/6">
                        {group.rows.map((row) => (
                          <tr key={row.item} className="transition-colors hover:bg-white/3">
                            <th scope="row" className="px-6 py-4 font-normal text-ink-200">
                              {row.item}
                            </th>
                            <td className="whitespace-nowrap px-6 py-4 text-right font-display text-lg font-semibold text-white">
                              {row.note || price(row.price)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl border border-brand-500/25 bg-brand-500/8 p-7 sm:flex-row">
            <p className="text-center text-ink-200 sm:text-left">
              Cannot find your job on the list? Send us the symptom and we will price it over the
              phone before you bring the car in.
            </p>
            <Button href={site.phoneHref} className="shrink-0">
              <Phone size={17} /> {site.phone}
            </Button>
          </div>
        </Reveal>
      </Section>

      <Estimate />
      <FAQ items={faqs.slice(2, 7)} />
      <CTABand />
    </>
  );
}
