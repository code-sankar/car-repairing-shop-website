import { Award, Building2, Route, Users } from "lucide-react";
import useSeo from "../hooks/useSeo";
import { credentials, pillars, stats } from "../lib/data/content";
import { site } from "../lib/siteConfig";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import Counter from "../components/ui/Counter";
import Team from "../components/sections/Team";
import Testimonials from "../components/sections/Testimonials";
import CTABand from "../components/sections/CTABand";
import HeroCar from "../components/art/HeroCar";
import { CornerMarks, Glow } from "../components/art/Texture";

const milestones = [
  {
    year: "2009",
    title: "One bay, one lift",
    body: "Bikash Rajkhowa leaves a main-dealer workshop and opens a single bay on GS Road with a borrowed trolley jack.",
  },
  {
    year: "2013",
    title: "The diagnostics bench",
    body: "A Bosch scanner and a dedicated diagnostics bay arrive. Guesswork stops being part of the process.",
  },
  {
    year: "2017",
    title: "Bosch Car Service partner",
    body: "Formal partner accreditation, and the paint booth goes in. Body work comes in-house for the first time.",
  },
  {
    year: "2021",
    title: "Digital job cards",
    body: "Every inspection goes photographic. Customers start approving estimates from their phones instead of the waiting room.",
  },
  {
    year: "2024",
    title: "Fourteen technicians, six bays",
    body: "Roadside assistance goes 24/7 across the city, and the workshop passes 40,000 cars serviced.",
  },
];

export default function About() {
  useSeo({
    title: "About the Workshop",
    description: `Apex Auto Works has serviced cars in ${site.address.city} since ${site.established}. Fourteen ASE-certified technicians, six bays, and a rule that nothing gets fixed without your approval.`,
  });

  return (
    <>
      <PageHero
        eyebrow={`Since ${site.established}`}
        title={<>A workshop built<br />around one rule</>}
        lead="Nothing gets fixed without your approval, and nothing gets billed that you cannot see. Everything else here follows from that."
        crumbs={[{ label: "About" }]}
      />

      {/* ---- Story ------------------------------------------------- */}
      <Section tone="dark" backdrop={<Glow className="-right-40 top-0" size={600} opacity={0.14} />}>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Why we exist"
              title={<>The invoice is<br />the whole problem</>}
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-300">
              <p>
                Most people do not distrust mechanics. They distrust a bill they have no way to
                check. You hand over the keys, you get back a number, and somewhere in between is a
                list of parts you cannot verify were ever fitted.
              </p>
              <p>
                Apex was built to close that gap. We photograph what we find before we quote. We
                split parts from labour on every line. And we put the parts we replaced in your boot,
                because that is the one piece of evidence nobody can argue with.
              </p>
              <p className="text-white">
                It is a slower way to run a workshop. It is also why {stats[1].value.toLocaleString(site.locale)}
                {stats[1].suffix} cars have come through these bays.
              </p>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {[
                { icon: Users, value: 14, suffix: "", label: "Technicians" },
                { icon: Building2, value: 6, suffix: "", label: "Service bays" },
                { icon: Route, value: 30, suffix: "+", label: "Makes serviced" },
              ].map((item) => (
                <div key={item.label} className="border-l-2 border-brand-500/60 pl-4">
                  <item.icon size={20} className="text-brand-500" />
                  <p className="mt-3 font-display text-3xl font-bold text-white">
                    <Counter value={item.value} suffix={item.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-ink-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <Reveal direction="left" delay={0.15} className="lg:col-span-6">
            <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/80 to-ink-950 p-6 sm:p-8">
              <CornerMarks className="m-4" />
              <HeroCar />
              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/8 pt-6">
                {stats.slice(0, 2).map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl font-bold text-white">
                      <Counter value={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.18em] text-brand-400">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- Timeline ---------------------------------------------- */}
      <Section tone="panel" className="border-y border-white/8">
        <SectionHeading
          eyebrow="How we got here"
          title="Sixteen years, five turning points"
        />

        <ol className="relative mt-14 space-y-10 border-l border-white/10 pl-8 sm:pl-12">
          {milestones.map((m, i) => (
            <Reveal key={m.year} delay={i * 0.08} amount={0.3}>
              <li className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -left-[2.55rem] top-1.5 grid size-4 place-items-center rounded-full border-2 border-brand-500 bg-ink-900 sm:-left-[3.55rem]"
                />
                <p className="font-display text-3xl font-bold text-brand-400">{m.year}</p>
                <h3 className="mt-2 text-2xl font-semibold text-white">{m.title}</h3>
                <p className="mt-3 max-w-2xl leading-relaxed text-ink-400">{m.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      {/* ---- Promises ---------------------------------------------- */}
      <Section tone="dark">
        <SectionHeading
          align="center"
          eyebrow="Our promises"
          title="What you can hold us to"
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-white/8 bg-ink-900 p-7">
                <p className="font-display text-4xl font-bold text-brand-400">{p.metric}</p>
                <p className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
                  {p.metricLabel}
                </p>
                <h3 className="mt-5 text-xl font-semibold leading-tight text-white">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-400">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-14 grid gap-6 rounded-2xl border border-white/8 bg-ink-900 p-8 sm:grid-cols-2 lg:grid-cols-4">
            {credentials.map((c) => (
              <div key={c.label} className="flex items-start gap-3">
                <Award size={20} className="mt-0.5 shrink-0 text-brand-500" />
                <span>
                  <span className="block font-semibold text-white">{c.label}</span>
                  <span className="block text-sm text-ink-400">{c.detail}</span>
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Team />
      <Testimonials />
      <CTABand />
    </>
  );
}
