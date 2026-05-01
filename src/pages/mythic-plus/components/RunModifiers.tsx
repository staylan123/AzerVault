import type { RunModifier } from "@/types/raiderio/mythic-plus"
import { wowIconUrl } from "@/utils/wow"

type RunModifiersProps = {
  modifiers: RunModifier[]
}

const RunModifiers = ({ modifiers }: RunModifiersProps) => {
  if (!modifiers.length) return null

  return (
    <div className="flex flex-wrap gap-3">
      {modifiers.map(m => (
        <div key={m.id} className="flex items-center gap-1.5">
          <img
            src={wowIconUrl(m.icon)}
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
