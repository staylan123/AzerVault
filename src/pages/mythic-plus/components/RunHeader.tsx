import { formatTime, formatRemaining } from "@/utils/time"
import { formatDate } from "@/utils/date"

type RunHeaderProps = {
  rank: number
  score: number
  dungeonName: string
  mythicLevel: number
  clearTimeMs: number
  keystoneTimeMs: number
  timeRemainingMs: number
  completedAt: string
}

const RunHeader = ({
  rank,
  score,
  dungeonName,
  mythicLevel,
  clearTimeMs,
  keystoneTimeMs,
  timeRemainingMs,
  completedAt,
}: RunHeaderProps) => {
  const timed = timeRemainingMs >= 0

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-xs font-semibold text-text-muted">#{rank}</span>
          <span className="font-semibold text-text-primary">{dungeonName}</span>
          <span className="font-bold text-primary">+{mythicLevel}</span>
          <span className={`text-xs font-medium ${timed ? "text-primary" : "text-text-muted"}`}>
            {timed ? "Timed" : "Depleted"}
          </span>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-semibold text-accent-gold">{score.toFixed(1)}</p>
          <p className="text-xs text-text-muted">score</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs">
        <div>
          <span className="text-text-muted">Clear </span>
          <span className="text-text-secondary">{formatTime(clearTimeMs)}</span>
          <span className="text-text-muted"> / {formatTime(keystoneTimeMs)}</span>
        </div>
        <div>
          <span className="text-text-muted">Remaining </span>
          <span className={timed ? "text-primary" : "text-text-secondary"}>
            {formatRemaining(timeRemainingMs)}
          </span>
        </div>
        <div>
          <span className="text-text-muted">Completed </span>
          <span className="text-text-secondary">{formatDate(completedAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default RunHeader
