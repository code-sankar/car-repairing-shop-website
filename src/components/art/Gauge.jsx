import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/cn";

/**
 * Circular readout that sweeps to `value` when it enters the viewport.
 * Drawn as a 270-degree arc so it reads as an instrument, not a pie chart.
 */
export default function Gauge({
  value = 78,
  max = 100,
  label,
  unit = "%",
  size = 132,
  color = "var(--color-brand-500)",
  className,
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);
  const fromRef = useRef(0);

  // Sweeps in on first view, then tweens from wherever the needle is whenever
  // `value` changes — so the same gauge can be driven by hover or selection.
  useEffect(() => {
    if (!inView || reduce) return;

    const from = fromRef.current;
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const p = Math.min((now - start) / 900, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(from + (value - from) * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
      else fromRef.current = value;
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, reduce]);

  const current = reduce ? value : shown;

  const r = 54;
  const sweep = 0.75; // three quarters of the circle
  const circumference = 2 * Math.PI * r;
  const track = circumference * sweep;
  const filled = track * (current / max);

  return (
    <div ref={ref} className={cn("relative grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg viewBox="0 0 128 128" className="size-full -rotate-[135deg]">
        <circle
          cx="64" cy="64" r={r}
          fill="none" stroke="currentColor" strokeWidth="9" strokeLinecap="round"
          className="text-white/8"
          strokeDasharray={`${track} ${circumference}`}
        />
        <circle
          cx="64" cy="64" r={r}
          fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
          strokeDasharray={`${filled} ${circumference}`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-3 text-center">
        <span className="font-display text-2xl font-bold leading-none text-white">
          {Math.round(current)}
          <span className="text-base text-ink-400">{unit}</span>
        </span>
        {label && (
          <span className="mt-1 w-full truncate font-display text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-ink-400">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
