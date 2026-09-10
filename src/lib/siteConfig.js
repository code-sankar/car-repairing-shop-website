/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH FOR THE BRAND.
 *
 * Everything a new client needs to change to make this site theirs lives here
 * (plus the colour tokens at the top of `src/index.css`). Nothing below is
 * hard-coded anywhere else in the app.
 * ============================================================================
 */

export const site = {
  name: "Apex Auto Works",
  shortName: "Apex",
  tagline: "Precision Car Care",
  legalName: "Apex Auto Works Pvt. Ltd.",
  established: 2009,

  // Contact -----------------------------------------------------------------
  phone: "+91 98640 12345",
  phoneHref: "tel:+919864012345",
  whatsapp: "919864012345",
  emergencyPhone: "+91 98640 99911",
  emergencyPhoneHref: "tel:+919864099911",
  email: "service@apexautoworks.in",

  address: {
    line1: "142 GS Road, Christian Basti",
    city: "Guwahati",
    region: "Assam",
    postal: "781005",
    country: "India",
  },

  // Money -------------------------------------------------------------------
  currency: "₹",
  currencyCode: "INR",
  locale: "en-IN",

  // Opening hours -----------------------------------------------------------
  hours: [
    { days: "Monday – Friday", time: "8:00 AM – 7:00 PM" },
    { days: "Saturday", time: "8:00 AM – 7:00 PM" },
    { days: "Sunday", time: "9:00 AM – 2:00 PM" },
  ],
  emergencyNote: "24/7 roadside assistance within a 25 km radius",

  social: [
    { label: "Facebook", href: "https://facebook.com/apexautoworks" },
    { label: "Instagram", href: "https://instagram.com/apexautoworks" },
    { label: "YouTube", href: "https://youtube.com/@apexautoworks" },
  ],

  // Headline proof points ---------------------------------------------------
  rating: 4.9,
  reviewCount: 1284,
  warrantyMonths: 12,
};

export const formatAddress = () =>
  `${site.address.line1}, ${site.address.city}, ${site.address.region} ${site.address.postal}`;

/** Formats a number as a whole-rupee (or configured currency) price. */
export const price = (value) =>
  `${site.currency}${new Intl.NumberFormat(site.locale, { maximumFractionDigits: 0 }).format(value)}`;

export const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Pricing", to: "/pricing" },
  { label: "Our Work", to: "/gallery" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];
