/**
 * The body types the site prices and books against. `factor` is the labour
 * multiplier applied to every rate-card figure for that body style.
 *
 * Single source of truth: the estimator, the booking form, the services
 * masthead and the silhouette artwork all read from here.
 */
export const bodyTypes = [
  { id: "hatchback", label: "Hatchback", example: "Swift, i20, Altroz", factor: 1 },
  { id: "sedan", label: "Sedan", example: "City, Verna, Slavia", factor: 1.15 },
  { id: "suv", label: "SUV / MUV", example: "Creta, Thar, Innova", factor: 1.35 },
  { id: "luxury", label: "Luxury", example: "BMW, Merc, Audi", factor: 1.85 },
];

export const bodyTypeLabel = (id) =>
  bodyTypes.find((b) => b.id === id)?.label ?? id;
