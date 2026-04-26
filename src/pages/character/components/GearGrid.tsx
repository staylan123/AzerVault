import type { GearSlots, GearItem } from "@/types/raiderio/character"

const ICON_BASE = "https://cdn.raiderio.net/images/wow/icons/medium"

const SLOT_LABELS: Record<keyof GearSlots, string> = {
  head: "Head",
  neck: "Neck",
  shoulder: "Shoulders",
  back: "Back",
  chest: "Chest",
  wrist: "Wrists",
  hands: "Hands",
  waist: "Waist",
  legs: "Legs",
  feet: "Feet",
  finger1: "Ring 1",
  finger2: "Ring 2",
  trinket1: "Trinket 1",
  trinket2: "Trinket 2",
  mainhand: "Main Hand",
  offhand: "Off Hand",
}

/* WoW item quality border colours */
const QUALITY_COLORS: Record<number, string> = {
  0: "#9D9D9D",
  1: "#FFFFFF",
  2: "#1EFF00",
  3: "#0070DD",
  4: "#A335EE",
  5: "#FF8000",
  6: "#E6CC80",
}

const GearTile = ({ slot, item }: { slot: string; item: GearItem }) => {
  const borderColor = QUALITY_COLORS[item.item_quality] ?? QUALITY_COLORS[1]
  const enchants = item.enchants_detail?.filter(e => e.name) ?? []
  const gemCount = item.gems?.length ?? 0

  return (
    <div
      className="flex items-center gap-3 rounded-lg bg-surface p-3"
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >
      <img
        src={`${ICON_BASE}/${item.icon}.jpg`}
        alt={item.name}
        className="h-10 w-10 shrink-0 rounded"
      />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-text-muted">{slot}</p>
        <p className="truncate text-sm font-medium" style={{ color: borderColor }}>{item.name}</p>
        <div className="flex items-center gap-2">
          <p className="text-xs text-text-secondary">ilvl {item.item_level}</p>
          {gemCount > 0 && (
            <span className="text-xs text-blue-400">{gemCount} {gemCount === 1 ? "gem" : "gems"}</span>
          )}
        </div>
        {enchants.map((e, i) => (
          <p key={i} className="text-xs text-text-muted">{e.name}</p>
        ))}
      </div>
    </div>
  )
}

type GearGridProps = { items: GearSlots }

const GearGrid = ({ items }: GearGridProps) => {
  const slots = Object.keys(SLOT_LABELS) as (keyof GearSlots)[]
  const filled = slots.filter(slot => items[slot])

  if (!filled.length) return null

  return (
    <div>
      <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">Gear</h2>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {filled.map(slot => (
          <GearTile key={slot} slot={SLOT_LABELS[slot]} item={items[slot]!} />
        ))}
      </div>
    </div>
  )
}

export default GearGrid
