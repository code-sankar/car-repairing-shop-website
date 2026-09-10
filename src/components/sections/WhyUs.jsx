import { pillars } from "../../lib/data/content";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { Glow } from "../art/Texture";

export default function WhyUs() {
  return (
    <Section tone="dark" backdrop={<Glow className="-left-40 bottom-0" size={520} opacity={0.14} />}>

      <SectionHeading
        align="center"
        eyebrow="Why drivers switch"
        title={<>The four promises we<br />refuse to break</>}
        lead="Most people do not distrust mechanics. They distrust invoices they cannot check. Every one of these exists to make the bill checkable."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={(i % 2) * 0.1} amount={0.2}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-ink-900 p-8 transition-colors duration-400 hover:border-brand-500/35 sm:p-10">
              {/* Oversized metric sitting behind the copy */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-6 font-display text-[7rem] font-bold leading-none text-white/4 transition-all duration-500 group-hover:text-brand-500/12 sm:text-[9rem]"
              >
                {pillar.metric}
              </span>

              <p className="relative font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">
                0{i + 1}
              </p>
              <h3 className="relative mt-4 max-w-sm text-2xl font-semibold leading-tight text-white sm:text-3xl">
                {pillar.title}
              </h3>
              <p className="relative mt-4 max-w-lg leading-relaxed text-ink-400">{pillar.body}</p>
              <p className="relative mt-6 inline-flex items-center gap-2 border-t border-white/8 pt-5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-ink-500">
                <span className="text-2xl font-bold normal-case tracking-normal text-white">
                  {pillar.metric}
                </span>
                {pillar.metricLabel}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
