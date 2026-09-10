import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, Check } from "lucide-react";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import Button from "../ui/Button";
import BlueprintCar from "../art/BlueprintCar";
import Gauge from "../art/Gauge";
import { Glow } from "../art/Texture";

const zones = [
  {
    id: "engine",
    score: 92,
    x: 190, y: 165,
    label: "Engine bay",
    count: 11,
    items: ["Oil level, colour and leaks", "Coolant strength and hoses", "Belt condition and tension", "Air filter and intake", "Battery load test"],
  },
  {
    id: "brakes",
    score: 78,
    x: 205, y: 246,
    label: "Brakes",
    count: 6,
    items: ["Pad thickness, measured", "Disc runout and lip", "Caliper slide pins", "Brake fluid moisture", "Handbrake travel"],
  },
  {
    id: "suspension",
    score: 84,
    x: 330, y: 232,
    label: "Suspension & steering",
    count: 7,
    items: ["Strut and shock leaks", "Bush and link play", "Ball joints and tie rods", "Steering rack boots", "Ride height, both sides"],
  },
  {
    id: "cabin",
    score: 96,
    x: 505, y: 118,
    label: "Cabin & electricals",
    count: 9,
    items: ["AC vent temperature", "All lamps and indicators", "Wipers and washer jets", "Horn, locks and windows", "Warning lamp scan"],
  },
  {
    id: "underbody",
    score: 88,
    x: 560, y: 240,
    label: "Underbody & exhaust",
    count: 5,
    items: ["Exhaust joints and mounts", "Gearbox and diff leaks", "Chassis rust and damage", "Fuel and brake lines", "Undertray fixings"],
  },
  {
    id: "tyres",
    score: 71,
    x: 700, y: 246,
    label: "Tyres & alignment",
    count: 4,
    items: ["Tread depth, all four", "Wear pattern reading", "Pressure to load rating", "Spare and tools present"],
  },
];

export default function Inspection() {
  const [active, setActive] = useState(zones[0]);

  return (
    <Section
      tone="panel"
      className="border-y border-white/8"
      backdrop={<Glow className="left-1/4 top-0" color="var(--color-volt-500)" size={600} opacity={0.12} />}
    >

      <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Every visit"
            title={<>42 checks.<br />All photographed.</>}
            lead="Whatever you booked, the car gets the same full inspection. You get a report with a photo against every item — including the ones that passed."
          />

          <Reveal delay={0.2}>
            <div className="mt-9 rounded-2xl border border-white/8 bg-ink-950/60 p-6">
              <div className="flex items-center justify-between gap-5">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-volt-300">
                    <span className="size-2 animate-blink rounded-full bg-volt-400" />
                    {active.label}
                  </p>
                  <p className="mt-1.5 text-sm text-ink-400">
                    {active.count} checks in this zone
                  </p>
                </div>
                <Gauge
                  value={active.score}
                  label="Health"
                  size={104}
                  className="shrink-0"
                />
              </div>
              <ul className="mt-6 space-y-3 border-t border-white/8 pt-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28 }}
                    className="space-y-3"
                  >
                    {active.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-ink-300">
                        <Check size={17} className="mt-0.5 shrink-0 text-brand-500" />
                        {item}
                      </li>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Button to="/book">Book an inspection</Button>
              <span className="flex items-center gap-2 text-sm text-ink-400">
                <Camera size={16} className="text-brand-500" /> Report lands on WhatsApp
              </span>
            </div>
          </Reveal>
        </div>

        {/* ---- Diagram ------------------------------------------------ */}
        <Reveal direction="left" delay={0.15} className="lg:col-span-7">
          <div className="relative rounded-3xl border border-volt-400/15 bg-ink-950/70 p-4 sm:p-7">
            <BlueprintCar className="text-volt-400">
              {zones.map((zone) => {
                const isActive = active.id === zone.id;
                return (
                  <g
                    key={zone.id}
                    onMouseEnter={() => setActive(zone)}
                    onFocus={() => setActive(zone)}
                    onClick={() => setActive(zone)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${zone.label}: ${zone.count} checks`}
                    aria-pressed={isActive}
                    className="cursor-pointer outline-none"
                  >
                    {isActive && (
                      <circle cx={zone.x} cy={zone.y} r="16" className="animate-pulse-ring" fill="var(--color-brand-500)" opacity="0.5" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
                    )}
                    <circle
                      cx={zone.x} cy={zone.y} r="15"
                      fill={isActive ? "var(--color-brand-500)" : "var(--color-ink-950)"}
                      stroke={isActive ? "var(--color-brand-500)" : "var(--color-volt-400)"}
                      strokeWidth="2.5"
                      className="transition-all duration-300"
                    />
                    <text
                      x={zone.x} y={zone.y + 5}
                      textAnchor="middle"
                      fontSize="14"
                      fontWeight="700"
                      fill={isActive ? "#fff" : "var(--color-volt-300)"}
                      className="pointer-events-none select-none"
                    >
                      {zone.count}
                    </text>
                  </g>
                );
              })}
            </BlueprintCar>

            <p className="mt-3 text-center text-xs text-ink-500">
              Tap a marker to see what we check there
            </p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
