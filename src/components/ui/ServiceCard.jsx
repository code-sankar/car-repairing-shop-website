import { Link } from "react-router-dom";
import { ArrowUpRight, Clock } from "lucide-react";
import { price } from "../../lib/siteConfig";
import ServiceArt from "../art/ServiceArt";
import { cn } from "../../lib/cn";

/**
 * The catalogue card, shared by the home preview and the services index.
 * The whole card is one link so the entire surface is a valid tap target.
 */
export default function ServiceCard({ service, className }) {
  const Icon = service.icon;
  const isVolt = service.accent === "volt";

  return (
    <Link
      to={`/services/${service.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-ink-900 p-7",
        "transition-all duration-400 hover:-translate-y-1.5 hover:border-brand-500/40 hover:bg-ink-800",
        "hover:shadow-[0_24px_60px_-30px_rgba(255,106,0,0.55)]",
        className,
      )}
    >
      {/* Accent wash that fades in on hover */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
          isVolt ? "bg-volt-500/25" : "bg-brand-500/25",
        )}
      />

      {/* The part this service touches, sitting behind the copy */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-8 -right-8 size-44 text-white opacity-[0.07] transition-all duration-500 group-hover:-translate-y-1 group-hover:opacity-20"
      >
        <ServiceArt slug={service.slug} strokeWidth={5} />
      </span>

      <div className="relative flex items-start justify-between">
        <span
          className={cn(
            "grid size-14 place-items-center rounded-xl border transition-colors duration-400",
            isVolt
              ? "border-volt-400/25 bg-volt-500/10 text-volt-300"
              : "border-brand-500/25 bg-brand-500/10 text-brand-400",
            "group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-white",
          )}
        >
          <Icon size={26} strokeWidth={1.7} />
        </span>
        <ArrowUpRight
          size={22}
          className="translate-y-1 text-ink-600 opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:text-brand-400 group-hover:opacity-100"
        />
      </div>

      <h3 className="relative mt-6 text-2xl font-semibold leading-tight text-white">
        {service.name}
      </h3>
      <p className="relative mt-3 flex-1 leading-relaxed text-ink-400">{service.short}</p>

      <div className="relative mt-6 flex items-center justify-between border-t border-white/8 pt-5">
        <span className="font-display text-lg font-semibold text-white">
          {service.from > 0 ? (
            <>
              <span className="text-xs font-normal uppercase tracking-widest text-ink-500">from </span>
              {price(service.from)}
            </>
          ) : (
            <span className="text-brand-400">No call-out fee</span>
          )}
        </span>
        <span className="flex items-center gap-1.5 text-xs text-ink-500">
          <Clock size={13} /> {service.duration}
        </span>
      </div>
    </Link>
  );
}
