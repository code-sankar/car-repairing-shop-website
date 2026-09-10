import { cn } from "./cn";

/** Shared control styling, so every input on the site matches without a wrapper. */
export function inputClass(hasError) {
  return cn(
    "h-13 w-full rounded-xl border bg-ink-950 px-4 text-white placeholder:text-ink-500 transition-colors focus:outline-none",
    hasError ? "border-brand-500" : "border-white/12 focus:border-brand-500",
  );
}

export function textareaClass(hasError) {
  return cn(
    "w-full rounded-xl border bg-ink-950 p-4 text-white placeholder:text-ink-500 transition-colors focus:outline-none",
    hasError ? "border-brand-500" : "border-white/12 focus:border-brand-500",
  );
}
