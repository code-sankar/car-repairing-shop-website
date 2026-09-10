import { team } from "../../lib/data/content";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { BadgeCheck } from "lucide-react";

/**
 * Monogram tile. With no photography in the build, a deliberate typographic
 * treatment reads far better than a generic silhouette standing in for a face.
 */
function Portrait({ initials, hue, icon: Icon }) {
  return (
    <div
      className="relative grid aspect-4/5 w-full place-items-center overflow-hidden rounded-xl"
      style={{
        background: `linear-gradient(155deg, hsl(${hue} 62% 30%), hsl(${hue} 45% 13%) 55%, #0b0f14)`,
      }}
    >
      <div className="bg-grid-sm absolute inset-0 opacity-30" aria-hidden="true" />

      {/* Concentric rings, echoing the wheel motif used across the site */}
      <svg viewBox="0 0 200 250" className="absolute inset-0 size-full opacity-25" aria-hidden="true">
        <circle cx="100" cy="118" r="78" fill="none" stroke="#fff" strokeWidth="1" />
        <circle cx="100" cy="118" r="58" fill="none" stroke="#fff" strokeWidth="1" strokeDasharray="4 7" />
        <circle cx="100" cy="118" r="98" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5" />
      </svg>

      <span
        aria-hidden="true"
        className="relative -translate-y-2 font-display text-[4.5rem] font-bold leading-none text-white/90 drop-shadow-lg"
      >
        {initials}
      </span>

      <span
        aria-hidden="true"
        className="absolute bottom-3 right-3 grid size-9 place-items-center rounded-lg border border-white/15 bg-black/35 text-white backdrop-blur-sm"
      >
        <Icon size={17} strokeWidth={1.8} />
      </span>

      <span aria-hidden="true" className="bg-hazard absolute inset-x-0 bottom-0 h-1 opacity-70" />
    </div>
  );
}

export default function Team() {
  return (
    <Section tone="panel" className="border-y border-white/8">
      <SectionHeading
        eyebrow="On the tools"
        title={<>The people who<br />actually touch your car</>}
        lead="No rotating pool of contractors. The same fourteen technicians, most of whom have been here the better part of a decade."
      />

      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {team.map((member, i) => (
          <Reveal key={member.name} delay={i * 0.08} amount={0.15}>
            <article className="group h-full overflow-hidden rounded-2xl border border-white/8 bg-ink-950 transition-all duration-400 hover:-translate-y-1.5 hover:border-brand-500/35">
              <div className="p-3 pb-0">
                <Portrait initials={member.initials} hue={member.hue} icon={member.icon} />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold leading-tight text-white">{member.name}</h3>
                <p className="mt-1 font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-400">
                  {member.role}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-ink-400">{member.line}</p>

                <ul className="mt-5 space-y-2 border-t border-white/8 pt-5">
                  {member.creds.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-xs text-ink-400">
                      <BadgeCheck size={14} className="mt-px shrink-0 text-brand-500" />
                      {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-display text-xs uppercase tracking-[0.2em] text-ink-600">
                  With Apex since {member.since}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
