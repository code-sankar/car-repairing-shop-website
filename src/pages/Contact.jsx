import { useState } from "react";
import { useForm } from "react-hook-form";
import { Clock, Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import useSeo from "../hooks/useSeo";
import { services } from "../lib/data/services";
import { formatAddress, site } from "../lib/siteConfig";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import Toast from "../components/ui/Toast";
import Field from "../components/ui/Field";
import { inputClass, textareaClass } from "../lib/formStyles";
import MapPanel from "../components/art/MapPanel";
import FAQ from "../components/sections/FAQ";
import { faqs } from "../lib/data/content";

const channels = [
  {
    icon: Phone,
    label: "Call the workshop",
    value: site.phone,
    href: site.phoneHref,
    note: "A technician picks up, not a call centre",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: site.phone,
    href: `https://wa.me/${site.whatsapp}`,
    note: "Send a photo or a video of the noise",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    note: "Estimates and invoices, replied to same day",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: formatAddress(),
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddress())}`,
    note: "Free parking at the gate",
    external: true,
  },
];

export default function Contact() {
  useSeo({
    title: "Contact & Directions",
    description: `Call, WhatsApp or visit Apex Auto Works at ${formatAddress()}. Open six days a week, with 24/7 roadside assistance across ${site.address.city}.`,
  });

  const [sent, setSent] = useState(false);
  const {
    register, handleSubmit, reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const onSubmit = async () => {
    // Demo build: no backend. Point this at the workshop's inbox in production.
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    reset();
  };

  return (
    <>
      <PageHero
        eyebrow="Talk to us"
        title={<>Ask before<br />you commit</>}
        lead="Describe the symptom and we will tell you what it is likely to be and what it should cost — before you bring the car in."
        crumbs={[{ label: "Contact" }]}
      />

      {/* ---- Channels ---------------------------------------------- */}
      <Section tone="dark" className="py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.07}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
                className="group flex h-full flex-col rounded-2xl border border-white/8 bg-ink-900 p-6 transition-all duration-400 hover:-translate-y-1 hover:border-brand-500/40"
              >
                <span className="grid size-12 place-items-center rounded-xl border border-brand-500/25 bg-brand-500/10 text-brand-400 transition-colors group-hover:bg-brand-500 group-hover:text-white">
                  <c.icon size={22} strokeWidth={1.8} />
                </span>
                <p className="mt-5 font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink-400">
                  {c.label}
                </p>
                <p className="mt-1.5 flex-1 font-semibold leading-snug text-white">{c.value}</p>
                <p className="mt-3 text-xs text-ink-500">{c.note}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ---- Form + map -------------------------------------------- */}
      <Section tone="panel" className="border-y border-white/8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Send a message"
              title="Tell us what it's doing"
              lead="The more detail the better — when it happens, what it sounds like, and whether a warning light is on."
            />

            <form onSubmit={handleSubmit(onSubmit)} className="mt-10 grid gap-6 sm:grid-cols-2">
              <Field label="Your name" id="c-name" required error={errors.name}>
                <input
                  id="c-name" autoComplete="name" placeholder="Full name"
                  className={inputClass(errors.name)}
                  {...register("name", { required: "Please tell us your name" })}
                />
              </Field>

              <Field label="Mobile" id="c-phone" required error={errors.phone}>
                <input
                  id="c-phone" type="tel" autoComplete="tel" placeholder="98640 12345"
                  className={inputClass(errors.phone)}
                  {...register("phone", {
                    required: "We need a number to reply on",
                    pattern: { value: /^(\+?\d{1,3}[\s-]?)?\d{10}$/, message: "Enter a 10-digit mobile number" },
                  })}
                />
              </Field>

              <Field label="Email" id="c-email" error={errors.email} className="sm:col-span-2">
                <input
                  id="c-email" type="email" autoComplete="email" placeholder="you@example.com"
                  className={inputClass(errors.email)}
                  {...register("email", {
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Check that email address" },
                  })}
                />
              </Field>

              <Field label="Car" id="c-car" required error={errors.car}>
                <input
                  id="c-car" placeholder="Hyundai Creta 2021"
                  className={inputClass(errors.car)}
                  {...register("car", { required: "Which car is it?" })}
                />
              </Field>

              <Field label="What's it about?" id="c-topic">
                <select id="c-topic" className={inputClass(false)} {...register("topic")}>
                  <option value="">General enquiry</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>{s.name}</option>
                  ))}
                </select>
              </Field>

              <Field label="Message" id="c-message" required error={errors.message} className="sm:col-span-2">
                <textarea
                  id="c-message" rows={5}
                  placeholder="Rattle from the front left over speed breakers, worse when the car is cold…"
                  className={textareaClass(errors.message)}
                  {...register("message", {
                    required: "Tell us what is happening",
                    minLength: { value: 12, message: "A little more detail helps us answer properly" },
                  })}
                />
              </Field>

              <div className="sm:col-span-2">
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? "Sending…" : "Send message"}
                  {!isSubmitting && <Send size={17} />}
                </Button>
                <p className="mt-4 text-sm text-ink-500">
                  We reply within one working hour, Monday to Saturday.
                </p>
              </div>
            </form>
          </div>

          {/* Map and hours */}
          <div className="lg:col-span-5">
            <Reveal direction="left" delay={0.12}>
              <MapPanel className="aspect-4/3" />
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-6 rounded-2xl border border-white/8 bg-ink-950 p-7">
                <h3 className="flex items-center gap-2.5 font-display text-lg font-semibold uppercase tracking-wide text-white">
                  <Clock size={18} className="text-brand-500" /> Opening hours
                </h3>
                <dl className="mt-5 divide-y divide-white/8">
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex items-baseline justify-between gap-4 py-3">
                      <dt className="text-ink-400">{h.days}</dt>
                      <dd className="font-semibold text-white">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 rounded-xl border border-brand-500/20 bg-brand-500/8 p-4 text-sm leading-relaxed text-ink-200">
                  <span className="font-semibold text-brand-300">Breakdown? </span>
                  {site.emergencyNote}. Call{" "}
                  <a href={site.emergencyPhoneHref} className="font-semibold text-brand-400 hover:text-brand-300">
                    {site.emergencyPhone}
                  </a>
                  .
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <FAQ items={faqs.slice(1, 6)} />

      <Toast
        open={sent}
        onClose={() => setSent(false)}
        title="Message sent"
        body="We'll reply within one working hour. For anything urgent, call the workshop directly."
      />
    </>
  );
}
