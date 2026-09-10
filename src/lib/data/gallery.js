/**
 * Case studies for the Our Work page. `art` selects the generated scene
 * rendered by <WorkArt />; `hue` shifts its palette so no two cards repeat.
 */
export const projects = [
  {
    id: "creta-quarter",
    category: "Denting & Painting",
    title: "Rear quarter rebuilt after a side impact",
    car: "Hyundai Creta · 2021",
    art: "panel",
    hue: 18,
    days: 4,
    summary:
      "A parking-lot impact folded the rear quarter and cracked the bumper mount. The panel was pulled on a jig, filled, blocked flat and resprayed with a two-panel blend into the door.",
    work: ["Jig pull and panel beating", "Spectrophotometer shade match", "Two-panel blend", "Cut and polish"],
    result: "Panel gap within 0.5 mm of factory. Owner's resale evaluator found no evidence of repair.",
  },
  {
    id: "polo-misfire",
    category: "Diagnostics",
    title: "Intermittent misfire three garages had missed",
    car: "Volkswagen Polo TSI · 2017",
    art: "diagnostic",
    hue: 190,
    days: 1,
    summary:
      "The car stumbled only under cold load. Live data logging over a 40 km route caught a cylinder-two ignition coil dropping out at 12 °C, invisible on a static scan.",
    work: ["Live data logging road test", "Cylinder balance test", "Coil pack replacement", "Fuel trim reset"],
    result: "Fault reproduced, fixed and verified in one day. No parts replaced on guesswork.",
  },
  {
    id: "innova-brakes",
    category: "Brakes",
    title: "Full brake overhaul on a 190,000 km taxi",
    car: "Toyota Innova Crysta · 2019",
    art: "brakes",
    hue: 30,
    days: 1,
    summary:
      "A high-mileage fleet vehicle with warped discs and seized caliper pins. Everything was measured against Toyota's minimum spec before a single part was ordered.",
    work: ["Disc runout measured at 0.19 mm", "Caliper rebuild and re-grease", "Pads and discs replaced", "Full fluid bleed"],
    result: "Stopping distance back inside factory spec. Pedal pulse gone completely.",
  },
  {
    id: "city-ceramic",
    category: "Detailing",
    title: "Paint correction and 9H ceramic coating",
    car: "Honda City · 2020",
    art: "detail",
    hue: 210,
    days: 3,
    summary:
      "Six years of automated car washes had left dense swirl marks. Two-stage machine correction removed 92% of the defects before any coating went near the paint.",
    work: ["Clay decontamination", "Two-stage machine correction", "9H ceramic coating", "Glass and alloy coating"],
    result: "Gloss meter reading up from 71 to 94. Three-year coating guarantee issued.",
  },
  {
    id: "thar-service",
    category: "Periodic Service",
    title: "Post-monsoon overhaul after a river crossing",
    car: "Mahindra Thar · 2022",
    art: "underbody",
    hue: 130,
    days: 2,
    summary:
      "Water ingress after off-roading. Every differential, the transfer case and the gearbox were drained and inspected for emulsified oil, then the underbody was resealed.",
    work: ["Differential and transfer case flush", "Air intake inspection", "Underbody anti-rust", "Brake strip and clean"],
    result: "No water contamination left in any driveline component. Anti-rust warranty issued.",
  },
  {
    id: "swift-ac",
    category: "AC Repair",
    title: "AC leak traced to a hairline condenser crack",
    car: "Maruti Suzuki Swift · 2018",
    art: "ac",
    hue: 195,
    days: 1,
    summary:
      "The owner had paid for three gas top-ups in one year elsewhere. A nitrogen pressure test with UV dye found a stone-chip crack in the condenser within twenty minutes.",
    work: ["Nitrogen pressure test", "UV dye leak trace", "Condenser replacement", "Vacuum and recharge by weight"],
    result: "Vent temperature at 6 °C in traffic. No top-up needed since.",
  },
];

export const categories = ["All", ...new Set(projects.map((p) => p.category))];
