import { CLASS_COLORS, FACTION_COLORS } from "@/data/colors"

const ICON_BASE = "https://cdn.raiderio.net/images/wow/icons/medium"

export const wowIconUrl = (icon: string): string => `${ICON_BASE}/${icon}.jpg`

export const classColor = (className: string): string =>
  CLASS_COLORS[className] ?? "inherit"

export const factionColor = (faction: string): string =>
  FACTION_COLORS[faction.toLowerCase()] ?? "inherit"

export const shortName = (name: string): string =>
  name.replace(/-\d+$/, "")

export const formatRole = (role: string): string =>
  role === "dps" ? "DPS" : role.charAt(0).toUpperCase() + role.slice(1)
