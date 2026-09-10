import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { site } from "../../lib/siteConfig";

/** Tweens between the previous and next value whenever `value` changes. */
export default function AnimatedNumber({ value, duration = 480, className }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const fromRef = useRef(value);

  useEffect(() => {
    if (reduce) return;

    const from = fromRef.current;
    const start = performance.now();
    let frame;

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(from + (value - from) * eased);
      if (p < 1) frame = requestAnimationFrame(tick);
      else fromRef.current = value;
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration, reduce]);

  return (
    <span className={className}>
      {site.currency}
      {Math.round(reduce ? value : shown).toLocaleString(site.locale)}
    </span>
  );
}
