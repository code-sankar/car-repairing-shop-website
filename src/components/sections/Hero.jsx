import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Phone, ShieldCheck, Truck, Wrench } from "lucide-react";
import { site } from "../../lib/siteConfig";
import Button from "../ui/Button";
import Rating from "../ui/Rating";
import HeroCar from "../art/HeroCar";
import { CornerMarks, Glow, GridBackdrop } from "../art/Texture";

const proof = [
  { icon: ShieldCheck, label: `${site.warrantyMonths}-month warranty`, sub: "Parts and labour" },
  { icon: Truck, label: "Free pickup & drop", sub: `Anywhere in ${site.address.city}` },
  { icon: BadgeCheck, label: "Genuine OEM parts", sub: "Invoice with every job" },
];

/** Live-looking readouts floated over the car illustration. */
const readouts = [
  { label: "Engine", value: "Healthy", tone: "text-emerald-400", dot: "bg-emerald-400", pos: "left-0 top-0" },
  { label: "Brake pads", value: "78% left", tone: "text-brand-400", dot: "bg-brand-400", pos: "right-0 top-0" },
  { label: "Battery", value: "12.6 V", tone: "text-volt-300", dot: "bg-volt-400", pos: "left-0 bottom-2" },
];

export default function Hero() {
  return (
    <section className="noise relative overflow-hidden bg-ink-950 pt-14 pb-20 sm:pt-20 lg:pt-24 lg:pb-28">
      <GridBackdrop />
      <Glow className="-left-40 -top-40" size={720} opacity={0.24} />
      <Glow className="-bottom-52 right-0" color="var(--color-volt-500)" size={620} opacity={0.14} />

      <div className="shell relative z-10 grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        {/* ---- Copy ------------------------------------------------- */}
        <div className="min-w-0 lg:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pl-2 pr-4"
          >
            <span className="rounded-full bg-brand-500 px-2.5 py-1 font-display text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white">
              {site.rating} ★
            </span>
            <span className="text-sm text-ink-300">
              Rated by {site.reviewCount.toLocaleString(site.locale)} drivers
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-shadow-hero mt-6 text-[2.75rem] font-bold uppercase leading-[0.92] sm:text-6xl lg:text-[3.9rem] xl:text-[4.5rem]"
          >
            Your car,
            <br />
            fixed <span className="brand-text">properly</span>.
            <br />
            <span className="text-ink-400">First time.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-ink-300"
          >
            A multi-brand workshop in {site.address.city} that photographs what it finds, quotes
            before it works, and hands your old parts back in the boot. No upsells, no surprises on
            the invoice.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button to="/book" size="lg">
              Book a Service <ArrowRight size={18} />
            </Button>
            <Button href={site.phoneHref} variant="secondary" size="lg">
              <Phone size={18} /> {site.phone}
            </Button>
          </motion.div>

          {/* Proof row */}
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 grid gap-x-6 gap-y-4 border-t border-white/8 pt-7 sm:grid-cols-3"
          >
            {proof.map((p) => (
              <li key={p.label} className="flex items-start gap-3">
                <p.icon size={20} className="mt-0.5 shrink-0 text-brand-500" />
                <span>
                  <span className="block text-[0.9rem] font-semibold leading-tight text-white">{p.label}</span>
                  <span className="block text-xs text-ink-400">{p.sub}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* ---- Visual ----------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-w-0 lg:col-span-6"
        >
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-ink-800/80 via-ink-900 to-ink-950 p-4 shadow-2xl shadow-black/60 sm:p-6">
            <CornerMarks className="m-3" />

            {/* Panel header, styled like a diagnostic terminal */}
            <div className="flex items-center justify-between px-2 pb-3">
              <span className="flex items-center gap-2 font-display text-xs font-semibold uppercase tracking-[0.22em] text-ink-400">
                <Wrench size={13} className="text-brand-500" />
                Bay 03 · Live inspection
              </span>
              <span className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-widest text-emerald-400">
                <span className="size-1.5 animate-blink rounded-full bg-emerald-400" />
                Scanning
              </span>
            </div>

            <div className="relative overflow-hidden rounded-2xl">
              <HeroCar className="drop-shadow-2xl" />

              {/* Scanning bar, to match the "live inspection" framing */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-scan bg-gradient-to-b from-transparent via-volt-400/25 to-transparent"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-16 animate-scan"
              >
                <span className="absolute inset-x-0 bottom-0 h-px bg-volt-400/70" />
              </span>

              {readouts.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + i * 0.22, duration: 0.6 }}
                  className={`glass edge absolute ${r.pos} rounded-xl px-3 py-2`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`size-1.5 rounded-full ${r.dot}`} />
                    <span className="font-display text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink-400">
                      {r.label}
                    </span>
                  </span>
                  <span className={`mt-0.5 block font-display text-base font-bold ${r.tone}`}>
                    {r.value}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Panel footer */}
            <div className="mt-2 flex items-center justify-between gap-4 rounded-2xl border border-white/8 bg-ink-950/60 px-4 py-3">
              <div className="min-w-0">
                <p className="font-display text-lg font-bold leading-tight text-white">
                  42-point digital report
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <Rating value={5} size={13} />
                  <span className="truncate text-xs text-ink-400">Sent to your phone</span>
                </div>
              </div>
              <div className="shrink-0 border-l border-white/10 pl-4 text-right">
                <p className="font-display text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ink-400">
                  Full service from
                </p>
                <p className="font-display text-2xl font-bold leading-tight text-brand-400">
                  {site.currency}2,899
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
