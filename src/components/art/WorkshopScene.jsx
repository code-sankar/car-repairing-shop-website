import { useId } from "react";
import { CarBody } from "./CarSilhouette";
import { cn } from "../../lib/cn";

/* Hand tools for the pegboard — drawn as filled silhouettes. */
function Spanner({ x, y, scale = 1, rotate = 0 }) {
  return (
    <path
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}
      d="M 0 0 a 11 11 0 1 0 8 18 l 0 46 a 6 6 0 0 0 12 0 l 0 -46 a 11 11 0 1 0 8 -18 l -7 10 -7 0 -7 -10 z"
    />
  );
}

function Wrench({ x, y, scale = 1, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M 15 0 a 14 14 0 0 0 -14 14 l 0 10 10 0 0 -10 8 0 0 10 10 0 0 -10 a 14 14 0 0 0 -14 -14 z" />
      <rect x="10" y="24" width="10" height="48" rx="4" />
    </g>
  );
}

function Screwdriver({ x, y, scale = 1, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <rect x="0" y="0" width="17" height="32" rx="7" />
      <rect x="5" y="32" width="7" height="32" />
      <path d="M 3.5 64 h 10 l -2.5 9 h -5 z" />
    </g>
  );
}

function Pliers({ x, y, scale = 1, rotate = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path d="M 4 0 l 7 26 -3 40 a 5 5 0 0 0 10 0 l 4 -40 6 -26 -6 0 -6 22 -6 -22 z" />
    </g>
  );
}

/**
 * The workshop floor: a car raised on a two-post lift, a tool wall, a roller
 * cabinet, an oil drain and a stack of tyres. Every element is drawn, so the
 * whole scene ships as one inline SVG rather than a photograph.
 */
export default function WorkshopScene({ className, carType = "suv", bay = "BAY 03" }) {
  const uid = useId().replace(/:/g, "");

  // Car placement, and the lift geometry derived from it. The underside of
  // the body sits at a different height per body style, so the arms follow it.
  const carX = 268;
  const carY = 78;
  const k = 1.52;
  const bodyUnderside = { hatchback: 80, sedan: 80, suv: 70, luxury: 79 };
  const sillY = carY + (bodyUnderside[carType] ?? 76) * k;

  return (
    <svg
      viewBox="0 0 900 420"
      className={cn("w-full", className)}
      fill="none"
      role="img"
      aria-label="Illustration of a car raised on a two-post lift inside the workshop"
    >
      <defs>
        <linearGradient id={`${uid}-floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.12" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-car`} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.24" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
        <pattern id={`${uid}-peg`} width="15" height="15" patternUnits="userSpaceOnUse">
          <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" opacity="0.3" />
        </pattern>
      </defs>

      <g stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
        {/* ---- Back wall -------------------------------------------- */}
        <path d="M 0 54 H 900" opacity="0.16" strokeWidth="2" />

        {/* Pegboard and hanging tools */}
        <rect x="28" y="66" width="192" height="156" rx="7" opacity="0.5" />
        <rect x="28" y="66" width="192" height="156" fill={`url(#${uid}-peg)`} stroke="none" />
        <path d="M 28 146 H 220" opacity="0.3" strokeWidth="2" />
        <g fill="currentColor" fillOpacity="0.5" strokeWidth="2" opacity="0.9">
          <Spanner x={58} y={82} scale={0.7} />
          <Wrench x={100} y={82} scale={0.64} />
          <Screwdriver x={150} y={82} scale={0.64} />
          <Pliers x={192} y={82} scale={0.6} />
          <Wrench x={58} y={162} scale={0.58} />
          <Spanner x={110} y={162} scale={0.62} />
          <Screwdriver x={158} y={162} scale={0.58} />
        </g>

        {/* Bay sign */}
        <rect x="744" y="86" width="128" height="40" rx="7" opacity="0.5" />
        <text
          x="808" y="113"
          textAnchor="middle"
          fill="var(--color-brand-500)"
          stroke="none"
          fontSize="21"
          fontWeight="700"
          letterSpacing="4"
          fontFamily="var(--font-display)"
        >
          {bay}
        </text>

        {/* ---- Two-post lift ---------------------------------------- */}
        <g stroke="var(--color-brand-500)">
          <rect x="242" y="92" width="28" height="252" rx="4" />
          <rect x="676" y="92" width="28" height="252" rx="4" />
          <rect x="242" y="76" width="462" height="18" rx="5" />
          <path d="M 222 344 h 68 M 656 344 h 68" strokeWidth="9" strokeLinecap="round" />
          {/* Arms run in below the wheels, then rise to pads under the sill */}
          <path d={`M 270 ${sillY + 52} h 162 v -46`} strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M 676 ${sillY + 52} h -160 v -46`} strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M 420 ${sillY + 4} h 24 M 504 ${sillY + 4} h 24`} strokeWidth="9" strokeLinecap="round" />
        </g>
        <g opacity="0.3" strokeWidth="2">
          {Array.from({ length: 9 }, (_, i) => (
            <path key={i} d={`M 247 ${116 + i * 24} h 18 M 681 ${116 + i * 24} h 18`} />
          ))}
        </g>

        {/* ---- The raised car --------------------------------------- */}
        <g transform={`translate(${carX} ${carY}) scale(${k})`} className="text-white">
          <CarBody type={carType} strokeWidth={2.4} fillId={`${uid}-car`} />
        </g>

        {/* ---- Oil drain trolley under the car ---------------------- */}
        <g>
          <path d="M 438 300 h 84 l -10 26 h -64 z" />
          <rect x="466" y="286" width="28" height="14" rx="4" opacity="0.6" />
          <path d="M 480 268 c 0 0 -9 12 -9 18 a 9 9 0 0 0 18 0 c 0 -6 -9 -18 -9 -18 z" fill="var(--color-brand-500)" stroke="var(--color-brand-500)" />
          <circle cx="452" cy="332" r="8" />
          <circle cx="508" cy="332" r="8" />
        </g>

        {/* ---- Roller cabinet --------------------------------------- */}
        <g>
          <rect x="742" y="218" width="140" height="112" rx="8" />
          <path d="M 742 254 h 140 M 742 292 h 140" opacity="0.45" strokeWidth="2" />
          <path d="M 784 236 h 56 M 784 274 h 56 M 784 312 h 56" strokeLinecap="round" strokeWidth="5" opacity="0.6" />
          <rect x="758" y="202" width="108" height="16" rx="5" opacity="0.55" />
          <circle cx="770" cy="338" r="9" />
          <circle cx="854" cy="338" r="9" />
        </g>

        {/* ---- Tyre stack ------------------------------------------- */}
        <g opacity="0.8">
          {[0, 1, 2].map((i) => {
            const cy = 330 - i * 32;
            return (
              <g key={i}>
                <path d={`M 66 ${cy - 15} v 26 a 56 15 0 0 0 112 0 v -26 z`} />
                <ellipse cx="122" cy={cy - 15} rx="56" ry="15" />
                <ellipse cx="122" cy={cy - 15} rx="24" ry="7" opacity="0.55" />
              </g>
            );
          })}
        </g>

        {/* ---- Floor ------------------------------------------------- */}
        <path d="M 0 344 H 900" strokeWidth="4" stroke="var(--color-brand-500)" opacity="0.5" />
        <rect x="0" y="346" width="900" height="74" fill={`url(#${uid}-floor)`} stroke="none" />
        <g opacity="0.16" strokeWidth="2">
          <path d="M 40 368 h 130 M 210 388 h 190 M 440 368 h 150 M 630 390 h 210" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
