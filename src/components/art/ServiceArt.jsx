import { useId } from "react";
import { cn } from "../../lib/cn";

/**
 * Line-art illustrations of the actual part each service touches. Drawn to a
 * shared 200 x 200 grid with one stroke weight so the whole set reads as one
 * system, and coloured from `currentColor` plus the brand accent.
 */

const A = "var(--color-brand-500)"; // accent fill

function Engine() {
  return (
    <g>
      {/* Cam cover */}
      <rect x="52" y="40" width="86" height="30" rx="6" />
      <path d="M 66 40 v 30 M 80 40 v 30 M 94 40 v 30 M 108 40 v 30 M 122 40 v 30" opacity="0.45" />
      {/* Block */}
      <path d="M 44 70 h 104 a 8 8 0 0 1 8 8 v 42 a 8 8 0 0 1 -8 8 h -104 a 8 8 0 0 1 -8 -8 v -42 a 8 8 0 0 1 8 -8 z" />
      {/* Oil pan */}
      <path d="M 56 128 h 80 l -10 26 a 6 6 0 0 1 -6 4 h -48 a 6 6 0 0 1 -6 -4 z" />
      {/* Exhaust manifold */}
      <path d="M 156 84 c 16 0 16 12 26 12 M 156 104 c 16 0 16 -12 26 -12 M 182 96 v 26" strokeLinecap="round" />
      {/* Belt and pulleys */}
      <circle cx="36" cy="92" r="14" />
      <circle cx="36" cy="92" r="5" fill={A} stroke="none" />
      <circle cx="30" cy="126" r="8" />
      <path d="M 22 92 a 14 14 0 0 1 28 0" opacity="0.5" />
      {/* Oil filler cap */}
      <rect x="92" y="28" width="22" height="12" rx="5" fill={A} stroke="none" />
      <rect x="92" y="28" width="22" height="12" rx="5" />
    </g>
  );
}

function Scanner() {
  return (
    <g>
      {/* Handheld unit */}
      <rect x="42" y="26" width="86" height="126" rx="14" />
      <rect x="54" y="42" width="62" height="46" rx="5" fill={A} fillOpacity="0.16" />
      {/* Waveform on the screen */}
      <path d="M 58 70 h 10 l 6 -16 6 30 6 -22 5 12 5 -6 h 18" strokeWidth="3.4" stroke={A} strokeLinecap="round" strokeLinejoin="round" />
      {/* Keypad */}
      <circle cx="70" cy="108" r="8" />
      <circle cx="100" cy="108" r="8" />
      <rect x="60" y="128" width="52" height="10" rx="5" opacity="0.5" />
      {/* Lead into the OBD plug */}
      <path d="M 128 62 c 26 0 22 34 34 34" strokeLinecap="round" />
      <rect x="158" y="80" width="26" height="32" rx="5" />
      <path d="M 164 90 v 12 M 172 90 v 12 M 180 90 v 12" opacity="0.55" />
    </g>
  );
}

function BrakeDisc() {
  return (
    <g>
      <circle cx="96" cy="100" r="62" />
      <circle cx="96" cy="100" r="52" opacity="0.4" />
      <circle cx="96" cy="100" r="26" />
      <circle cx="96" cy="100" r="8" fill={A} stroke="none" />
      {/* Vent slots */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <path
          key={a}
          d="M 96 48 l 0 18"
          transform={`rotate(${a} 96 100)`}
          strokeLinecap="round"
          opacity="0.6"
        />
      ))}
      {/* Wheel studs */}
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx="96" cy="82" r="4" transform={`rotate(${a} 96 100)`} opacity="0.7" />
      ))}
      {/* Caliper straddling the disc */}
      <path
        d="M 142 62 a 70 70 0 0 1 0 76 h 26 a 12 12 0 0 0 12 -12 v -52 a 12 12 0 0 0 -12 -12 z"
        fill={A}
        fillOpacity="0.28"
      />
      <path
        d="M 142 62 a 70 70 0 0 1 0 76 h 26 a 12 12 0 0 0 12 -12 v -52 a 12 12 0 0 0 -12 -12 z"
        stroke={A}
      />
      {/* Pad face and pistons */}
      <path d="M 146 74 a 58 58 0 0 1 0 52" strokeWidth="7" opacity="0.6" />
      <circle cx="166" cy="88" r="5" opacity="0.7" />
      <circle cx="166" cy="112" r="5" opacity="0.7" />
      {/* Bleed nipple */}
      <path d="M 180 84 h 14" strokeLinecap="round" strokeWidth="5" stroke={A} />
    </g>
  );
}

function AirCon() {
  return (
    <g>
      {/* Condenser core */}
      <rect x="28" y="58" width="112" height="84" rx="8" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M ${40 + i * 12} 58 v 84`} opacity="0.35" />
      ))}
      <rect x="28" y="58" width="112" height="84" rx="8" />
      {/* Pipework */}
      <path d="M 28 78 h -14 a 8 8 0 0 0 -8 8 v 28 a 8 8 0 0 0 8 8 h 14" strokeLinecap="round" />
      {/* Snowflake */}
      <g stroke={A} strokeLinecap="round" transform="translate(148 82) scale(0.76)">
        {[0, 60, 120].map((a) => (
          <g key={a} transform={`rotate(${a})`}>
            <path d="M 0 -30 V 30" strokeWidth="4.5" />
            <path d="M -7 -22 L 0 -30 L 7 -22" strokeWidth="4" />
            <path d="M -7 22 L 0 30 L 7 22" strokeWidth="4" />
          </g>
        ))}
      </g>
    </g>
  );
}

function SprayGun() {
  return (
    <g>
      {/* Paint cup */}
      <path d="M 60 24 h 34 l -4 26 h -26 z" fill={A} fillOpacity="0.2" />
      <path d="M 60 24 h 34 l -4 26 h -26 z" />
      {/* Body */}
      <path d="M 48 50 h 58 a 10 10 0 0 1 10 10 v 14 a 10 10 0 0 1 -10 10 h -58 a 10 10 0 0 1 -10 -10 v -14 a 10 10 0 0 1 10 -10 z" />
      {/* Nozzle */}
      <path d="M 116 60 h 18 l 8 7 -8 7 h -18 z" fill={A} fillOpacity="0.3" />
      <path d="M 116 60 h 18 l 8 7 -8 7 h -18 z" />
      {/* Grip and trigger */}
      <path d="M 56 84 l -8 52 a 10 10 0 0 0 10 12 h 14 a 10 10 0 0 0 10 -12 l -8 -52" />
      <path d="M 88 88 l 10 16" strokeLinecap="round" />
      {/* Spray cone */}
      <path d="M 146 52 L 190 30 M 146 67 L 194 67 M 146 82 L 190 104" opacity="0.5" strokeLinecap="round" />
      <g fill={A} stroke="none" opacity="0.75">
        <circle cx="168" cy="46" r="3.5" />
        <circle cx="182" cy="58" r="3" />
        <circle cx="176" cy="76" r="3.5" />
        <circle cx="188" cy="90" r="3" />
        <circle cx="162" cy="88" r="3" />
      </g>
    </g>
  );
}

function Alignment() {
  return (
    <g>
      {/* Wheel, tilted to show the camber being measured */}
      <g transform="rotate(-9 100 96)">
        <circle cx="100" cy="96" r="66" />
        <circle cx="100" cy="96" r="48" opacity="0.45" />
        {/* Tread blocks around the tyre */}
        {Array.from({ length: 24 }, (_, i) => (
          <path key={i} d="M 100 30 v 14" transform={`rotate(${i * 15} 100 96)`} opacity="0.45" strokeWidth="3.4" />
        ))}
        {/* Alloy spokes */}
        {[0, 72, 144, 216, 288].map((a) => (
          <path key={a} d="M 100 96 L 88 54 a 44 44 0 0 1 24 0 z" transform={`rotate(${a} 100 96)`} opacity="0.55" />
        ))}
        <circle cx="100" cy="96" r="14" fill={A} fillOpacity="0.3" />
        <circle cx="100" cy="96" r="14" />
      </g>

      {/* True vertical, the measured angle, and the ground plane */}
      <path d="M 100 14 v 164" strokeDasharray="7 8" opacity="0.45" />
      <path d="M 100 22 a 46 46 0 0 1 11 26" stroke={A} strokeLinecap="round" />
      <path d="M 18 178 h 164" stroke={A} strokeLinecap="round" opacity="0.75" />
    </g>
  );
}

function Battery() {
  return (
    <g>
      <rect x="30" y="60" width="140" height="96" rx="10" />
      <rect x="30" y="60" width="140" height="20" rx="10" fill={A} fillOpacity="0.18" />
      {/* Terminals */}
      <rect x="50" y="44" width="24" height="18" rx="4" />
      <rect x="126" y="44" width="24" height="18" rx="4" fill={A} fillOpacity="0.35" />
      <path d="M 56 36 h 12 M 62 30 v 12" strokeLinecap="round" strokeWidth="3.6" />
      <path d="M 132 36 h 12" strokeLinecap="round" strokeWidth="3.6" />
      {/* Cell caps */}
      <path d="M 62 92 v 48 M 94 92 v 48 M 126 92 v 48" opacity="0.3" />
      {/* Charge bolt */}
      <path d="M 106 96 l -22 32 h 16 l -8 26 26 -36 h -16 z" fill={A} stroke="none" />
      <path d="M 106 96 l -22 32 h 16 l -8 26 26 -36 h -16 z" strokeWidth="3" strokeLinejoin="round" />
    </g>
  );
}

function Polish() {
  return (
    <g>
      {/* Bonnet surface */}
      <path d="M 12 158 C 44 122 92 104 190 108" strokeWidth="5" />
      <path d="M 12 176 C 46 142 96 124 190 128" opacity="0.3" />

      {/* Rotary polisher */}
      <g>
        <ellipse cx="84" cy="120" rx="46" ry="15" fill={A} fillOpacity="0.2" />
        <ellipse cx="84" cy="120" rx="46" ry="15" />
        <path d="M 38 120 v -10 a 46 15 0 0 1 92 0 v 10" />
        {/* Motor body, side handle and top grip */}
        <rect x="64" y="62" width="40" height="42" rx="11" />
        <path d="M 104 78 h 30" strokeWidth="9" strokeLinecap="round" />
        <rect x="74" y="44" width="20" height="18" rx="7" fill={A} fillOpacity="0.3" />
        <rect x="74" y="44" width="20" height="18" rx="7" />
        {/* Rotation arrows */}
        <path d="M 40 100 a 30 30 0 0 1 8 -14" stroke={A} strokeLinecap="round" />
        <path d="M 34 92 l 6 8 8 -4" stroke={A} strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Water beading on the finished half */}
      <g>
        {[[142, 132, 11], [166, 126, 8], [186, 138, 9]].map(([cx, cy, r]) => (
          <g key={cx}>
            <path d={`M ${cx - r} ${cy + r * 0.45} a ${r} ${r} 0 1 1 ${r * 2} 0 z`} fill={A} fillOpacity="0.2" />
            <path d={`M ${cx - r} ${cy + r * 0.45} a ${r} ${r} 0 1 1 ${r * 2} 0 z`} strokeWidth="3.4" />
          </g>
        ))}
      </g>

      {/* Four-point sparkles on the corrected paint */}
      <g fill={A} stroke="none">
        <path d="M 156 44 c 2 12 5 15 17 17 -12 2 -15 5 -17 17 -2 -12 -5 -15 -17 -17 12 -2 15 -5 17 -17 z" />
        <path d="M 122 74 c 1.4 8 3.4 10 11 11 -7.6 1.4 -9.6 3.4 -11 11 -1.4 -7.6 -3.4 -9.6 -11 -11 7.6 -1.4 9.6 -3.4 11 -11 z" opacity="0.75" />
      </g>
    </g>
  );
}

function Clutch() {
  /** Cog outline generated from tooth count so the teeth stay even. */
  const cog = (cx, cy, rOuter, rInner, teeth) => {
    const pts = [];
    for (let i = 0; i < teeth; i += 1) {
      const a0 = (i * 2 * Math.PI) / teeth;
      const step = (2 * Math.PI) / teeth / 4;
      [
        [rInner, a0],
        [rOuter, a0 + step * 0.85],
        [rOuter, a0 + step * 2.15],
        [rInner, a0 + step * 3],
      ].forEach(([r, a]) => pts.push(`${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`));
    }
    return `M ${pts.join(" L ")} Z`;
  };

  return (
    <g>
      {/* Large drive gear */}
      <path d={cog(84, 96, 62, 50, 14)} fill={A} fillOpacity="0.12" strokeLinejoin="round" />
      <circle cx="84" cy="96" r="34" opacity="0.45" />
      <circle cx="84" cy="96" r="16" fill={A} fillOpacity="0.3" />
      <circle cx="84" cy="96" r="16" />
      {/* Lightening holes */}
      {[0, 90, 180, 270].map((a) => (
        <circle key={a} cx="84" cy="70" r="6" transform={`rotate(${a} 84 96)`} opacity="0.55" />
      ))}

      {/* Meshing pinion */}
      <path d={cog(163, 148, 38, 30, 10)} fill={A} fillOpacity="0.12" strokeLinejoin="round" />
      <circle cx="163" cy="148" r="18" opacity="0.5" />
      <circle cx="163" cy="148" r="8" fill={A} stroke="none" />

      {/* Output shaft with splines */}
      <path d="M 84 96 L 30 42" strokeLinecap="round" strokeWidth="7" opacity="0.5" />
      <path d="M 24 36 l 16 0 M 24 36 l 0 16" strokeLinecap="round" opacity="0.5" />
    </g>
  );
}

function ClaimShield() {
  return (
    <g>
      {/* Document behind */}
      <path d="M 34 30 h 66 l 22 22 v 72 h -88 z" opacity="0.45" />
      <path d="M 100 30 v 22 h 22" opacity="0.45" />
      <path d="M 50 66 h 46 M 50 82 h 46 M 50 98 h 30" opacity="0.4" strokeLinecap="round" />
      {/* Shield */}
      <path d="M 130 62 l 44 18 v 34 c 0 26 -18 42 -44 50 -26 -8 -44 -24 -44 -50 v -34 z" fill={A} fillOpacity="0.16" />
      <path d="M 130 62 l 44 18 v 34 c 0 26 -18 42 -44 50 -26 -8 -44 -24 -44 -50 v -34 z" />
      <path d="M 112 118 l 13 14 24 -30" stroke={A} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function Inspect() {
  return (
    <g>
      {/* Small car under the lens */}
      <path d="M 26 122 c -2 -8 0 -14 6 -17 l 12 -4 c 12 -5 26 -8 36 -9 l 14 -14 c 4 -3 9 -5 14 -5 h 28 c 6 0 10 2 13 6 l 10 15 20 3 c 5 2 7 6 7 11 v 14 h -16 a 14 14 0 0 0 -28 0 h -62 a 14 14 0 0 0 -28 0 z" />
      <circle cx="54" cy="122" r="14" />
      <circle cx="140" cy="122" r="14" />
      {/* Magnifier */}
      <circle cx="118" cy="82" r="42" fill={A} fillOpacity="0.1" />
      <circle cx="118" cy="82" r="42" strokeWidth="5" stroke={A} />
      <path d="M 149 112 l 26 26" strokeWidth="8" strokeLinecap="round" stroke={A} />
      <path d="M 102 84 l 11 12 22 -26" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
}

function TowTruck() {
  return (
    <g>
      {/* Cab and flatbed */}
      <path d="M 18 126 v -26 c 0 -5 3 -8 8 -8 h 22 l 14 -22 c 2 -3 5 -5 9 -5 h 22 c 5 0 8 3 8 8 v 27 h 76 c 5 0 8 3 8 8 v 18 h -18 a 14 14 0 0 0 -28 0 h -68 a 14 14 0 0 0 -28 0 z" />
      <path d="M 66 72 h 24 v 22 h -38 z" opacity="0.4" />
      <circle cx="58" cy="126" r="15" />
      <circle cx="158" cy="126" r="15" />
      {/* Boom and hook */}
      <path d="M 108 100 l 62 -46" strokeWidth="7" strokeLinecap="round" stroke={A} />
      <path d="M 170 54 v 20" strokeLinecap="round" stroke={A} />
      <path d="M 164 74 a 7 7 0 0 0 13 4" strokeLinecap="round" stroke={A} />
      {/* Beacon */}
      <rect x="66" y="60" width="20" height="10" rx="4" fill={A} stroke="none" />
      <path d="M 60 52 l 6 4 M 92 52 l -6 4" strokeLinecap="round" opacity="0.7" stroke={A} />
    </g>
  );
}

const registry = {
  "periodic-service": Engine,
  "engine-diagnostics": Scanner,
  "brakes-suspension": BrakeDisc,
  "ac-service": AirCon,
  "denting-painting": SprayGun,
  "wheel-alignment": Alignment,
  "battery-electrical": Battery,
  "detailing-ceramic": Polish,
  "clutch-transmission": Clutch,
  "insurance-claims": ClaimShield,
  "pre-purchase-inspection": Inspect,
  "roadside-assistance": TowTruck,
};

export default function ServiceArt({ slug, className, strokeWidth = 4, fallback = null }) {
  const Art = registry[slug];
  const uid = useId().replace(/:/g, "");
  if (!Art) return fallback;

  return (
    <svg
      viewBox="0 0 200 200"
      className={cn("size-full", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      aria-hidden="true"
      id={uid}
    >
      <Art />
    </svg>
  );
}
