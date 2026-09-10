import { cn } from "../../lib/cn";
import Reveal from "./Reveal";

/**
 * Eyebrow + title + optional lead paragraph, with the small orange rule that
 * runs under every section label on the site.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  light = false,
  className,
  titleClassName,
  children,
}) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl",
        centered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <Reveal direction="none" duration={0.5}>
          <p className={cn("eyebrow", centered && "justify-center")}>
            <span aria-hidden="true" className="h-px w-8 bg-brand-500" />
            {eyebrow}
          </p>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2
          className={cn(
            "mt-5 text-[2.05rem] font-bold uppercase leading-[0.98] sm:text-[2.5rem] lg:text-[2.85rem] xl:text-[3.2rem]",
            light ? "text-ink-950" : "text-white",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </Reveal>

      {lead && (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-6 text-lg leading-relaxed",
              light ? "text-ink-500" : "text-ink-300",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}

      {children}
    </div>
  );
}
