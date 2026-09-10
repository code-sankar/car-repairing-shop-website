import { useMemo, useState } from "react";
import { ArrowRight, Check, Info } from "lucide-react";
import { packages, addOns } from "../../lib/data/pricing";
import { price, site } from "../../lib/siteConfig";
import { bodyTypes } from "../../lib/carTypes";
import { cn } from "../../lib/cn";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import AnimatedNumber from "../ui/AnimatedNumber";
import CarSilhouette from "../art/CarSilhouette";

export default function Estimate() {
  const [body, setBody] = useState(bodyTypes[0]);
  const [pkg, setPkg] = useState(packages[1]);
  const [extras, setExtras] = useState([]);

  const toggleExtra = (name) =>
    setExtras((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));

  const { base, extrasTotal, total } = useMemo(() => {
    const b = Math.round(pkg.price * body.factor);
    const e = addOns
      .filter((a) => extras.includes(a.name))
      .reduce((sum, a) => sum + Math.round(a.price * body.factor), 0);
    return { base: b, extrasTotal: e, total: b + e };
  }, [pkg, body, extras]);

  return (
    <Section id="estimate" tone="panel" className="border-y border-white/8">
      <SectionHeading
        align="center"
        eyebrow="No phone call needed"
        title={<>Price your service<br />before you book</>}
        lead="The same rate card we quote from at the desk. Pick your car, pick a package, and the number below is what you will be asked to approve."
      />

      <div className="mt-16 grid gap-8 lg:grid-cols-12">
        {/* ---- Controls ---------------------------------------------- */}
        <div className="space-y-10 lg:col-span-7">
          {/* 1 — body type */}
          <Reveal>
            <fieldset>
              <legend className="flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">
                <span className="grid size-6 place-items-center rounded-full bg-brand-500 text-xs text-white">1</span>
                Your car
              </legend>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {bodyTypes.map((type) => {
                  const on = body.id === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setBody(type)}
                      aria-pressed={on}
                      className={cn(
                        "group/type flex flex-col rounded-xl border p-4 text-left transition-all duration-300",
                        on
                          ? "border-brand-500 bg-brand-500/10"
                          : "border-white/10 bg-ink-950/50 hover:border-white/25",
                      )}
                    >
                      <CarSilhouette
                        type={type.id}
                        className={cn(
                          "h-16 transition-colors duration-300",
                          on ? "text-brand-400" : "text-ink-500 group-hover/type:text-ink-300",
                        )}
                      />
                      <span className="mt-3 min-w-0">
                        <span className="block font-semibold text-white">{type.label}</span>
                        <span className="block truncate text-xs text-ink-400">{type.example}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </Reveal>

          {/* 2 — package */}
          <Reveal delay={0.08}>
            <fieldset>
              <legend className="flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">
                <span className="grid size-6 place-items-center rounded-full bg-brand-500 text-xs text-white">2</span>
                Service package
              </legend>
              <div className="mt-5 space-y-3">
                {packages.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPkg(p)}
                    aria-pressed={pkg.id === p.id}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition-all duration-300",
                      pkg.id === p.id
                        ? "border-brand-500 bg-brand-500/10"
                        : "border-white/10 bg-ink-950/50 hover:border-white/25",
                    )}
                  >
                    <span className="min-w-0">
                      <span className="block font-display text-lg font-semibold text-white">
                        {p.name}
                        {p.popular && (
                          <span className="ml-2 rounded-full bg-brand-500 px-2 py-0.5 align-middle text-[0.6rem] font-bold uppercase tracking-wider text-white">
                            Popular
                          </span>
                        )}
                      </span>
                      <span className="block truncate text-sm text-ink-400">{p.interval}</span>
                    </span>
                    <span className="shrink-0 font-display text-lg font-semibold text-white">
                      {price(Math.round(p.price * body.factor))}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>
          </Reveal>

          {/* 3 — add-ons */}
          <Reveal delay={0.16}>
            <fieldset>
              <legend className="flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-brand-400">
                <span className="grid size-6 place-items-center rounded-full bg-brand-500 text-xs text-white">3</span>
                Add-ons
                <span className="font-sans text-[0.7rem] normal-case tracking-normal text-ink-500">
                  optional
                </span>
              </legend>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {addOns.map((a) => {
                  const on = extras.includes(a.name);
                  return (
                    <button
                      key={a.name}
                      type="button"
                      onClick={() => toggleExtra(a.name)}
                      aria-pressed={on}
                      className={cn(
                        "flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm transition-all duration-300",
                        on
                          ? "border-brand-500 bg-brand-500 text-white"
                          : "border-white/12 bg-ink-950/50 text-ink-300 hover:border-white/30 hover:text-white",
                      )}
                    >
                      {on && <Check size={14} />}
                      {a.name}
                      <span className={on ? "text-white/75" : "text-ink-500"}>
                        +{price(Math.round(a.price * body.factor))}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </Reveal>
        </div>

        {/* ---- Live summary ------------------------------------------ */}
        <div className="lg:col-span-5">
          <Reveal direction="left" delay={0.12} className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-2xl border border-brand-500/25 bg-gradient-to-br from-ink-800 to-ink-950">
            <div className="border-b border-white/8 px-7 py-5">
              <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink-400">
                Your estimate
              </p>
            </div>

            <div className="space-y-4 px-7 py-6">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-ink-300">
                  {pkg.name} · {body.label}
                </span>
                <span className="font-semibold text-white">{price(base)}</span>
              </div>

              {extras.length > 0 && (
                <div className="space-y-2 border-t border-white/8 pt-4">
                  {addOns
                    .filter((a) => extras.includes(a.name))
                    .map((a) => (
                      <div key={a.name} className="flex items-baseline justify-between gap-4 text-sm">
                        <span className="text-ink-400">{a.name}</span>
                        <span className="text-ink-200">
                          {price(Math.round(a.price * body.factor))}
                        </span>
                      </div>
                    ))}
                </div>
              )}

              <div className="flex items-baseline justify-between gap-4 border-t border-white/8 pt-5">
                <span className="font-display text-lg font-semibold uppercase tracking-wide text-white">
                  Total
                </span>
                <AnimatedNumber
                  value={total}
                  className="font-display text-4xl font-bold text-brand-400"
                />
              </div>

              <p className="flex items-start gap-2 text-xs leading-relaxed text-ink-500">
                <Info size={14} className="mt-0.5 shrink-0" />
                Inclusive of parts, labour and GST. Anything found during inspection is quoted
                separately and needs your approval before we touch it.
              </p>
            </div>

            <div className="border-t border-white/8 p-7 pt-6">
              <Button
                to="/book"
                state={{ package: pkg.id, body: body.id, extras, total }}
                size="lg"
                className="w-full"
              >
                Book this estimate <ArrowRight size={18} />
              </Button>
              <p className="mt-4 text-center text-xs text-ink-500">
                Or call {site.phone} — we will price it on the phone.
              </p>
              {extrasTotal > 0 && (
                <p className="mt-2 text-center text-xs text-brand-400">
                  {extras.length} add-on{extras.length > 1 ? "s" : ""} · {price(extrasTotal)}
                </p>
              )}
            </div>
          </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
