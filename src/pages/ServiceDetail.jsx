import { Navigate, useParams, Link } from "react-router-dom";
import { ArrowRight, Check, Clock, Phone, ShieldCheck, TriangleAlert } from "lucide-react";
import useSeo from "../hooks/useSeo";
import { getService, services } from "../lib/data/services";
import { price, site } from "../lib/siteConfig";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import ServiceCard from "../components/ui/ServiceCard";
import { CornerMarks } from "../components/art/Texture";

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = getService(slug);

  useSeo({
    title: service?.name,
    description: service?.short,
  });

  if (!service) return <Navigate to="/services" replace />;

  const Icon = service.icon;
  const related = services.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.duration}
        title={service.name}
        lead={service.short}
        crumbs={[{ label: "Services", to: "/services" }, { label: service.name }]}
      >
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button to="/book" size="lg">
              Book this service <ArrowRight size={18} />
            </Button>
            <Button href={site.phoneHref} variant="secondary" size="lg">
              <Phone size={18} /> Ask a technician
            </Button>
            {service.from > 0 && (
              <p className="font-display text-lg text-ink-300">
                From <span className="text-2xl font-bold text-brand-400">{price(service.from)}</span>
              </p>
            )}
          </div>
        </Reveal>
      </PageHero>

      <Section tone="dark">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---- Main column -------------------------------------- */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xl leading-relaxed text-ink-200">{service.intro}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-14 text-3xl font-bold uppercase">What's included</h2>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2">
                {service.includes.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-white/8 bg-ink-900 p-4"
                  >
                    <Check size={18} className="mt-0.5 shrink-0 text-brand-500" />
                    <span className="text-[0.95rem] leading-snug text-ink-200">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.14}>
              <h2 className="mt-14 text-3xl font-bold uppercase">Book this if</h2>
              <ul className="mt-7 space-y-3">
                {service.symptoms.map((symptom) => (
                  <li key={symptom} className="flex items-start gap-3 text-lg text-ink-300">
                    <TriangleAlert size={19} className="mt-1 shrink-0 text-brand-500" />
                    {symptom}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ---- Sticky summary ----------------------------------- */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.12} className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-ink-800 to-ink-950 p-7">
                <CornerMarks className="m-4" />

                <span className="grid size-16 place-items-center rounded-xl border border-brand-500/30 bg-brand-500/10 text-brand-400">
                  <Icon size={30} strokeWidth={1.6} />
                </span>

                <dl className="mt-7 divide-y divide-white/8">
                  {service.from > 0 && (
                    <div className="flex items-baseline justify-between gap-4 py-3.5">
                      <dt className="text-ink-400">Starting price</dt>
                      <dd className="font-display text-xl font-bold text-white">{price(service.from)}</dd>
                    </div>
                  )}
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-ink-400">Typical duration</dt>
                    <dd className="flex items-center gap-2 font-semibold text-white">
                      <Clock size={15} className="text-brand-500" /> {service.duration}
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-ink-400">Warranty</dt>
                    <dd className="flex items-center gap-2 font-semibold text-white">
                      <ShieldCheck size={15} className="text-brand-500" /> {site.warrantyMonths} months
                    </dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 py-3.5">
                    <dt className="text-ink-400">Pickup & drop</dt>
                    <dd className="font-semibold text-white">Free in {site.address.city}</dd>
                  </div>
                </dl>

                <p className="mt-5 rounded-xl border border-brand-500/20 bg-brand-500/8 p-4 text-sm leading-relaxed text-ink-200">
                  <span className="font-semibold text-brand-300">Turnaround: </span>
                  {service.turnaround}
                </p>

                <Button to="/book" size="lg" className="mt-6 w-full">
                  Book a slot <ArrowRight size={18} />
                </Button>
                <p className="mt-4 text-center text-xs text-ink-500">
                  No payment now. You approve the estimate first.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Section tone="panel" className="border-t border-white/8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-3xl font-bold uppercase sm:text-4xl">Often booked together</h2>
          <Link to="/services" className="font-semibold text-brand-400 transition-colors hover:text-brand-300">
            All services →
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <ServiceCard service={s} className="h-full bg-ink-950" />
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
