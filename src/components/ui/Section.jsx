import { cn } from "../../lib/cn";

/**
 * Vertical rhythm wrapper. `tone` picks one of the three background treatments
 * the site alternates between. Decorative layers go through `backdrop` so they
 * span the full section width instead of being clipped to the content column.
 */
export default function Section({
  id,
  tone = "dark",
  backdrop,
  className,
  containerClassName,
  children,
  ...props
}) {
  const tones = {
    dark: "bg-ink-950 text-ink-300",
    panel: "bg-ink-900 text-ink-300",
    light: "bg-ink-50 text-ink-600",
  };

  return (
    <section
      id={id}
      className={cn("relative overflow-hidden py-20 sm:py-24 lg:py-28", tones[tone], className)}
      {...props}
    >
      {backdrop}
      <div className={cn("shell relative z-10", containerClassName)}>{children}</div>
    </section>
  );
}
