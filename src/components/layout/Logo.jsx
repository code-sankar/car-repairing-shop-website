import { Link } from "react-router-dom";
import { site } from "../../lib/siteConfig";
import { cn } from "../../lib/cn";

/** Wordmark plus the shield-and-spanner device used in the favicon. */
export default function Logo({ className, compact = false }) {
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-3", className)}
      aria-label={`${site.name} — home`}
    >
      <span className="relative grid size-11 shrink-0 place-items-center">
        <svg viewBox="0 0 64 64" className="size-11" aria-hidden="true">
          <path
            d="M32 6 12 17v16c0 13.7 8.6 23.4 20 25 11.4-1.6 20-11.3 20-25V17z"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            className="text-brand-500 transition-colors duration-300 group-hover:text-brand-400"
          />
          <path
            d="M23 36h18M26.5 29l-3.5 7 3.5 7M37.5 29l3.5 7-3.5 7"
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white"
          />
        </svg>
      </span>

      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-2xl font-bold uppercase tracking-tight text-white">
            {site.name.split(" ")[0]}
            <span className="text-brand-500">.</span>
          </span>
          <span className="mt-1 font-display text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-ink-400">
            {site.name.split(" ").slice(1).join(" ")}
          </span>
        </span>
      )}
    </Link>
  );
}
