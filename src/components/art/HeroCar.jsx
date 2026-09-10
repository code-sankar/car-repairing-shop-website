import { useId } from "react";
import { cn } from "../../lib/cn";

/** One alloy wheel: tire, rim barrel, five spokes, brake disc and caliper. */
function Wheel({ cx, cy, spin, uid }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r="64" fill={`url(#${uid}-tire)`} />
      {/* Tread blocks around the shoulder */}
      <g stroke="#05070a" strokeWidth="3" opacity="0.75">
        {Array.from({ length: 32 }, (_, i) => (
          <path
            key={i}
            d={`M ${cx} ${cy - 64} v 9`}
            transform={`rotate(${i * 11.25} ${cx} ${cy})`}
          />
        ))}
      </g>
      <circle cx={cx} cy={cy} r="64" fill="none" stroke="#05070a" strokeWidth="2" />
      <circle cx={cx} cy={cy} r="52" fill="none" stroke="#151b23" strokeWidth="2" opacity="0.9" />
      <circle cx={cx} cy={cy} r="49" fill="#0d1117" />

      {/* Brake disc and caliper visible through the spokes */}
      <circle cx={cx} cy={cy} r="35" fill="#39434f" />
      <circle cx={cx} cy={cy} r="35" fill="none" stroke="#5a6675" strokeWidth="1.5" />
      <path
        d={`M ${cx - 44} ${cy - 18} a 40 40 0 0 0 0 36 h 12 a 26 26 0 0 1 0 -36 z`}
        fill="var(--color-brand-600)"
      />
      <path d={`M ${cx - 40} ${cy - 8} h 8 M ${cx - 40} ${cy + 4} h 8`} stroke="#0d1117" strokeWidth="2" opacity="0.6" />

      <g
        className={spin ? "animate-spin-slow" : undefined}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <circle cx={cx} cy={cy} r="46" fill={`url(#${uid}-rim)`} />
        {[0, 72, 144, 216, 288].map((angle) => (
          <path
            key={angle}
            d={`M ${cx} ${cy} l -8 -43 a 43 43 0 0 1 16 0 z`}
            fill="#141a22"
            transform={`rotate(${angle} ${cx} ${cy})`}
          />
        ))}
        <circle cx={cx} cy={cy} r="46" fill="none" stroke="#8494a8" strokeWidth="2.5" />
        <circle cx={cx} cy={cy} r="13" fill="#232c37" stroke="#8494a8" strokeWidth="2" />
        <circle cx={cx} cy={cy} r="4.5" fill="var(--color-brand-500)" />
      </g>
    </g>
  );
}

/**
 * Hand-drawn side profile used as the hero visual. Everything is vector, so it
 * stays razor sharp on any display, re-themes from CSS variables, and costs one
 * inlined request instead of a multi-hundred-kilobyte photograph.
 */
export default function HeroCar({ className, spin = false, reflection = true }) {
  const uid = useId().replace(/:/g, "");
  const car = `${uid}-car`;

  return (
    <svg
      viewBox="0 0 920 470"
      className={cn("w-full", className)}
      role="img"
      aria-label="Illustration of a car in profile on a workshop floor"
      fill="none"
    >
      <defs>
        <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#5a6878" />
          <stop offset="38%" stopColor="#33404f" />
          <stop offset="100%" stopColor="#161d26" />
        </linearGradient>
        <linearGradient id={`${uid}-glass`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="#9cc4dd" stopOpacity="0.6" />
          <stop offset="55%" stopColor="#31435a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#161f2b" stopOpacity="0.96" />
        </linearGradient>
        <linearGradient id={`${uid}-tire`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor="#2b333e" />
          <stop offset="100%" stopColor="#0a0e13" />
        </linearGradient>
        <radialGradient id={`${uid}-rim`}>
          <stop offset="0%" stopColor="#a3b1c2" />
          <stop offset="68%" stopColor="#5e6c7e" />
          <stop offset="100%" stopColor="#3c4653" />
        </radialGradient>
        <linearGradient id={`${uid}-sheen`} x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="40%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-floor`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-brand-500)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-brand-500)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--color-brand-500)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id={`${uid}-reflect-mask`}>
          <rect x="0" y="312" width="920" height="160" fill={`url(#${uid}-fade)`} />
        </mask>
        <filter id={`${uid}-soft`} x="-70%" y="-70%" width="240%" height="240%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
        <filter id={`${uid}-blur-sm`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>

      {/* ---- The car, defined once so the floor can reuse it -------------- */}
      <g id={car}>
        {/* Contact shadow */}
        <ellipse cx="460" cy="308" rx="345" ry="16" fill="#000" opacity="0.6" filter={`url(#${uid}-soft)`} />

        <path
          d="M 48 238
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
             A 72 72 0 0 0 133 238 Z"
          fill={`url(#${uid}-body)`}
          stroke="#7b8b9e"
          strokeWidth="2"
          strokeLinejoin="round"
        />

        {/* Specular highlight riding the shoulder line */}
        <path
          d="M 86 176 C 168 161 252 150 302 146 L 420 88 C 436 79 454 75 474 74 L 598 72"
          stroke={`url(#${uid}-sheen)`}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Glass */}
        <path d="M 322 141 L 428 96 L 512 94 L 512 141 Z" fill={`url(#${uid}-glass)`} />
        <path d="M 530 94 L 602 92 C 626 92 644 100 658 118 L 680 141 L 530 141 Z" fill={`url(#${uid}-glass)`} />
        <path d="M 322 141 L 428 96 L 512 94 L 512 141 Z" fill="none" stroke="#8fa3b8" strokeWidth="1.6" />
        <path d="M 530 94 L 602 92 C 626 92 644 100 658 118 L 680 141 L 530 141 Z" fill="none" stroke="#8fa3b8" strokeWidth="1.6" />
        <path d="M 352 138 L 424 104 L 448 104 L 374 138 Z" fill="#dff0fb" opacity="0.2" />

        {/* Panel gaps, shoulder crease and sill shadow */}
        <path d="M 318 146 L 313 233" stroke="#7b8b9e" strokeWidth="1.5" opacity="0.75" />
        <path d="M 521 141 L 519 235" stroke="#7b8b9e" strokeWidth="1.5" opacity="0.75" />
        <path d="M 690 148 L 697 232" stroke="#7b8b9e" strokeWidth="1.5" opacity="0.6" />
        <path d="M 120 197 C 260 191 470 187 700 191 L 850 198" stroke="#94a5b8" strokeWidth="1.6" opacity="0.4" />
        <path d="M 290 236 L 616 236" stroke="#04060a" strokeWidth="8" opacity="0.6" strokeLinecap="round" />

        <rect x="440" y="156" width="34" height="8" rx="4" fill="#9dadc0" />
        <rect x="612" y="156" width="34" height="8" rx="4" fill="#9dadc0" />

        {/* Wing mirror */}
        <path d="M 322 132 L 296 126 C 288 124 286 134 294 137 L 320 143 Z" fill="#323c48" stroke="#7b8b9e" strokeWidth="1.4" />

        {/* Head and tail lamps */}
        <path d="M 60 186 C 80 183 102 181 116 181 L 119 197 C 100 198 78 200 59 202 Z" fill="#fdf8e8" />
        <path d="M 60 186 C 80 183 102 181 116 181 L 119 197 C 100 198 78 200 59 202 Z" fill="var(--color-brand-200)" opacity="0.45" />
        <path d="M 88 183 L 90 199" stroke="#0d1117" strokeWidth="2" opacity="0.35" />
        <circle cx="90" cy="191" r="17" fill="var(--color-brand-200)" opacity="0.3" filter={`url(#${uid}-blur-sm)`} />
        <path d="M 824 169 C 840 170 854 172 861 174 L 859 193 C 848 191 836 190 824 189 Z" fill="#ff4438" />
        <circle cx="844" cy="181" r="15" fill="#ff4438" opacity="0.4" filter={`url(#${uid}-blur-sm)`} />

        {/* Lower intake, tucked inside the bumper outline */}
        <path d="M 62 212 C 76 211 90 210 100 210 L 98 226 C 86 226 72 227 60 228 Z" fill="#080c11" opacity="0.85" />

        <Wheel cx={205} cy={246} spin={spin} uid={uid} />
        <Wheel cx={700} cy={246} spin={spin} uid={uid} />
      </g>

      {/* ---- Polished floor: mirrored copy plus a light bar --------------- */}
      {reflection && (
        <use
          href={`#${car}`}
          transform="matrix(1 0 0 -1 0 620)"
          mask={`url(#${uid}-reflect-mask)`}
          opacity="0.6"
        />
      )}
      <rect x="60" y="309" width="800" height="2" fill={`url(#${uid}-floor)`} opacity="0.55" />
    </svg>
  );
}
