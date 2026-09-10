import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { site } from "../../lib/siteConfig";

/**
 * Counts from zero to `value` the first time it scrolls into view.
 * Uses requestAnimationFrame with an ease-out curve rather than a fixed step,
 * so large and small numbers both feel like they land rather than stop.
 */
export default function Counter({ value, suffix = "", prefix = "", duration = 1900, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration, reduce]);

  const current = reduce ? value : display;
  const rounded = value >= 1000 ? Math.round(current) : Math.round(current * 10) / 10;
  const text = Number.isInteger(value)
    ? Math.round(current).toLocaleString(site.locale)
    : rounded.toLocaleString(site.locale, { minimumFractionDigits: 1 });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
