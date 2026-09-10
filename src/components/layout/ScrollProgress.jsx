import { motion, useScroll, useSpring } from "framer-motion";

/** Thin reading-progress bar pinned under the header. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-gradient-to-r from-brand-600 via-brand-400 to-volt-400"
    />
  );
}
