import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Menu, Phone, X } from "lucide-react";
import { nav, site } from "../../lib/siteConfig";
import { cn } from "../../lib/cn";
import Button from "../ui/Button";
import Logo from "./Logo";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation, and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-500 focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>

      {/* Utility strip — the two things a garage customer looks for first */}
      <div className="hidden border-b border-white/8 bg-ink-950 lg:block">
        <div className="shell flex h-11 items-center justify-between text-[0.8rem] text-ink-400">
          <p className="flex items-center gap-2">
            <Clock size={14} className="text-brand-500" />
            <span>Open today {site.hours[0].time}</span>
            <span className="mx-2 text-ink-700">|</span>
            <span>{site.emergencyNote}</span>
          </p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 font-semibold text-white transition-colors hover:text-brand-400"
            >
              <Phone size={14} className="text-brand-500" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "glass border-b border-white/10 shadow-lg shadow-black/40"
            : "border-b border-transparent bg-ink-950/80 backdrop-blur-sm",
        )}
      >
        <div className="shell flex h-18 items-center justify-between gap-6 lg:h-20">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-full px-4 py-2 font-display text-[0.95rem] font-semibold uppercase tracking-wider transition-colors",
                    isActive ? "text-brand-400" : "text-ink-200 hover:text-white",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-brand-500"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button to="/book" size="sm" className="hidden sm:inline-flex">
              Book a Service
            </Button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid size-11 place-items-center rounded-full border border-white/12 text-white transition-colors hover:bg-white/8 lg:hidden"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* ---- Mobile drawer ------------------------------------------- */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="fixed inset-y-0 right-0 z-[61] flex w-[86%] max-w-sm flex-col border-l border-white/10 bg-ink-900 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
            >
              <div className="flex h-18 items-center justify-between border-b border-white/8 px-5">
                <Logo compact />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="grid size-11 place-items-center rounded-full border border-white/12 text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05 }}
                  >
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        cn(
                          "flex items-center justify-between border-b border-white/6 py-4 font-display text-2xl font-semibold uppercase tracking-wide",
                          isActive ? "text-brand-400" : "text-white",
                        )
                      }
                    >
                      {item.label}
                      <span className="font-sans text-xs text-ink-500">0{i + 1}</span>
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-3 border-t border-white/8 p-5">
                <Button to="/book" size="lg" className="w-full">
                  Book a Service
                </Button>
                <Button href={site.phoneHref} variant="secondary" size="lg" className="w-full">
                  <Phone size={17} /> {site.phone}
                </Button>
                <p className="pt-1 text-center text-xs text-ink-400">{site.emergencyNote}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
