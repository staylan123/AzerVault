import type { MythicPlusSeasonScore } from "@/types/raiderio/character"
import { ROLES } from "@/data/game"

type ScoreBreakdownProps = { seasonScore: MythicPlusSeasonScore }

const ScoreBreakdown = ({ seasonScore }: ScoreBreakdownProps) => {
  const active = ROLES.filter(
    ({ key }) => seasonScore.scores[key] > 0,
  )

  if (active.length === 0) return null

  return (
    <div>
      <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">
        Score Breakdown
      </h2>
      <div className="flex flex-wrap gap-4">
        {active.map(({ key, label }) => (
          <div key={key} className="rounded-xl bg-surface px-5 py-4">
            <p className="text-xs uppercase tracking-widest text-text-muted">{label}</p>
            <p
              className="mt-1 text-2xl font-bold"
              style={{ color: seasonScore.segments[key].color }}
            >
              {seasonScore.scores[key].toFixed(1)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScoreBreakdown
