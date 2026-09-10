/** Shown while a route chunk loads. Sized to hold the fold so nothing jumps. */
export default function RouteFallback() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-ink-950" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-5">
        <span className="relative grid size-14 place-items-center">
          <span className="absolute size-14 animate-pulse-ring rounded-full bg-brand-500/40" />
          <svg viewBox="0 0 64 64" className="size-14 animate-spin-slow" aria-hidden="true">
            <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="4" className="text-white/10" />
            <circle
              cx="32" cy="32" r="26" fill="none" stroke="var(--color-brand-500)" strokeWidth="4"
              strokeLinecap="round" strokeDasharray="40 123"
            />
          </svg>
        </span>
        <span className="font-display text-sm font-semibold uppercase tracking-[0.24em] text-ink-400">
          Loading
        </span>
      </div>
    </div>
  );
}
