import { process } from "../../lib/data/content";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import Reveal from "../ui/Reveal";
import { HazardStrip } from "../art/Texture";

export default function Process() {
  return (
    <Section
      tone="light"
      className="text-ink-600"
      backdrop={
        <div
          aria-hidden="true"
          className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(16,22,29,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,22,29,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,#000_35%,transparent_80%)]"
        />
      }
    >

      <SectionHeading
        light
        eyebrow="How it works"
        title={<>From booking to handover,<br />in five steps</>}
        lead="You never have to ring us to ask what is happening. The process tells you."
      />

      <ol className="relative mt-16 grid gap-y-12 md:grid-cols-5 md:gap-x-6">
        {/* Connecting rail across the row on desktop */}
        <span
          aria-hidden="true"
          className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-brand-500/20 via-brand-500/60 to-brand-500/20 md:block"
        />

        {process.map((step, i) => (
          <Reveal key={step.step} delay={i * 0.1} className="relative">
            <li className="relative flex gap-5 md:block">
              <span className="relative z-10 grid size-16 shrink-0 place-items-center rounded-full border-4 border-ink-50 bg-ink-950 font-display text-xl font-bold text-brand-400 shadow-lg shadow-ink-900/15">
                {step.step}
              </span>
              <div className="md:mt-6">
                <h3 className="text-xl font-semibold leading-tight text-ink-950">{step.title}</h3>
                <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ink-500">{step.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>

      <Reveal delay={0.3}>
        <div className="mt-16 overflow-hidden rounded-2xl">
          <HazardStrip className="opacity-90" />
          <div className="flex flex-col items-center justify-between gap-4 bg-ink-950 px-8 py-7 sm:flex-row">
            <p className="text-center font-display text-xl font-semibold text-white sm:text-left sm:text-2xl">
              Average turnaround on a full service:{" "}
              <span className="text-brand-400">one working day</span>
            </p>
            <p className="text-sm text-ink-400">Booked before 10 AM · collected the same evening</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
