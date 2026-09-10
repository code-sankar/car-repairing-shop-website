import { useId } from "react";
import { cn } from "../../lib/cn";

/**
 * Two tread tracks running across the width, as if a car has just driven
 * through. Used as a decorative rule where a plain divider would be flat.
 */
export default function TyreTrack({ className, height = 64 }) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg
      viewBox="0 0 1200 64"
      preserveAspectRatio="none"
      className={cn("w-full", className)}
      style={{ height }}
      aria-hidden="true"
      fill="currentColor"
    >
      <defs>
        {/* One repeat of the tread: angled blocks either side of a centre rib */}
        <pattern id={`${uid}-tread`} width="34" height="22" patternUnits="userSpaceOnUse">
          <rect x="0" y="9.5" width="34" height="3" opacity="0.5" />
          <path d="M 2 1 h 12 l -3 7 h -12 z" />
          <path d="M 20 1 h 12 l -3 7 h -12 z" />
          <path d="M 5 14 h 12 l -3 7 h -12 z" />
          <path d="M 23 14 h 12 l -3 7 h -12 z" />
        </pattern>
        <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="18%" stopColor="#000" stopOpacity="1" />
          <stop offset="82%" stopColor="#000" stopOpacity="1" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </linearGradient>
        <mask id={`${uid}-mask`}>
          <rect width="1200" height="64" fill={`url(#${uid}-fade)`} />
        </mask>
      </defs>

      <g mask={`url(#${uid}-mask)`}>
        <rect x="0" y="4" width="1200" height="22" fill={`url(#${uid}-tread)`} />
        <rect x="0" y="38" width="1200" height="22" fill={`url(#${uid}-tread)`} />
      </g>
    </svg>
  );
}
