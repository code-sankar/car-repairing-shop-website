/**
 * Service packages. `popular` renders the highlighted middle card.
 * Prices are per-visit and exclude parts flagged as extra.
 */
export const packages = [
  {
    id: "essential",
    name: "Essential",
    tagline: "The minimum a car needs to stay healthy",
    price: 2899,
    cadence: "per service",
    interval: "Every 5,000 km or 6 months",
    duration: "3 – 4 hrs",
    features: [
      "Engine oil + oil filter replacement",
      "Air filter clean, cabin filter check",
      "All fluid levels topped up",
      "Battery and tyre pressure check",
      "Brake pad visual inspection",
      "22-point digital health report",
      "Exterior wash and interior vacuum",
    ],
    excludes: ["Wheel alignment", "AC gas recharge"],
    cta: "Book Essential",
  },
  {
    id: "complete",
    name: "Complete",
    tagline: "Our standard full service — what most cars get",
    price: 5499,
    cadence: "per service",
    interval: "Every 10,000 km or 12 months",
    duration: "5 – 6 hrs",
    popular: true,
    features: [
      "Everything in Essential",
      "Air, cabin and fuel filter replacement",
      "Spark plug inspection and gap setting",
      "Brake fluid moisture test and top-up",
      "Full-system ECU diagnostic scan",
      "Wheel balancing and rotation",
      "Underbody and suspension inspection",
      "42-point report with photographs",
      "Free doorstep pickup and drop",
    ],
    excludes: ["Brake pad replacement"],
    cta: "Book Complete",
  },
  {
    id: "performance",
    name: "Performance",
    tagline: "For high-mileage, premium and hard-driven cars",
    price: 9999,
    cadence: "per service",
    interval: "Every 15,000 km or 12 months",
    duration: "1 – 2 days",
    features: [
      "Everything in Complete",
      "Fully synthetic oil and premium filters",
      "Throttle body and injector cleaning",
      "Coolant flush and brake fluid change",
      "3D wheel alignment with printed report",
      "AC performance test and cabin sanitisation",
      "Machine polish and interior deep clean",
      "Priority same-day slot",
      "12-month roadside assistance included",
    ],
    excludes: [],
    cta: "Book Performance",
  },
];

/**
 * Transparent à-la-carte rate card. `unit` is appended after the price.
 */
export const rateCard = [
  {
    group: "Routine maintenance",
    rows: [
      { item: "Engine oil change (semi-synthetic, up to 4L)", price: 2899 },
      { item: "Engine oil change (fully synthetic, up to 4L)", price: 4499 },
      { item: "Air + cabin filter replacement", price: 1290 },
      { item: "Coolant flush and refill", price: 1899 },
      { item: "Spark plug set (4 cylinder)", price: 2400 },
    ],
  },
  {
    group: "Brakes, tyres and steering",
    rows: [
      { item: "Front brake pad replacement (per axle)", price: 3499 },
      { item: "Brake disc skimming (per pair)", price: 2200 },
      { item: "3D wheel alignment", price: 899 },
      { item: "Wheel balancing (per wheel)", price: 250 },
      { item: "Tubeless puncture repair", price: 200 },
    ],
  },
  {
    group: "Diagnostics and electricals",
    rows: [
      { item: "Full-system ECU diagnostic scan", price: 999 },
      { item: "Battery load test", price: 0, note: "Free" },
      { item: "Alternator output test", price: 550 },
      { item: "Parasitic drain trace", price: 1499 },
      { item: "Headlamp restoration (pair)", price: 1800 },
    ],
  },
  {
    group: "Air conditioning",
    rows: [
      { item: "AC gas top-up (R134a)", price: 1799 },
      { item: "AC leak test with UV dye", price: 1200 },
      { item: "Evaporator coil cleaning", price: 3200 },
      { item: "Blower motor replacement", price: 4500 },
    ],
  },
  {
    group: "Body and appearance",
    rows: [
      { item: "Single panel respray", price: 4500 },
      { item: "Paintless dent removal (per dent)", price: 1200 },
      { item: "Two-stage machine polish", price: 5999 },
      { item: "9H ceramic coating (hatchback)", price: 12999 },
      { item: "Full interior deep clean", price: 3499 },
    ],
  },
];

/** Add-ons shown alongside the packages. */
export const addOns = [
  { name: "3D wheel alignment", price: 899 },
  { name: "AC gas top-up", price: 1799 },
  { name: "Machine polish", price: 5999 },
  { name: "Cabin sanitisation", price: 999 },
  { name: "Headlamp restoration", price: 1800 },
  { name: "Underbody anti-rust", price: 3499 },
];
