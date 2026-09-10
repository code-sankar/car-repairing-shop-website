import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { formatAddress, nav, site } from "../../lib/siteConfig";
import { services } from "../../lib/data/services";
import { HazardStrip } from "../art/Texture";
import SocialIcon from "./SocialIcon";
import Logo from "./Logo";
import Button from "../ui/Button";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
    setEmail("");
  };

  return (
    <footer className="relative bg-ink-900">
      <HazardStrip />

      {/* Booking prompt straddling the footer edge */}
      <div className="shell -mt-px pt-16">
        <div className="relative overflow-hidden rounded-3xl border border-brand-500/25 bg-gradient-to-br from-brand-600/20 via-ink-800 to-ink-800 p-8 sm:p-12">
          <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold uppercase leading-tight sm:text-4xl">
                Still driving on a <span className="brand-text">warning light</span>?
              </h2>
              <p className="mt-4 text-ink-300">
                Book a slot in under a minute, or call and speak to a technician — not a call centre.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button to="/book" size="lg">
                Book a Service <ArrowRight size={18} />
              </Button>
              <Button href={site.phoneHref} variant="secondary" size="lg">
                <Phone size={18} /> Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="shell grid gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-20">
        {/* Brand column */}
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm leading-relaxed text-ink-400">
            A multi-brand workshop that quotes before it works, returns your old parts, and backs
            every repair for {site.warrantyMonths} months. Serving {site.address.city} since{" "}
            {site.established}.
          </p>

          <div className="mt-7 flex gap-3">
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noreferrer noopener"
                className="grid size-11 place-items-center rounded-full border border-white/10 text-ink-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-500 hover:bg-brand-500 hover:text-white"
              >
                <SocialIcon name={s.label} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <nav aria-label="Footer" className="lg:col-span-2">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white">
            Explore
          </h3>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-ink-400 transition-colors hover:text-brand-400"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/book" className="text-ink-400 transition-colors hover:text-brand-400">
                Book Online
              </Link>
            </li>
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white">
            Popular Services
          </h3>
          <ul className="mt-5 space-y-3">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  to={`/services/${s.slug}`}
                  className="text-ink-400 transition-colors hover:text-brand-400"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + newsletter */}
        <div className="lg:col-span-3">
          <h3 className="font-display text-sm font-semibold uppercase tracking-[0.22em] text-white">
            Visit the Workshop
          </h3>
          <ul className="mt-5 space-y-4 text-ink-400">
            <li className="flex gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand-500" />
              <span>{formatAddress()}</span>
            </li>
            <li className="flex gap-3">
              <Phone size={18} className="mt-0.5 shrink-0 text-brand-500" />
              <a href={site.phoneHref} className="transition-colors hover:text-brand-400">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={18} className="mt-0.5 shrink-0 text-brand-500" />
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand-400">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock size={18} className="mt-0.5 shrink-0 text-brand-500" />
              <span>
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>

          <form onSubmit={subscribe} className="mt-7">
            <label htmlFor="footer-email" className="text-sm font-semibold text-white">
              Service reminders by email
            </label>
            <div className="mt-3 flex gap-2">
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 min-w-0 flex-1 rounded-full border border-white/12 bg-ink-950 px-5 text-sm text-white placeholder:text-ink-500 focus:border-brand-500 focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-500 text-white transition-colors hover:bg-brand-400"
              >
                <Send size={18} />
              </button>
            </div>
            <p aria-live="polite" className="mt-2 h-5 text-xs text-brand-400">
              {sent && "Thanks — we'll remind you when your service is due."}
            </p>
          </form>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="shell flex flex-col items-center justify-between gap-4 py-6 text-sm text-ink-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <Link to="/contact" className="transition-colors hover:text-brand-400">Privacy Policy</Link>
            <Link to="/contact" className="transition-colors hover:text-brand-400">Terms of Service</Link>
            <span className="text-ink-700">GSTIN 18AABCA1234K1Z5</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
