# Apex Auto Works — Car Service & Repair Website

A production-ready marketing and online-booking site for a multi-brand car garage,
built with Vite, React and Tailwind CSS. Nine routes, an interactive price
estimator, a four-step booking flow, and zero image requests — every visual on
the site is vector artwork authored in code.

Built as an agency demo: white-labelled, fully responsive, accessible, and
rebrandable for a new client in about ten minutes.

---

## Quick start

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

Node 20 or newer.

---

## Rebranding this for a client

Everything a new client needs sits in **two files**. Nothing below is hard-coded
anywhere else in the app.

### 1. `src/lib/siteConfig.js` — the business

Name, tagline, phone numbers, WhatsApp, email, address, opening hours, currency,
locale, social links, review count, warranty length, and the navigation menu.

Changing `currency`, `currencyCode` and `locale` re-formats every price on the
site through `Intl.NumberFormat` — swap `₹`/`INR`/`en-IN` for `$`/`USD`/`en-US`
and the entire rate card follows.

### 2. `src/index.css` — the look

The `@theme` block at the top holds the whole design system: two colour ramps
(`--color-ink-*` for neutrals, `--color-brand-*` for the accent), a diagnostic
accent, both font stacks, and the animation tokens. Replace the `brand` ramp with
the client's colour and the entire site re-skins.

### 3. Content

| File | Holds |
| --- | --- |
| `src/lib/data/services.js` | The 12 service lines, prices, inclusions and detail-page copy |
| `src/lib/data/pricing.js` | Packages, the full à-la-carte rate card, add-ons |
| `src/lib/data/content.js` | Stats, process steps, promises, testimonials, team, FAQs, brands |
| `src/lib/data/gallery.js` | Case studies for the Our Work page |

### 4. SEO

`index.html` carries the title, meta description, Open Graph tags and a
**`AutoRepair` JSON-LD block** — the structured data Google uses for local
business rich results (opening hours, rating, address, phone). Update the
business details there to match `siteConfig.js`, then refresh `public/sitemap.xml`
and the domain in `public/robots.txt`.

---

## What's in it

**Routes**

| Path | Page |
| --- | --- |
| `/` | Home — hero, stats, services, inspection diagram, process, estimator, reviews, team, FAQ |
| `/services` | Full service catalogue |
| `/services/:slug` | Service detail with inclusions, symptoms and a sticky booking panel |
| `/pricing` | Packages, the full rate card, and the live estimator |
| `/gallery` | Case studies with a drag-to-compare before/after slider |
| `/about` | Story, timeline, promises, credentials, team |
| `/contact` | Contact form, channels, location panel, opening hours |
| `/book` | Four-step booking flow with validation and a live summary |
| `*` | 404 |

**Interactive pieces that carry a pitch**

- **Instant estimator** — body type × package × add-ons, with the total tweening
  as the selection changes. Carries the choice through to the booking form.
- **Inspection diagram** — a blueprint car with six hotspots; each reveals what
  gets checked in that zone.
- **Before/after slider** — pointer, touch and keyboard driven.
- **Four-step booking** — per-step validation via react-hook-form, a live summary
  card, and a confirmation screen.

**Engineering**

- Route-level code splitting; the home page ships alone and every other route is
  fetched on navigation.
- No image requests. The car illustrations, blueprint, gallery covers, team
  monograms and location panel are all inline SVG, so the site is sharp on any
  display and loads instantly.
- `prefers-reduced-motion` respected globally, in CSS and in every Framer Motion
  component.
- Keyboard-navigable throughout: skip link, focus-visible rings, real button and
  `aria` semantics on the accordion, carousel, hotspots and comparison slider.

---

## Wiring up the forms

The booking and contact forms are complete but deliberately have no backend —
each resolves a promise and shows its success state. Both mark the spot:

- `src/pages/Book.jsx` → `onSubmit`
- `src/pages/Contact.jsx` → `onSubmit`

Point them at the client's booking API, a form service (Formspree, Web3Forms),
or an email endpoint. The validated payload is already assembled.

---

## Deploying

Any static host. `npm run build` outputs `dist/`.

Because it is a single-page app, deep links need a rewrite to `index.html`.
Both configs are already in the repo:

- **Netlify / Cloudflare Pages** — `public/_redirects`
- **Vercel** — `vercel.json`

For Apache or Nginx, rewrite unmatched paths to `/index.html`.

---

## Stack

| | |
| --- | --- |
| Build | Vite 8 |
| UI | React 19 |
| Styling | Tailwind CSS 4 (CSS-first `@theme` config) |
| Routing | React Router 7 |
| Animation | Framer Motion |
| Icons | lucide-react |
| Forms | react-hook-form |
| Carousel | embla-carousel |

---

## A note on the fonts

Headings use **Barlow Condensed** and body copy uses **Inter**, both loaded from
Google Fonts in `index.html` with `display=swap`. If the request is blocked the
type falls back to a condensed system stack and the layout holds — no reflow, no
overflow. To self-host instead, drop the woff2 files into `public/fonts`, add an
`@font-face` block to `src/index.css`, and remove the `<link>` tags.
