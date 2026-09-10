import { motion, useReducedMotion } from "framer-motion";

const offsets = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 34, y: 0 },
  right: { x: -34, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered entrance. Collapses to a plain fade — or to nothing at all —
 * when the visitor has asked for reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.7,
  className,
  once = true,
  amount = 0.25,
  as = "div",
}) {
  const reduce = useReducedMotion();
  const from = reduce ? offsets.none : offsets[direction];
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, ...from }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration: reduce ? 0.01 : duration,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
