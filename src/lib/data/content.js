import { ClipboardCheck, Gauge, SprayCan, Wrench } from "lucide-react";
import { site } from "../siteConfig";

/* ------------------------------------------------------------------ stats */
export const stats = [
  { value: 16, suffix: "+", label: "Years in the bay", detail: `Serving drivers since ${site.established}` },
  { value: 42000, suffix: "+", label: "Cars serviced", detail: "Across 30 makes and counting" },
  { value: 98, suffix: "%", label: "First-time fix rate", detail: "Measured over the last 12 months" },
  { value: 45, suffix: " min", label: "Roadside response", detail: "City-wide average, day or night" },
];

/* ---------------------------------------------------------------- process */
export const process = [
  {
    step: "01",
    title: "Book in 60 seconds",
    body: "Pick a service, a date and a slot online — or send one WhatsApp message. No forms that ask for your engine number.",
  },
  {
    step: "02",
    title: "Free doorstep pickup",
    body: "A driver collects the car from your home or office, sends you a timestamped condition video, and drives it in.",
  },
  {
    step: "03",
    title: "Inspect, then quote",
    body: "We put it on the lift, photograph what we find, and send a line-by-line estimate. Nothing is touched until you tap approve.",
  },
  {
    step: "04",
    title: "Repair with live updates",
    body: "Track the job from your phone. Every technician logs each stage with photos, so you see the work, not just the bill.",
  },
  {
    step: "05",
    title: "Road test and handover",
    body: "Every car runs our 12 km test route before it leaves. We deliver it back washed, with the old parts in the boot.",
  },
];

/* --------------------------------------------------------------- warranty */
export const pillars = [
  {
    title: "Fixed-price, quoted upfront",
    body: "You approve a line-by-line estimate before a single bolt is turned. If we find something extra mid-job, work stops until you say go.",
    metric: "0",
    metricLabel: "surprise line items",
  },
  {
    title: `${site.warrantyMonths}-month workmanship warranty`,
    body: `Every repair carries a ${site.warrantyMonths}-month or 10,000 km guarantee on both parts and labour. If it comes back, we make it right at no cost.`,
    metric: `${site.warrantyMonths}`,
    metricLabel: "months covered",
  },
  {
    title: "Genuine and OEM parts only",
    body: "We fit OEM or OES parts and staple the invoice to your job card. Ask for the box and you get the box — every time.",
    metric: "100%",
    metricLabel: "traceable parts",
  },
  {
    title: "Your old parts, returned",
    body: "Every part we replace comes back to you in the boot. It is the simplest proof that the work you paid for actually happened.",
    metric: "1:1",
    metricLabel: "parts returned",
  },
];

/* ----------------------------------------------------------- testimonials */
export const testimonials = [
  {
    quote:
      "Three garages told me the gearbox was finished. Apex scanned it, found a failed speed sensor, and charged me under two thousand rupees. They talked me out of a job worth a hundred times that.",
    name: "Rituparna Baruah",
    role: "Hyundai Creta · 2021",
    rating: 5,
    highlight: "Saved ₹1.4L on a misdiagnosis",
  },
  {
    quote:
      "The estimate arrived on WhatsApp with photographs of everything they found. I approved it from my desk in Bengaluru while my father handed over the car in Guwahati. Nothing was added afterwards.",
    name: "Anup Deka",
    role: "Maruti Suzuki Baleno · 2019",
    rating: 5,
    highlight: "Approved remotely, priced exactly",
  },
  {
    quote:
      "The rear quarter panel was resprayed after a hit. Two years on I still cannot find the join, and neither could the evaluator when I sold the car.",
    name: "Simran Kaur Sethi",
    role: "Honda City · 2018",
    rating: 5,
    highlight: "Invisible panel blend",
  },
  {
    quote:
      "Flat tyre at 11:40 at night on the bypass, with my daughter in the car. Their van reached me in thirty-one minutes. I have not called anyone else since.",
    name: "Dr. Pranab Sharma",
    role: "Toyota Innova Crysta · 2022",
    rating: 5,
    highlight: "31-minute night response",
  },
  {
    quote:
      "I run eleven cabs. Apex keeps every one of them on a service calendar and calls me before a car is due, not after it breaks. My downtime has roughly halved.",
    name: "Iqbal Hussain",
    role: "Fleet Operator · 11 vehicles",
    rating: 5,
    highlight: "Fleet downtime cut by half",
  },
  {
    quote:
      "They handled the entire insurance claim. I dropped the keys, got WhatsApp updates every second day, and picked up a car that looked new. I never spoke to the insurer once.",
    name: "Meghna Choudhury",
    role: "Tata Nexon · 2023",
    rating: 5,
    highlight: "Cashless claim, zero paperwork",
  },
];

/* -------------------------------------------------------------------- team */
export const team = [
  {
    name: "Bikash Rajkhowa",
    icon: Wrench,
    role: "Founder & Master Technician",
    since: 2009,
    initials: "BR",
    hue: 22,
    creds: ["ASE Master certified", "26 years on the tools", "Ex-Toyota lead technician"],
    line: "Started with one bay and a borrowed jack. Still road-tests the difficult jobs himself.",
  },
  {
    name: "Farhan Ahmed",
    icon: Gauge,
    role: "Head of Diagnostics",
    since: 2013,
    initials: "FA",
    hue: 195,
    creds: ["Bosch ECU specialist", "Hybrid & EV high-voltage certified", "CAN bus diagnostics"],
    line: "If a fault only shows up on a cold Tuesday morning, Farhan is the one who catches it.",
  },
  {
    name: "Nabanita Das",
    icon: ClipboardCheck,
    role: "Service Manager",
    since: 2016,
    initials: "ND",
    hue: 268,
    creds: ["Runs the estimate desk", "Insurance claims lead", "Customer liaison"],
    line: "The reason nothing gets added to your bill without a phone call first.",
  },
  {
    name: "Jitu Boro",
    icon: SprayCan,
    role: "Paint & Body Lead",
    since: 2014,
    initials: "JB",
    hue: 142,
    creds: ["PPG certified refinisher", "Spectrophotometer matching", "18 years in the booth"],
    line: "Mixes every shade in-house and refuses to sign off a panel he can still pick out.",
  },
];

/* -------------------------------------------------------------------- FAQs */
export const faqs = [
  {
    q: "Will servicing here void my manufacturer warranty?",
    a: "No. Under the Motor Vehicles Act you are free to service anywhere, and a manufacturer cannot void your warranty for it. We use OEM-grade parts and stamp your service book with every job card, so your history stays complete and your resale value stays intact.",
  },
  {
    q: "How do I know I am not being sold work I do not need?",
    a: "Three ways. We photograph every fault and send it before quoting, we return every replaced part to you in the boot, and our estimate is line-by-line with parts and labour split out. If you would rather get a second opinion on our diagnosis, we will hand you the report to take elsewhere.",
  },
  {
    q: "Do you actually pick the car up?",
    a: `Yes, and it is free inside ${site.address.city}. A driver collects from your home or office, records a timestamped walk-around video before moving the car, and delivers it back when the job is signed off.`,
  },
  {
    q: "What does the estimate include?",
    a: "Parts, labour, consumables and taxes — the figure you approve is the figure you pay. If we uncover something once the car is stripped, the job stops and we call you. Nothing gets added silently.",
  },
  {
    q: "Which brands do you work on?",
    a: "Every mainstream Indian-market make, plus most European and Japanese imports: Maruti Suzuki, Hyundai, Tata, Mahindra, Honda, Toyota, Kia, Skoda, Volkswagen, Renault, Nissan, MG, Ford, Jeep, BMW, Mercedes-Benz and Audi. We also service hybrids and EVs with high-voltage certified technicians.",
  },
  {
    q: "How long is the warranty on a repair?",
    a: `${site.warrantyMonths} months or 10,000 kilometres, whichever comes first, covering both parts and labour. Paint and body work carries a separate two-year guarantee on adhesion and finish.`,
  },
  {
    q: "Can I wait at the workshop while the car is done?",
    a: "For anything under two hours, yes — there is a lounge with Wi-Fi, coffee and a glass wall onto the bays, so you can watch your own car being worked on. For longer jobs we would rather pick up and drop.",
  },
  {
    q: "Do you take cashless insurance claims?",
    a: "We are a cashless network garage for every major insurer. We coordinate the surveyor, file the paperwork and negotiate the estimate. You pay only the policy excess and any non-claimable items, which we flag in advance.",
  },
];

/* ----------------------------------------------------------------- brands */
export const brands = [
  "Maruti Suzuki", "Hyundai", "Tata", "Mahindra", "Honda", "Toyota",
  "Kia", "Skoda", "Volkswagen", "Renault", "Nissan", "MG",
  "Ford", "Jeep", "BMW", "Mercedes-Benz", "Audi", "Volvo",
];

/* --------------------------------------------------------- certifications */
export const credentials = [
  { label: "ASE Certified Technicians", detail: "All 14 on the floor" },
  { label: "Bosch Car Service Partner", detail: "Since 2017" },
  { label: "Cashless Insurance Network", detail: "9 major insurers" },
  { label: "ISO 9001:2015", detail: "Quality management" },
];
