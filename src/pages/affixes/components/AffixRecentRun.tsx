import type { AffixRun } from "@/types/raiderio/affixes"

type AffixRecentRunProps = { run: AffixRun }

const formatTime = (ms: number) => {
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${m}:${s.toString().padStart(2, "0")}`
}

const AffixRecentRun = ({ run }: AffixRecentRunProps) => (
  <div>
    <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">Recent Run</h2>
    <a
      href={run.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-4 rounded-xl bg-surface p-4 border border-transparent transition-colors hover:border-primary/40"
    >
      <img src={run.icon_url} alt={run.dungeon} className="h-14 w-14 shrink-0 rounded-lg" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-text-primary">{run.dungeon}</p>
        <p className="text-xs text-text-muted mt-0.5">
          {run.affixes.map(a => a.name).join(" · ")}
        </p>
      </div>
      <div className="flex gap-6 text-right shrink-0">
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
    </a>
  </div>
)

export default AffixRecentRun
