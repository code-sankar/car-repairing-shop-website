import { useId } from "react";
import { cn } from "../../lib/cn";
import { bodyTypeLabel } from "../../lib/carTypes";

/**
 * Four body types drawn to the same 260 x 110 grid so they read as a set.
 * Used wherever the visitor picks what kind of car they drive — a real
 * silhouette communicates that far faster than a generic car icon.
 */
const shapes = {
  // Short, tall cabin, near-vertical tailgate, almost no rear overhang.
  hatchback: {
    wheels: [{ x: 68, y: 80 }, { x: 160, y: 80 }],
    r: 18,
    body: `M 28 80
      C 24 69 25 60 32 56
      L 46 52
      C 60 47 74 44 86 42
      L 102 20
      C 107 17 113 15 120 15
      L 164 15
      C 171 15 176 18 180 24
      L 190 46
      C 194 54 196 62 196 70
      L 196 80
      L 178 80
      A 18 18 0 0 0 142 80
      L 86 80
      A 18 18 0 0 0 50 80 Z`,
    glass: [
      "M 92 40 L 105 22 L 126 21 L 126 40 Z",
      "M 132 21 L 164 20 C 169 20 173 22 176 26 L 181 40 L 132 40 Z",
    ],
    lines: ["M 129 42 L 128 74", "M 89 42 L 88 74"],
    handles: [[110, 47], [152, 47]],
  },

  // Three-box: a flat boot deck stepping down from the roofline.
  sedan: {
    wheels: [{ x: 66, y: 80 }, { x: 192, y: 80 }],
    r: 18,
    body: `M 22 80
      C 18 69 19 60 26 56
      L 40 52
      C 58 46 78 42 94 40
      L 114 20
      C 120 16 127 14 135 14
      L 172 14
      C 178 14 183 16 186 21
      L 197 40
      L 224 42
      C 230 44 233 51 232 59
      L 232 80
      L 210 80
      A 18 18 0 0 0 174 80
      L 84 80
      A 18 18 0 0 0 48 80 Z`,
    glass: [
      "M 100 38 L 116 21 L 140 20 L 140 38 Z",
      "M 146 20 L 170 20 L 170 38 L 146 38 Z",
      "M 175 20 C 179 20 182 22 185 26 L 192 38 L 175 38 Z",
    ],
    lines: ["M 143 39 L 142 74", "M 97 40 L 96 74", "M 172 39 L 173 72"],
    handles: [[118, 45], [155, 45]],
  },

  // Tall and boxy, oversized wheels, visible ground clearance, roof rails.
  suv: {
    wheels: [{ x: 66, y: 74 }, { x: 190, y: 74 }],
    r: 24,
    body: `M 20 70
      C 16 56 17 42 26 37
      L 44 31
      C 60 27 76 25 90 24
      L 100 12
      C 104 9 109 8 115 8
      L 190 8
      C 197 8 202 10 205 15
      L 216 30
      L 228 34
      C 234 37 236 44 235 52
      L 235 70
      L 214 70
      A 24 24 0 0 0 166 70
      L 90 70
      A 24 24 0 0 0 42 70 Z`,
    glass: [
      "M 98 24 L 108 11 L 132 10 L 132 24 Z",
      "M 138 10 L 168 10 L 168 24 L 138 24 Z",
      "M 174 10 L 190 10 C 195 10 199 12 202 16 L 208 24 L 174 24 Z",
    ],
    lines: ["M 135 25 L 134 66", "M 95 26 L 94 66", "M 171 25 L 172 64"],
    handles: [[116, 32], [152, 32]],
    extras: (
      <g>
        <rect x="112" y="3" width="82" height="4" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="112" y="3" width="82" height="4" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </g>
    ),
  },

  // Long bonnet, cabin set well back, low roof flowing into a fastback tail.
  luxury: {
    wheels: [{ x: 58, y: 79 }, { x: 204, y: 79 }],
    r: 19,
    body: `M 14 79
      C 10 69 11 60 19 56
      L 40 50
      C 72 42 106 37 128 34
      L 150 20
      C 158 16 167 14 177 14
      L 192 14
      C 205 14 215 19 223 30
      L 240 56
      C 245 64 246 72 245 79
      L 224 79
      A 19 19 0 0 0 186 79
      L 78 79
      A 19 19 0 0 0 40 79 Z`,
    glass: [
      "M 138 33 L 152 22 L 172 21 L 172 33 Z",
      "M 178 21 L 192 21 C 201 21 209 25 215 33 L 178 33 Z",
    ],
    lines: ["M 175 34 L 176 74", "M 134 34 L 133 74"],
    handles: [[152, 41], [196, 41]],
  },
};

/**
 * Just the drawing, in the 260 x 110 grid, so other scenes can place a car
 * inside their own coordinate space with a transform.
 */
export function CarBody({ type = "sedan", detailed = true, strokeWidth = 2.6, fillId }) {
  const shape = shapes[type] || shapes.sedan;

  return (
    <g>
      <path
        d={shape.body}
        fill={fillId ? `url(#${fillId})` : "none"}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />

      {shape.extras}

      {detailed && (
        <>
          {shape.glass.map((d, i) => (
            <path key={i} d={d} fill="currentColor" fillOpacity="0.16" stroke="currentColor" strokeWidth={strokeWidth * 0.6} />
          ))}
          {shape.lines?.map((d, i) => (
            <path key={i} d={d} stroke="currentColor" strokeWidth={strokeWidth * 0.5} opacity="0.45" />
          ))}
          {shape.handles?.map(([hx, hy]) => (
            <rect key={hx} x={hx} y={hy} width="11" height="3" rx="1.5" fill="currentColor" opacity="0.6" />
          ))}
        </>
      )}

      {shape.wheels.map((w) => (
        <g key={w.x}>
          <circle cx={w.x} cy={w.y} r={shape.r} fill="none" stroke="currentColor" strokeWidth={strokeWidth} />
          {detailed && (
            <>
              <circle cx={w.x} cy={w.y} r={shape.r * 0.55} fill="none" stroke="currentColor" strokeWidth={strokeWidth * 0.6} opacity="0.7" />
              <circle cx={w.x} cy={w.y} r={shape.r * 0.16} fill="currentColor" opacity="0.8" />
            </>
          )}
        </g>
      ))}
    </g>
  );
}

export default function CarSilhouette({
  type = "sedan",
  className,
  detailed = true,
  strokeWidth = 2.6,
  ground = true,
}) {
  const uid = useId().replace(/:/g, "");
  const shape = shapes[type] || shapes.sedan;

  return (
    <svg
      viewBox="0 0 260 110"
      className={cn("w-full", className)}
      fill="none"
      role="img"
      aria-label={`${bodyTypeLabel(type)} body shape`}
    >
      <defs>
        <linearGradient id={`${uid}-fill`} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.22" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <CarBody type={type} detailed={detailed} strokeWidth={strokeWidth} fillId={`${uid}-fill`} />

      {ground && (
        <path
          d={`M ${shape.wheels[0].x - shape.r - 22} ${shape.wheels[0].y + shape.r} H ${shape.wheels[1].x + shape.r + 22}`}
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.28"
        />
      )}
    </svg>
  );
}
