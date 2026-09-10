import { useId } from "react";
import { cn } from "../../lib/cn";

const SILHOUETTE = `M 46 240 C 40 216 43 196 57 187 L 80 177 C 146 163 232 152 300 147
  L 418 88 C 434 80 452 76 472 75 L 600 73 C 628 73 650 80 666 96 L 726 150 L 830 160
  C 856 164 868 182 866 208 L 864 238 L 772 238 A 72 72 0 0 0 628 238 L 277 238
  A 72 72 0 0 0 133 238 Z`;

/** Per-category foreground motif, drawn over the shared backdrop. */
function Motif({ art, uid, repaired }) {
  switch (art) {
    case "panel":
      return (
        <g>
          <g transform="translate(48 52) scale(0.65)" opacity="0.9">
            <path d={SILHOUETTE} fill={`url(#${uid}-body)`} stroke="#fff" strokeOpacity="0.35" strokeWidth="2.5" />
            {/* The damaged quarter panel, or the repaired blend */}
            <path
              d="M 726 150 L 830 160 C 856 164 868 182 866 208 L 864 238 L 772 238 Z"
              fill={repaired ? "var(--color-brand-500)" : "#6b1616"}
              opacity={repaired ? "0.55" : "0.8"}
            />
            {!repaired && (
              <g stroke="#ffd7d7" strokeWidth="3" strokeLinecap="round" opacity="0.85">
                <path d="M 790 176 l 34 22 M 800 210 l 44 -14 M 818 160 l 8 40" />
              </g>
            )}
          </g>
          {/* Paint chips */}
          <g transform="translate(52 300)">
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={i * 46} y="0" width="38" height="38" rx="7"
                fill="#fff" opacity={repaired ? 0.14 + i * 0.06 : 0.08} />
            ))}
          </g>
        </g>
      );

    case "diagnostic":
      return (
        <g>
          <path
            d="M 40 200 h 70 l 22 -70 22 140 26 -100 20 60 24 -34 h 60 l 20 44 24 -80 22 60 h 90 l 18 -30 20 46 h 90"
            fill="none" stroke="var(--color-volt-300)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"
          />
          <g fill="var(--color-volt-300)">
            <circle cx="176" cy="130" r="7" />
            <circle cx="356" cy="126" r="7" />
          </g>
          <g transform="translate(40 260)" fontFamily="monospace" fontSize="20" fill="#fff" opacity="0.4">
            <text y="0">P0302 · CYL 2 MISFIRE</text>
            <text y="30">FUEL TRIM +14.2%</text>
          </g>
          <g opacity="0.5">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={i} x={520 + i * 22} y={300 - i * 34} width="12" height={20 + i * 34} rx="4" fill="var(--color-volt-400)" />
            ))}
          </g>
        </g>
      );

    case "brakes":
      return (
        <g transform="translate(300 190)">
          <circle r="140" fill="none" stroke="#fff" strokeWidth="3" opacity="0.18" />
          <circle r="118" fill={`url(#${uid}-metal)`} />
          <circle r="118" fill="none" stroke="#fff" strokeWidth="2" opacity="0.3" />
          {Array.from({ length: 40 }, (_, i) => (
            <rect key={i} x="-2" y="-112" width="4" height="26" rx="2" fill="#000" opacity="0.35"
              transform={`rotate(${i * 9})`} />
          ))}
          <circle r="52" fill="#0d1117" stroke="#fff" strokeWidth="2" strokeOpacity="0.25" />
          {[0, 72, 144, 216, 288].map((a) => (
            <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 34} cy={Math.sin((a * Math.PI) / 180) * 34} r="8" fill="#fff" opacity="0.25" />
          ))}
          <path d="M -142 -46 a 146 146 0 0 0 0 92 l 38 0 a 108 108 0 0 1 0 -92 z" fill="var(--color-brand-500)" />
        </g>
      );

    case "detail":
      return (
        <g>
          <g transform="translate(50 66) scale(0.63)">
            <path d={SILHOUETTE} fill={`url(#${uid}-body)`} stroke="#fff" strokeOpacity="0.4" strokeWidth="2.5" />
            <path d="M 100 172 C 200 156 320 146 420 88 L 600 72" stroke="#fff" strokeWidth="10" strokeLinecap="round" opacity="0.5" />
          </g>
          {/* Water beading on a coated surface */}
          <g fill="#fff">
            {[[70, 300, 13], [120, 322, 9], [178, 296, 16], [236, 326, 7], [286, 302, 11], [348, 322, 14], [412, 300, 8], [470, 320, 12], [530, 298, 10]].map(([cx, cy, r], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r={r} opacity="0.28" />
                <circle cx={cx - r / 3} cy={cy - r / 3} r={r / 3} opacity="0.5" />
              </g>
            ))}
          </g>
        </g>
      );

    case "underbody":
      return (
        <g>
          <g transform="translate(58 58) scale(0.6)">
            <path d={SILHOUETTE} fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="2.5" strokeDasharray="10 8" />
          </g>
          {/* Four-post lift */}
          <g stroke="var(--color-brand-500)" strokeWidth="9" strokeLinecap="round">
            <path d="M 92 248 v 96 M 556 248 v 96" />
            <path d="M 56 344 h 72 M 520 344 h 72" strokeWidth="12" />
          </g>
          <path d="M 72 248 h 504" stroke="#fff" strokeWidth="7" opacity="0.35" strokeLinecap="round" />
          <g fill="var(--color-brand-400)" opacity="0.85">
            {[150, 260, 370, 480].map((x) => <circle key={x} cx={x} cy="248" r="7" />)}
          </g>
        </g>
      );

    case "ac":
      return (
        <g>
          <g transform="translate(300 190)" stroke="var(--color-volt-300)" strokeWidth="7" strokeLinecap="round" fill="none">
            {[0, 60, 120].map((a) => (
              <g key={a} transform={`rotate(${a})`}>
                <path d="M 0 -110 V 110" />
                <path d="M -22 -84 L 0 -110 L 22 -84" />
                <path d="M -22 84 L 0 110 L 22 84" />
              </g>
            ))}
          </g>
          {/* Condenser fins */}
          <g opacity="0.28">
            {Array.from({ length: 16 }, (_, i) => (
              <rect key={i} x={40 + i * 34} y="286" width="18" height="76" rx="5" fill="var(--color-volt-400)" />
            ))}
          </g>
        </g>
      );

    default:
      return null;
  }
}

/**
 * Generated cover art for a case study. Each category gets its own composition,
 * tinted by `hue`, so the gallery reads as a set without a single photograph.
 */
export default function WorkArt({ art = "panel", hue = 20, repaired = true, className }) {
  const uid = useId().replace(/:/g, "");

  return (
    <svg viewBox="0 0 640 400" className={cn("size-full", className)} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 58% 24%)`} />
          <stop offset="52%" stopColor={`hsl(${hue} 40% 12%)`} />
          <stop offset="100%" stopColor="#0a0d12" />
        </linearGradient>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.30)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
        </linearGradient>
        <radialGradient id={`${uid}-metal`}>
          <stop offset="0%" stopColor="#aab6c6" />
          <stop offset="70%" stopColor="#5d6a7b" />
          <stop offset="100%" stopColor="#39434f" />
        </radialGradient>
        <pattern id={`${uid}-grid`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#fff" strokeWidth="0.7" opacity="0.09" />
        </pattern>
      </defs>

      <rect width="640" height="400" fill={`url(#${uid}-bg)`} />
      <rect width="640" height="400" fill={`url(#${uid}-grid)`} />
      <Motif art={art} uid={uid} repaired={repaired} />
    </svg>
  );
}
