import { AnimatePresence, motion } from "framer-motion";
import { CircleCheckBig, X } from "lucide-react";

/**
 * Confirmation toast used after the booking and contact forms submit.
 * Announced politely so it does not interrupt a screen reader mid-sentence.
 */
export default function Toast({ open, title, body, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-4 bottom-6 z-[70] mx-auto max-w-md sm:inset-x-auto sm:right-6"
        >
          <div className="glass edge flex items-start gap-3 rounded-2xl p-4 shadow-2xl shadow-black/50">
            <CircleCheckBig className="mt-0.5 shrink-0 text-brand-400" size={22} />
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold text-white">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-300">{body}</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Dismiss notification"
              className="shrink-0 rounded-lg p-1 text-ink-400 transition-colors hover:bg-white/8 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
