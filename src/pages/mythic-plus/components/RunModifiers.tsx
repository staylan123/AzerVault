import type { RunModifier } from "@/types/raiderio/mythic-plus"

type RunModifiersProps = {
  modifiers: RunModifier[]
}

const iconUrl = (icon: string) =>
  `https://wow.zamimg.com/images/wow/icons/medium/${icon}.jpg`

const RunModifiers = ({ modifiers }: RunModifiersProps) => {
  if (!modifiers.length) return null

  return (
    <div className="flex flex-wrap gap-3">
      {modifiers.map(m => (
        <div key={m.id} className="flex items-center gap-1.5">
          <img
            src={iconUrl(m.icon)}
            alt={m.name}
            className="h-5 w-5 shrink-0 rounded"
          />
          <span className="text-xs text-text-muted">{m.name}</span>
        </div>
      ))}
    </div>
  )
}

export default RunModifiers
