import { cn } from "../../lib/cn";

/** Label + control + error message, wired for accessibility in one place. */
export default function Field({ label, id, error, hint, required, className, children }) {
  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="mb-2 text-sm font-semibold text-white">
        {label}
        {required && <span className="ml-1 text-brand-500" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-ink-500">{hint}</p>}
      <p
        id={`${id}-error`}
        role={error ? "alert" : undefined}
        className={cn("mt-1.5 text-xs text-brand-400", !error && "hidden")}
      >
        {error?.message}
      </p>
    </div>
  );
}
