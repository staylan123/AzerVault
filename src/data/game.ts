export const REGIONS = ["us", "eu", "kr", "tw"] as const
export type Region = (typeof REGIONS)[number]

export const EXPANSIONS = [
  { id: 10, name: "The War Within" },
  { id: 9, name: "Dragonflight" },
  { id: 8, name: "Shadowlands" },
  { id: 7, name: "Battle for Azeroth" },
  { id: 6, name: "Legion" },
] as const
