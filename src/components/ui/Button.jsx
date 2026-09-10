import { Link } from "react-router-dom";
import { cn } from "../../lib/cn";

const variants = {
  primary:
    "bg-brand-500 text-white shadow-[0_10px_30px_-10px_rgba(255,106,0,0.85)] hover:bg-brand-400 hover:shadow-[0_16px_40px_-12px_rgba(255,106,0,0.95)]",
  secondary:
    "glass edge text-white hover:bg-white/10 hover:border-white/20",
  outline:
    "border border-brand-500/60 text-brand-300 hover:bg-brand-500 hover:text-white hover:border-brand-500",
  light:
    "bg-white text-ink-950 hover:bg-ink-100",
  ghost:
    "text-ink-200 hover:text-white hover:bg-white/6",
};

const sizes = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-[0.95rem] gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
};

/**
 * One button, three element types. Renders a router <Link> when `to` is set,
 * an <a> when `href` is set, and a <button> otherwise — so callers never have
 * to think about which tag they need.
 */
export default function Button({
  as,
  to,
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  shine = true,
  ...props
}) {
  const Tag = as || (to ? Link : href ? "a" : "button");

  return (
    <Tag
      to={to}
      href={href}
      className={cn(
        "group/btn relative inline-flex items-center justify-center overflow-hidden rounded-full font-semibold",
        "transition-all duration-300 ease-out active:scale-[0.97]",
        "disabled:pointer-events-none disabled:opacity-55",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {/* Light sweep across the face on hover — subtle, only on solid fills */}
      {shine && (variant === "primary" || variant === "light") && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/25 opacity-0 transition-opacity duration-200 group-hover/btn:animate-sweep group-hover/btn:opacity-100"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-[inherit]">{children}</span>
    </Tag>
  );
}
