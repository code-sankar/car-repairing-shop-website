import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { GridBackdrop, Glow } from "../art/Texture";
import Reveal from "./Reveal";

/** Compact masthead shared by every inner page, with a breadcrumb trail. */
export default function PageHero({ eyebrow, title, lead, crumbs = [], children }) {
  return (
    <section className="noise relative overflow-hidden border-b border-white/8 bg-ink-950 pt-14 pb-16 sm:pt-16 sm:pb-20">
      <GridBackdrop />
      <Glow className="-left-32 -top-40" size={620} opacity={0.2} />

      <div className="shell relative z-10">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
            <li>
              <Link to="/" className="transition-colors hover:text-brand-400">Home</Link>
            </li>
            {crumbs.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                <ChevronRight size={14} aria-hidden="true" />
                {crumb.to && i < crumbs.length - 1 ? (
                  <Link to={crumb.to} className="transition-colors hover:text-brand-400">
                    {crumb.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink-300">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-8 max-w-3xl">
          {eyebrow && (
            <Reveal direction="none" duration={0.5}>
              <p className="eyebrow">
                <span aria-hidden="true" className="h-px w-8 bg-brand-500" />
                {eyebrow}
              </p>
            </Reveal>
          )}
          <Reveal delay={0.06}>
            <h1 className="mt-5 text-[2.3rem] font-bold uppercase leading-[0.96] sm:text-[3rem] lg:text-[3.6rem]">
              {title}
            </h1>
          </Reveal>
          {lead && (
            <Reveal delay={0.14}>
              <p className="mt-6 text-lg leading-relaxed text-ink-300">{lead}</p>
            </Reveal>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}
