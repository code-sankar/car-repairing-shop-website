import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Calendar, Check } from "lucide-react";
import useSeo from "../hooks/useSeo";
import { categories, projects } from "../lib/data/gallery";
import { cn } from "../lib/cn";
import PageHero from "../components/ui/PageHero";
import Section from "../components/ui/Section";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import WorkArt from "../components/art/WorkArt";
import BeforeAfter from "../components/ui/BeforeAfter";
import Testimonials from "../components/sections/Testimonials";
import CTABand from "../components/sections/CTABand";

function ProjectCard({ project }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-900 transition-all duration-400 hover:-translate-y-1.5 hover:border-brand-500/35">
      <div className="relative aspect-16/10 overflow-hidden">
        <div className="size-full transition-transform duration-700 group-hover:scale-105">
          <WorkArt art={project.art} hue={project.hue} />
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 font-display text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
          {project.category}
        </span>
        <span className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
          <Calendar size={12} /> {project.days} day{project.days > 1 ? "s" : ""}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-7">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-brand-400">
          {project.car}
        </p>
        <h3 className="mt-2.5 text-xl font-semibold leading-snug text-white">{project.title}</h3>
        <p className="mt-3.5 flex-1 text-[0.95rem] leading-relaxed text-ink-400">{project.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.work.map((w) => (
            <li
              key={w}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-ink-300"
            >
              {w}
            </li>
          ))}
        </ul>

        <p className="mt-6 flex items-start gap-2.5 border-t border-white/8 pt-5 text-sm leading-relaxed text-ink-200">
          <Check size={16} className="mt-0.5 shrink-0 text-brand-500" />
          {project.result}
        </p>
      </div>
    </article>
  );
}

export default function Gallery() {
  useSeo({
    title: "Our Work",
    description:
      "Real jobs from the workshop floor: panel repair and respray, misfire diagnosis, brake overhauls, ceramic coating and post-monsoon driveline work.",
  });

  const [filter, setFilter] = useState("All");
  const shown = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <PageHero
        eyebrow="Case studies"
        title={<>Jobs we were<br />glad to sign off</>}
        lead="Six recent jobs, with what we found, what we did about it, and what the customer got back."
        crumbs={[{ label: "Our Work" }]}
      />

      {/* ---- Featured before/after --------------------------------- */}
      <Section tone="dark">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Featured repair"
              title={<>Rear quarter,<br />rebuilt</>}
              lead="A side impact folded the rear quarter and cracked the bumper mount. Pulled on a jig, filled, blocked flat, then blended across two panels."
            />
            <Reveal delay={0.2}>
              <dl className="mt-9 grid grid-cols-2 gap-6">
                {[
                  ["Panel gap", "0.5 mm of factory"],
                  ["Turnaround", "4 working days"],
                  ["Paint match", "Spectrophotometer"],
                  ["Warranty", "2 years on finish"],
                ].map(([k, v]) => (
                  <div key={k} className="border-l-2 border-brand-500/60 pl-4">
                    <dt className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-ink-500">
                      {k}
                    </dt>
                    <dd className="mt-1 font-semibold text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={0.28}>
              <Button to="/book" size="lg" className="mt-9">
                Get a body-work quote <ArrowRight size={18} />
              </Button>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.15} className="lg:col-span-7">
            <BeforeAfter art="panel" hue={18} beforeLabel="On arrival" afterLabel="On handover" />
            <p className="mt-3 text-center text-xs text-ink-500">
              Drag the handle, or use the arrow keys, to compare
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---- Filterable grid --------------------------------------- */}
      <Section tone="panel" className="border-y border-white/8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow="The archive" title="Recent jobs" />

          <div className="flex flex-wrap gap-2.5" role="group" aria-label="Filter by category">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                aria-pressed={filter === cat}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-all duration-300",
                  filter === cat
                    ? "border-brand-500 bg-brand-500 text-white"
                    : "border-white/12 text-ink-300 hover:border-white/30 hover:text-white",
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      <Testimonials />
      <CTABand />
    </>
  );
}
