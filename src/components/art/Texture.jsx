import { cn } from "../../lib/cn";

/**
 * Soft radial light source. Layered behind content to lift flat dark panels
 * without introducing an image request.
 */
export function Glow({ className, color = "var(--color-brand-500)", opacity = 0.22, size = 620 }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute rounded-full blur-3xl", className)}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 68%)`,
        opacity,
      }}
    />
  );
}

/** Engineering grid, faded out at the edges so it never looks like a table. */
export function GridBackdrop({ className, fine = false }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0",
        fine ? "bg-grid-sm" : "bg-grid",
        "[mask-image:radial-gradient(ellipse_at_center,#000_25%,transparent_78%)]",
        className,
      )}
    />
  );
}

/** Workshop hazard tape. Used as a thin rule between major bands. */
export function HazardStrip({ className }) {
  return (
    <div
      aria-hidden="true"
      className={cn("h-1.5 w-full bg-hazard opacity-70", className)}
    />
  );
}

/** Corner registration marks — a machined-panel cue used on framed visuals. */
export function CornerMarks({ className, color = "text-brand-500/50" }) {
  const corner = "absolute size-4 border-current";
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", color, className)}>
      <span className={cn(corner, "left-0 top-0 border-l-2 border-t-2")} />
      <span className={cn(corner, "right-0 top-0 border-r-2 border-t-2")} />
      <span className={cn(corner, "bottom-0 left-0 border-b-2 border-l-2")} />
      <span className={cn(corner, "bottom-0 right-0 border-b-2 border-r-2")} />
    </div>
  );
}
