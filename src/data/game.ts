export const REGIONS = ["us", "eu", "kr", "tw"] as const

export type Region = (typeof REGIONS)[number]

export const ROLES = [
  { key: "dps", label: "DPS" },
  { key: "healer", label: "Healer" },
  { key: "tank", label: "Tank" },
] as const

export const ROLE_ORDER = { tank: 0, healer: 1, dps: 2 } as const

export const DIFFICULTIES = ["mythic", "heroic", "normal"] as const

export const LOCALES = ["en", "ru", "ko", "cn", "pt", "it", "fr", "es", "de", "tw"] as const

export const EXPANSIONS = [
  { id: 10, name: "The War Within" },
  { id: 9, name: "Dragonflight" },
  { id: 8, name: "Shadowlands" },
  { id: 7, name: "Battle for Azeroth" },
  { id: 6, name: "Legion" },
] as const
