import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "../../lib/cn";

/**
 * Single-open accordion with real button semantics and aria wiring, so it is
 * operable by keyboard and announced correctly by screen readers.
 */
export default function Accordion({ items, className }) {
  const [open, setOpen] = useState(0);
  const uid = useId();

  return (
    <div className={cn("divide-y divide-white/8 border-y border-white/8", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${uid}-panel-${i}`;
        const buttonId = `${uid}-button-${i}`;

        return (
          <div key={item.q}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="group flex w-full items-start gap-5 py-6 text-left transition-colors hover:text-white"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-brand-500 bg-brand-500 text-white"
                      : "border-white/15 text-ink-300 group-hover:border-brand-500 group-hover:text-brand-400",
                  )}
                >
                  <Plus size={16} />
                </span>
                <span
                  className={cn(
                    "font-display text-xl font-semibold leading-snug transition-colors sm:text-2xl",
                    isOpen ? "text-brand-400" : "text-white",
                  )}
                >
                  {item.q}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-7 pl-13 text-[1.02rem] leading-relaxed text-ink-300">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
