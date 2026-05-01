import type { MythicPlusRun } from "@/types/raiderio/character"
import { formatTime } from "@/utils/time"

const RunRow = ({ run }: { run: MythicPlusRun }) => (
  <div className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 text-sm">
    <div className="flex items-center gap-3">
      <img src={run.icon_url} alt={run.dungeon} className="h-8 w-8 rounded" />
      <div>
        <p className="font-medium text-text-primary">{run.dungeon}</p>
        <p className="text-xs text-text-muted">{run.affixes.map(a => a.name).join(" · ")}</p>
      </div>
    </div>
    <div className="flex items-center gap-6 text-right">
      <div>
        <p className="font-semibold text-primary">+{run.mythic_level}</p>
        <p className="text-xs text-text-muted">
          {run.num_keystone_upgrades > 0 ? `+${run.num_keystone_upgrades} chest` : "Depleted"}
        </p>
      </div>
      <div>
        <p className="text-text-secondary">{formatTime(run.clear_time_ms)}</p>
        <p className="text-xs text-text-muted">/ {formatTime(run.par_time_ms)}</p>
      </div>
      <div>
        <p className="font-medium text-accent-gold">{run.score.toFixed(1)}</p>
        <p className="text-xs text-text-muted">score</p>
      </div>
    </div>
  </div>
)

type RecentRunsProps = { runs: MythicPlusRun[]; title?: string }

const RecentRuns = ({ runs, title = "Recent Runs" }: RecentRunsProps) => {
  if (!runs?.length) return null

  return (
    <div>
      <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">{title}</h2>
      <div className="flex flex-col gap-2">
        {runs.slice(0, 8).map(run => (
          <RunRow key={run.keystone_run_id} run={run} />
        ))}
      </div>
    </div>
  )
}

export default RecentRuns
