import { Link } from "react-router-dom";
import { Calendar, MessageCircle, Phone } from "lucide-react";
import { site } from "../../lib/siteConfig";

/**
 * Fixed action bar on small screens. On a garage site the two highest-intent
 * actions are "call" and "book", so they stay one thumb-reach away everywhere.
 */
export default function MobileCallBar() {
  const items = [
    { label: "Call", icon: Phone, href: site.phoneHref },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
        "Hi, I'd like to book a car service.",
      )}`,
      external: true,
    },
    { label: "Book", icon: Calendar, to: "/book", primary: true },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-900/95 backdrop-blur-lg lg:hidden">
      <div className="grid grid-cols-3">
        {items.map((item) => {
          const Icon = item.icon;
          const inner = (
            <>
              <Icon size={19} />
              <span className="font-display text-[0.72rem] font-semibold uppercase tracking-[0.14em]">
                {item.label}
              </span>
            </>
          );
          const className = `flex flex-col items-center justify-center gap-1 py-3 transition-colors ${
            item.primary ? "bg-brand-500 text-white" : "text-ink-200 active:bg-white/6"
          }`;

          return item.to ? (
            <Link key={item.label} to={item.to} className={className}>
              {inner}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              className={className}
              {...(item.external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            >
              {inner}
            </a>
          );
        })}
      </div>
    </div>
  );
}
