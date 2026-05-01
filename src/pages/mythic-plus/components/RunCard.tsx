import { useState } from "react"
import { LuChevronDown } from "react-icons/lu"
import type { MythicRunRanking } from "@/types/raiderio/mythic-plus"
import RunHeader from "./RunHeader"
import RunModifiers from "./RunModifiers"
import RunRoster from "./RunRoster"

type RunCardProps = {
  ranking: MythicRunRanking
}

const RunCard = ({ ranking }: RunCardProps) => {
  const [open, setOpen] = useState(false)
  const { rank, score, run } = ranking

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full p-4 text-left flex items-start gap-3 transition-colors hover:bg-surface/80"
      >
        <div className="flex-1 min-w-0">
          <RunHeader
            rank={rank}
            score={score}
            dungeonName={run.dungeon.name}
            mythicLevel={run.mythic_level}
            clearTimeMs={run.clear_time_ms}
            keystoneTimeMs={run.keystone_time_ms}
            timeRemainingMs={run.time_remaining_ms}
            completedAt={run.completed_at}
          />
        </div>
        <LuChevronDown
          size={16}
          className={`mt-1 shrink-0 text-text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="border-t border-border px-4 pb-4 pt-3 flex flex-col gap-4">
          {run.weekly_modifiers.length > 0 && (
            <div className="flex flex-col gap-2">
              <p className="text-xs uppercase tracking-widest text-text-muted">Affixes</p>
              <RunModifiers modifiers={run.weekly_modifiers} />
            </div>
          )}
          <RunRoster roster={run.roster} />
        </div>
      )}
    </div>
  )
}

export default RunCard
