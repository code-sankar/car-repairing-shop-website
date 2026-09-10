import { useId } from "react";
import { cn } from "../../lib/cn";

/** Body outline shared with the hero illustration, drawn as technical line art. */
const BODY = `M 46 240
  C 40 216 43 196 57 187
  L 80 177
  C 146 163 232 152 300 147
  L 418 88
  C 434 80 452 76 472 75
  L 600 73
  C 628 73 650 80 666 96
  L 726 150
  L 830 160
  C 856 164 868 182 866 208
  L 864 238
  L 772 238
  A 72 72 0 0 0 628 238
  L 277 238
  A 72 72 0 0 0 133 238 Z`;

/**
 * Blueprint rendering of the car with a dimension rule beneath it. Used as the
 * canvas for the interactive inspection hotspots.
 */
export default function BlueprintCar({ className, children }) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 920 340" className={cn("w-full", className)} fill="none" aria-hidden="true">
      <defs>
        <pattern id={`${uid}-grid`} width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.16" />
        </pattern>
      </defs>

      <rect width="920" height="340" fill={`url(#${uid}-grid)`} className="text-volt-400" />

      {/* Body and glass, stroke only */}
      <path d={BODY} stroke="currentColor" strokeWidth="2.2" className="text-volt-400" strokeLinejoin="round" />
      <path d={BODY} fill="currentColor" className="text-volt-500" opacity="0.07" />
      <path d="M 322 141 L 428 96 L 512 94 L 512 141 Z" stroke="currentColor" strokeWidth="1.6" className="text-volt-400" opacity="0.75" />
      <path d="M 530 94 L 602 92 C 626 92 644 100 658 118 L 680 141 L 530 141 Z" stroke="currentColor" strokeWidth="1.6" className="text-volt-400" opacity="0.75" />

      {/* Wheels as construction circles */}
      {[205, 700].map((cx) => (
        <g key={cx} className="text-volt-400">
          <circle cx={cx} cy="246" r="64" stroke="currentColor" strokeWidth="2" opacity="0.85" />
          <circle cx={cx} cy="246" r="42" stroke="currentColor" strokeWidth="1.2" opacity="0.5" />
          <circle cx={cx} cy="246" r="4" fill="currentColor" />
          <path d={`M ${cx - 74} 246 H ${cx + 74} M ${cx} 172 V 320`} stroke="currentColor" strokeWidth="0.8" strokeDasharray="5 6" opacity="0.4" />
        </g>
      ))}

      {/* Panel gaps */}
      <g className="text-volt-400" opacity="0.5">
        <path d="M 318 146 L 313 233" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 521 141 L 519 235" stroke="currentColor" strokeWidth="1.2" />
        <path d="M 690 148 L 697 232" stroke="currentColor" strokeWidth="1.2" />
      </g>

      {/* Wheelbase dimension rule */}
      <g className="text-volt-400" opacity="0.65">
        <path d="M 205 300 H 700" stroke="currentColor" strokeWidth="1" />
        <path d="M 205 294 V 306 M 700 294 V 306" stroke="currentColor" strokeWidth="1.6" />
        <text x="452" y="322" textAnchor="middle" fill="currentColor" fontSize="15" letterSpacing="3" fontFamily="var(--font-display)">
          WHEELBASE
        </text>
      </g>

      {children}
    </svg>
  );
}
