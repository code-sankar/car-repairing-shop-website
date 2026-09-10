import { useId } from "react";
import { MapPin, Navigation } from "lucide-react";
import { formatAddress, site } from "../../lib/siteConfig";
import { cn } from "../../lib/cn";

/**
 * Stylised location panel. A production build drops a live map embed in here;
 * this keeps the demo self-contained with no third-party script or API key.
 */
export default function MapPanel({ className }) {
  const uid = useId().replace(/:/g, "");

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900", className)}>
      <svg viewBox="0 0 800 500" className="size-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={`${uid}-land`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#141b24" />
            <stop offset="100%" stopColor="#0b0f14" />
          </linearGradient>
        </defs>

        <rect width="800" height="500" fill={`url(#${uid}-land)`} />

        {/* River */}
        <path
          d="M -20 96 C 140 66 260 128 420 108 C 560 90 660 132 820 112 L 820 44 L -20 44 Z"
          fill="#12303f"
          opacity="0.85"
        />
        <path
          d="M -20 96 C 140 66 260 128 420 108 C 560 90 660 132 820 112"
          stroke="var(--color-volt-500)"
          strokeWidth="2"
          fill="none"
          opacity="0.4"
        />

        {/* Blocks */}
        <g fill="#1b2530" opacity="0.85">
          {[
            [60, 190, 150, 90], [240, 176, 120, 104], [390, 190, 96, 76], [516, 172, 140, 108],
            [686, 186, 130, 92], [60, 316, 118, 110], [208, 300, 160, 126], [398, 316, 110, 96],
            [538, 300, 124, 126], [692, 320, 120, 106],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="6" />
          ))}
        </g>

        {/* Roads */}
        <g stroke="#2c3947" strokeLinecap="round">
          <path d="M -20 290 H 820" strokeWidth="22" />
          <path d="M 380 -20 V 520" strokeWidth="16" />
          <path d="M 190 160 V 520 M 660 160 V 520" strokeWidth="10" />
          <path d="M -20 160 H 820" strokeWidth="8" />
        </g>
        <g stroke="var(--color-brand-500)" strokeWidth="2" strokeDasharray="14 16" opacity="0.5">
          <path d="M -20 290 H 820" />
        </g>

        <text x="404" y="470" fill="#4b5666" fontSize="15" letterSpacing="4" fontFamily="var(--font-display)">
          GS ROAD
        </text>
      </svg>

      {/* Pin */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
        <span className="relative grid place-items-center">
          <span className="absolute size-14 animate-pulse-ring rounded-full bg-brand-500/50" />
          <span className="relative grid size-12 place-items-center rounded-full border-2 border-white bg-brand-500 text-white shadow-xl">
            <MapPin size={22} />
          </span>
        </span>
      </div>

      {/* Address card */}
      <div className="glass edge absolute inset-x-4 bottom-4 flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-display text-lg font-semibold text-white">{site.name}</p>
          <p className="mt-0.5 truncate text-sm text-ink-300">{formatAddress()}</p>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formatAddress())}`}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-400"
        >
          <Navigation size={15} /> Directions
        </a>
      </div>
    </div>
  );
}
