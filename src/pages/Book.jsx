import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, Calendar, Car, CircleCheckBig, Clock,
  MapPin, Phone, ShieldCheck, Truck, User,
} from "lucide-react";
import useSeo from "../hooks/useSeo";
import { services } from "../lib/data/services";
import { packages } from "../lib/data/pricing";
import { formatAddress, price, site } from "../lib/siteConfig";
import { cn } from "../lib/cn";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import Field from "../components/ui/Field";
import { inputClass, textareaClass } from "../lib/formStyles";

const steps = [
  { id: 0, label: "Service", icon: Car, fields: ["service", "handover"] },
  { id: 1, label: "Vehicle", icon: Car, fields: ["make", "model", "year", "registration"] },
  { id: 2, label: "Slot", icon: Calendar, fields: ["date", "slot"] },
  { id: 3, label: "Contact", icon: User, fields: ["name", "phone", "email"] },
];

const slots = ["8:00 AM", "9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

const fuels = ["Petrol", "Diesel", "CNG", "Hybrid", "Electric"];

/** Next 14 days, as ISO date strings, for the min/max on the date picker. */
function dateBounds() {
  const today = new Date();
  const max = new Date(today);
  max.setDate(max.getDate() + 30);
  const iso = (d) => d.toISOString().split("T")[0];
  return { min: iso(today), max: iso(max) };
}

export default function Book() {
  useSeo({
    title: "Book a Service",
    description:
      "Book a car service slot online in under a minute. Choose doorstep pickup or drop-off, pick your date and time, and approve the estimate before any work starts.",
  });

  const { state } = useLocation();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const { min, max } = useMemo(dateBounds, []);

  const {
    register, handleSubmit, trigger, watch, setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      service: "periodic-service",
      package: state?.package || "complete",
      handover: "pickup",
      fuel: "Petrol",
      slot: "9:30 AM",
      make: "", model: "", year: "", registration: "",
      date: "", name: "", phone: "", email: "", notes: "",
    },
  });

  // Carry a selection through from the estimator on the pricing page
  useEffect(() => {
    if (state?.package) setValue("package", state.package);
  }, [state, setValue]);

  const values = watch();
  const chosenService = services.find((s) => s.slug === values.service);
  const chosenPackage = packages.find((p) => p.id === values.package);
  const isPeriodic = values.service === "periodic-service";

  const next = async () => {
    const ok = await trigger(steps[step].fields);
    if (ok) setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const onSubmit = async () => {
    // Demo build: no backend. A production site would POST to the workshop's
    // booking API or a form service here.
    await new Promise((r) => setTimeout(r, 900));
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (done) {
    return (
      <Section tone="dark" className="min-h-[70vh]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mx-auto grid size-20 place-items-center rounded-full border border-brand-500/30 bg-brand-500/12">
            <CircleCheckBig size={40} className="text-brand-400" />
          </span>
          <h1 className="mt-8 text-4xl font-bold uppercase sm:text-5xl">Slot reserved</h1>
          <p className="mt-5 text-lg leading-relaxed text-ink-300">
            Thanks {values.name.split(" ")[0]}. We have held{" "}
            <span className="text-white">{values.slot}</span> on{" "}
            <span className="text-white">{values.date}</span> for your {values.make} {values.model}.
          </p>

          <dl className="mt-10 divide-y divide-white/8 rounded-2xl border border-white/10 bg-ink-900 text-left">
            {[
              ["Service", chosenService?.name],
              isPeriodic && ["Package", `${chosenPackage?.name} · ${price(chosenPackage?.price)}`],
              ["Handover", values.handover === "pickup" ? "Free doorstep pickup" : "Drop-off at workshop"],
              ["Registration", values.registration.toUpperCase()],
              ["We will call", values.phone],
            ]
              .filter(Boolean)
              .map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 px-6 py-4">
                  <dt className="text-ink-400">{k}</dt>
                  <dd className="text-right font-semibold text-white">{v}</dd>
                </div>
              ))}
          </dl>

          <p className="mt-8 text-sm leading-relaxed text-ink-400">
            A service advisor will confirm on WhatsApp within 30 minutes. Nothing is charged now —
            you approve the estimate after we inspect the car.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={site.phoneHref} variant="secondary">
              <Phone size={17} /> Call the workshop
            </Button>
            <Button to="/">Back to home</Button>
          </div>
        </motion.div>
      </Section>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Under a minute"
        title="Book a service"
        lead="Four short steps. No payment, no card details — you approve the estimate after we have looked at the car."
        crumbs={[{ label: "Book" }]}
      />

      <Section tone="dark">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---- Form ------------------------------------------------ */}
          <div className="lg:col-span-7">
            {/* Progress */}
            <ol className="flex items-center gap-2" aria-label="Booking progress">
              {steps.map((s, i) => (
                <li key={s.id} className="flex flex-1 items-center gap-2">
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full border font-display text-sm font-bold transition-colors",
                      i < step && "border-brand-500 bg-brand-500 text-white",
                      i === step && "border-brand-500 text-brand-400",
                      i > step && "border-white/15 text-ink-500",
                    )}
                    aria-current={i === step ? "step" : undefined}
                  >
                    {i < step ? "✓" : i + 1}
                  </span>
                  <span
                    className={cn(
                      "hidden font-display text-xs font-semibold uppercase tracking-[0.16em] sm:inline",
                      i <= step ? "text-white" : "text-ink-500",
                    )}
                  >
                    {s.label}
                  </span>
                  {i < steps.length - 1 && (
                    <span className={cn("h-px flex-1", i < step ? "bg-brand-500" : "bg-white/12")} />
                  )}
                </li>
              ))}
            </ol>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 22 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -22 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* ---------- Step 1: service ---------- */}
                  {step === 0 && (
                    <div className="space-y-8">
                      <Field label="What does the car need?" id="service" required error={errors.service}>
                        <select
                          id="service"
                          className={inputClass(errors.service)}
                          {...register("service", { required: "Pick a service" })}
                        >
                          {services.map((s) => (
                            <option key={s.slug} value={s.slug}>{s.name}</option>
                          ))}
                        </select>
                      </Field>

                      {isPeriodic && (
                        <fieldset>
                          <legend className="mb-3 text-sm font-semibold text-white">
                            Service package
                          </legend>
                          <div className="grid gap-3 sm:grid-cols-3">
                            {packages.map((p) => (
                              <label
                                key={p.id}
                                className={cn(
                                  "cursor-pointer rounded-xl border p-4 transition-all duration-300",
                                  values.package === p.id
                                    ? "border-brand-500 bg-brand-500/10"
                                    : "border-white/12 hover:border-white/25",
                                )}
                              >
                                <input type="radio" value={p.id} className="sr-only" {...register("package")} />
                                <span className="block font-display text-lg font-semibold text-white">
                                  {p.name}
                                </span>
                                <span className="mt-1 block text-sm text-brand-400">
                                  {price(p.price)}
                                </span>
                                <span className="mt-1 block text-xs text-ink-500">{p.duration}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      )}

                      <fieldset>
                        <legend className="mb-3 text-sm font-semibold text-white">
                          How should we get the car?
                        </legend>
                        <div className="grid gap-3 sm:grid-cols-2">
                          {[
                            { id: "pickup", icon: Truck, title: "Free doorstep pickup", sub: `Anywhere in ${site.address.city}` },
                            { id: "dropoff", icon: MapPin, title: "I'll drop it off", sub: formatAddress() },
                          ].map((opt) => (
                            <label
                              key={opt.id}
                              className={cn(
                                "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-all duration-300",
                                values.handover === opt.id
                                  ? "border-brand-500 bg-brand-500/10"
                                  : "border-white/12 hover:border-white/25",
                              )}
                            >
                              <input type="radio" value={opt.id} className="sr-only" {...register("handover")} />
                              <opt.icon
                                size={20}
                                className={values.handover === opt.id ? "mt-0.5 text-brand-400" : "mt-0.5 text-ink-500"}
                              />
                              <span className="min-w-0">
                                <span className="block font-semibold text-white">{opt.title}</span>
                                <span className="block text-xs text-ink-400">{opt.sub}</span>
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                  )}

                  {/* ---------- Step 2: vehicle ---------- */}
                  {step === 1 && (
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Make" id="make" required error={errors.make}>
                        <input
                          id="make" placeholder="Maruti Suzuki"
                          className={inputClass(errors.make)}
                          {...register("make", { required: "Tell us the make" })}
                        />
                      </Field>
                      <Field label="Model" id="model" required error={errors.model}>
                        <input
                          id="model" placeholder="Swift VXi"
                          className={inputClass(errors.model)}
                          {...register("model", { required: "Tell us the model" })}
                        />
                      </Field>
                      <Field label="Year" id="year" required error={errors.year}>
                        <input
                          id="year" type="number" placeholder="2019" inputMode="numeric"
                          className={inputClass(errors.year)}
                          {...register("year", {
                            required: "Tell us the year",
                            min: { value: 1980, message: "Enter a year after 1980" },
                            max: { value: new Date().getFullYear() + 1, message: "That year is in the future" },
                          })}
                        />
                      </Field>
                      <Field
                        label="Registration" id="registration" required
                        error={errors.registration} hint="Format: AS01AB1234"
                      >
                        <input
                          id="registration" placeholder="AS 01 AB 1234"
                          className={cn(inputClass(errors.registration), "uppercase")}
                          {...register("registration", {
                            required: "We need the registration",
                            pattern: {
                              value: /^[A-Za-z]{2}\s?\d{1,2}\s?[A-Za-z]{0,3}\s?\d{1,4}$/,
                              message: "That does not look like a registration number",
                            },
                          })}
                        />
                      </Field>
                      <Field label="Fuel" id="fuel" className="sm:col-span-2">
                        <select id="fuel" className={inputClass(false)} {...register("fuel")}>
                          {fuels.map((f) => <option key={f}>{f}</option>)}
                        </select>
                      </Field>
                    </div>
                  )}

                  {/* ---------- Step 3: slot ---------- */}
                  {step === 2 && (
                    <div className="space-y-8">
                      <Field label="Preferred date" id="date" required error={errors.date}>
                        <input
                          id="date" type="date" min={min} max={max}
                          className={cn(inputClass(errors.date), "[color-scheme:dark]")}
                          {...register("date", { required: "Pick a date" })}
                        />
                      </Field>

                      <fieldset>
                        <legend className="mb-3 text-sm font-semibold text-white">
                          Preferred time
                        </legend>
                        <div className="flex flex-wrap gap-2.5">
                          {slots.map((slot) => (
                            <label
                              key={slot}
                              className={cn(
                                "cursor-pointer rounded-full border px-4 py-2.5 text-sm transition-all duration-300",
                                values.slot === slot
                                  ? "border-brand-500 bg-brand-500 text-white"
                                  : "border-white/12 text-ink-300 hover:border-white/30 hover:text-white",
                              )}
                            >
                              <input type="radio" value={slot} className="sr-only" {...register("slot")} />
                              {slot}
                            </label>
                          ))}
                        </div>
                        <p className="mt-3 flex items-center gap-2 text-xs text-ink-500">
                          <Clock size={13} /> Slots before 10 AM are usually collected the same evening
                        </p>
                      </fieldset>
                    </div>
                  )}

                  {/* ---------- Step 4: contact ---------- */}
                  {step === 3 && (
                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="Your name" id="name" required error={errors.name} className="sm:col-span-2">
                        <input
                          id="name" placeholder="Full name" autoComplete="name"
                          className={inputClass(errors.name)}
                          {...register("name", {
                            required: "We need a name for the job card",
                            minLength: { value: 2, message: "That name looks too short" },
                          })}
                        />
                      </Field>
                      <Field label="Mobile" id="phone" required error={errors.phone} hint="We confirm on WhatsApp">
                        <input
                          id="phone" type="tel" placeholder="98640 12345" autoComplete="tel"
                          className={inputClass(errors.phone)}
                          {...register("phone", {
                            required: "We need a number to confirm on",
                            pattern: {
                              value: /^(\+?\d{1,3}[\s-]?)?\d{10}$/,
                              message: "Enter a 10-digit mobile number",
                            },
                          })}
                        />
                      </Field>
                      <Field label="Email" id="email" required error={errors.email} hint="For the digital report">
                        <input
                          id="email" type="email" placeholder="you@example.com" autoComplete="email"
                          className={inputClass(errors.email)}
                          {...register("email", {
                            required: "We send the inspection report here",
                            pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Check that email address" },
                          })}
                        />
                      </Field>
                      <Field
                        label="Anything we should know?" id="notes" className="sm:col-span-2"
                      >
                        <textarea
                          id="notes" rows={4}
                          placeholder="Noise from the front left over speed breakers, gets worse when cold…"
                          className={textareaClass(false)}
                          {...register("notes")}
                        />
                      </Field>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/8 pt-8">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  className={cn(step === 0 && "invisible")}
                >
                  <ArrowLeft size={17} /> Back
                </Button>

                {step < steps.length - 1 ? (
                  <Button type="button" onClick={next} size="lg">
                    Continue <ArrowRight size={18} />
                  </Button>
                ) : (
                  <Button type="submit" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? "Reserving…" : "Confirm booking"}
                    {!isSubmitting && <ArrowRight size={18} />}
                  </Button>
                )}
              </div>
            </form>
          </div>

          {/* ---- Live summary ---------------------------------------- */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.1} className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-900">
                <div className="border-b border-white/8 px-7 py-5">
                  <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-ink-400">
                    Your booking
                  </p>
                </div>

                <dl className="divide-y divide-white/8">
                  {[
                    ["Service", chosenService?.name],
                    isPeriodic && ["Package", chosenPackage?.name],
                    ["Handover", values.handover === "pickup" ? "Doorstep pickup" : "Drop-off"],
                    ["Vehicle", [values.make, values.model, values.year].filter(Boolean).join(" ") || "—"],
                    ["Registration", values.registration ? values.registration.toUpperCase() : "—"],
                    ["Date", values.date || "—"],
                    ["Time", values.slot],
                  ]
                    .filter(Boolean)
                    .map(([k, v]) => (
                      <div key={k} className="flex items-baseline justify-between gap-5 px-7 py-3.5">
                        <dt className="shrink-0 text-sm text-ink-400">{k}</dt>
                        <dd className="text-right text-sm font-semibold text-white">{v}</dd>
                      </div>
                    ))}
                </dl>

                {isPeriodic && chosenPackage && (
                  <div className="flex items-baseline justify-between gap-4 border-t border-white/8 px-7 py-5">
                    <span className="font-display text-base font-semibold uppercase text-white">
                      Estimate from
                    </span>
                    <span className="font-display text-2xl font-bold text-brand-400">
                      {price(chosenPackage.price)}
                    </span>
                  </div>
                )}

                <ul className="space-y-3 border-t border-white/8 px-7 py-6">
                  {[
                    [ShieldCheck, `${site.warrantyMonths}-month warranty on parts and labour`],
                    [Truck, `Free pickup and drop in ${site.address.city}`],
                    [CircleCheckBig, "Nothing charged until you approve the estimate"],
                  ].map(([Icon, text]) => (
                    <li key={text} className="flex items-start gap-3 text-sm text-ink-300">
                      <Icon size={16} className="mt-0.5 shrink-0 text-brand-500" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="mt-5 text-center text-sm text-ink-500">
                Prefer to talk?{" "}
                <a href={site.phoneHref} className="font-semibold text-brand-400 hover:text-brand-300">
                  {site.phone}
                </a>
              </p>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
