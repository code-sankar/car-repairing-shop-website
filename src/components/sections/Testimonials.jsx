import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "../../lib/data/content";
import { site } from "../../lib/siteConfig";
import { cn } from "../../lib/cn";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Rating from "../ui/Rating";
import Reveal from "../ui/Reveal";
import { Glow } from "../art/Texture";

export default function Testimonials() {
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 5200, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState([]);

  const onSelect = useCallback(() => {
    if (embla) setSelected(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    setSnaps(embla.scrollSnapList());
    onSelect();
    embla.on("select", onSelect).on("reInit", onSelect);
  }, [embla, onSelect]);

  return (
    <Section tone="dark" backdrop={<Glow className="right-0 top-1/4" size={520} opacity={0.12} />}>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="In their words"
          title={<>{site.reviewCount.toLocaleString(site.locale)} drivers,<br />{site.rating} out of 5</>}
          lead="Reviews we did not choose. These are the ones customers wrote about the jobs that mattered to them."
        />

        <Reveal delay={0.2} className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => embla?.scrollPrev()}
            aria-label="Previous testimonial"
            className="grid size-13 place-items-center rounded-full border border-white/12 text-white transition-all hover:border-brand-500 hover:bg-brand-500"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => embla?.scrollNext()}
            aria-label="Next testimonial"
            className="grid size-13 place-items-center rounded-full border border-white/12 text-white transition-all hover:border-brand-500 hover:bg-brand-500"
          >
            <ArrowRight size={20} />
          </button>
        </Reveal>
      </div>

      <div className="mt-14 overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="min-w-0 shrink-0 grow-0 basis-full pr-6 sm:basis-1/2 lg:basis-1/3"
            >
              <figure className="flex h-full flex-col rounded-2xl border border-white/8 bg-ink-900 p-8 transition-colors duration-400 hover:border-brand-500/30">
                <Quote size={34} className="text-brand-500/40" />
                <blockquote className="mt-5 flex-1 text-[1.02rem] leading-relaxed text-ink-200">
                  {t.quote}
                </blockquote>

                <p className="mt-6 inline-flex self-start rounded-full border border-brand-500/25 bg-brand-500/10 px-3 py-1 font-display text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-brand-300">
                  {t.highlight}
                </p>

                <figcaption className="mt-6 flex items-center gap-4 border-t border-white/8 pt-6">
                  <span
                    aria-hidden="true"
                    className="grid size-12 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-lg font-bold text-white"
                  >
                    {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-white">{t.name}</span>
                    <span className="block truncate text-sm text-ink-400">{t.role}</span>
                  </span>
                  <Rating value={t.rating} size={14} className="ml-auto shrink-0" />
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>

      {/* Progress dots */}
      <div className="mt-10 flex justify-center gap-2">
        {snaps.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => embla?.scrollTo(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            aria-current={selected === i}
            className={cn(
              "h-1.5 rounded-full transition-all duration-400",
              selected === i ? "w-10 bg-brand-500" : "w-4 bg-white/15 hover:bg-white/30",
            )}
          />
        ))}
      </div>
    </Section>
  );
}
