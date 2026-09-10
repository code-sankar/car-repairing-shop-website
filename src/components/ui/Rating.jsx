import { Star } from "lucide-react";
import { cn } from "../../lib/cn";

/** Five-star row. Renders as a single accessible label, not five images. */
export default function Rating({ value = 5, size = 16, className }) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      role="img"
      aria-label={`Rated ${value} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          strokeWidth={0}
          className={i < Math.round(value) ? "fill-brand-500" : "fill-ink-600"}
        />
      ))}
    </div>
  );
}
