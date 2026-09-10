import { stats } from "../../lib/data/content";
import Counter from "../ui/Counter";
import Reveal from "../ui/Reveal";
import { GridBackdrop } from "../art/Texture";

export default function StatsBand() {
  return (
    <section className="relative border-y border-white/8 bg-ink-900 py-14">
      <GridBackdrop fine className="opacity-60" />
      <div className="shell relative z-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.1}>
            <div className="border-l-2 border-brand-500/60 pl-5">
              <p className="font-display text-4xl font-bold leading-none text-white sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-brand-400">
                {stat.label}
              </p>
              <p className="mt-1.5 text-sm text-ink-400">{stat.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
