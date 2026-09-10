import { brands } from "../../lib/data/content";

/**
 * Infinite brand ticker. The list is rendered twice and the track translates
 * exactly -50%, so the loop point is invisible. Pauses on hover.
 */
export default function BrandMarquee() {
  return (
    <section className="border-b border-white/8 bg-ink-950 py-10" aria-label="Brands we service">
      <p className="shell mb-7 text-center font-display text-xs font-semibold uppercase tracking-[0.3em] text-ink-500">
        Servicing every mainstream make on the road
      </p>

      <div className="group mask-fade-x relative flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center group-hover:paused">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="shrink-0 whitespace-nowrap px-8 font-display text-2xl font-semibold uppercase tracking-wide text-ink-600 transition-colors duration-300 hover:text-brand-400 sm:px-10 sm:text-3xl"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
