import type { RunModifier } from "@/types/raiderio/mythic-plus"
import { wowIconUrl } from "@/utils/wow"

type RunModifiersProps = {
  modifiers: RunModifier[]
}

const RunModifiers = ({ modifiers }: RunModifiersProps) => {
  if (!modifiers.length) return null

  return (
    <div className="flex flex-col gap-2">
      {modifiers.map(m => (
        <div key={m.id} className="flex items-start gap-2.5 rounded-lg bg-background px-3 py-2">
          <img
            src={wowIconUrl(m.icon)}
            alt={m.name}
            className="h-8 w-8 shrink-0 rounded"
          />
          <div>
            <p className="text-xs font-medium text-text-primary">{m.name}</p>
            <p className="text-xs text-text-muted leading-relaxed">{m.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RunModifiers
