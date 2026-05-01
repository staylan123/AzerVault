import { Play } from "lucide-react"
import type { BossKill } from "@/types/raiderio/raiding"
import { formatDate } from "@/utils/date"

type Props = {
  bossKills: BossKill[]
}

const getYoutubeUrl = (bossKillVideo: BossKill["bossKillVideo"]) => {
  const entry = bossKillVideo?.find(v => v.type === "youtube")
  return entry ? `https://www.youtube.com/watch?v=${entry.id}` : null
}

const BossProgression = ({ bossKills }: Props) => {
  const sorted = [...bossKills].sort((a, b) => a.bossSummary.ordinal - b.bossSummary.ordinal)

  return (
    <div className="flex flex-col gap-6">
      {sorted.map((bk) => {
        const videoUrl = getYoutubeUrl(bk.bossKillVideo)

        return (
          <div key={bk.bossSummary.encounterId} className="flex flex-col gap-2">
            <div className="flex items-center gap-2.5">
              <h3 className="text-sm font-semibold text-text-primary">
                {bk.bossSummary.name}
              </h3>
              <span className="text-xs text-text-muted">
                {bk.defeatedBy.totalCount.toLocaleString()} clears
              </span>
            </div>

            {bk.defeatedBy.guilds.length === 0 ? (
              <p className="text-sm text-text-muted">No results found.</p>
            ) : (
            <div className="overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface text-xs uppercase tracking-widest text-text-muted">
                    <th className="px-4 py-2.5 text-right w-12">#</th>
                    <th className="px-4 py-2.5 text-left">Guild</th>
                    <th className="px-4 py-2.5 text-left">Faction</th>
                    <th className="px-4 py-2.5 text-left">Kill Date</th>
                    <th className="px-4 py-2.5 text-left">Video</th>
                  </tr>
                </thead>
                <tbody>
                  {bk.defeatedBy.guilds.map((entry, i) => {
                    const isHorde = entry.guild.faction?.toLowerCase() === "horde"
                    const entryVideoUrl = i === 0 ? videoUrl : null

                    return (
                      <tr
                        key={entry.guild.id}
                        className="border-b border-border/50 transition-colors hover:bg-surface/60 last:border-0"
                      >
                        <td className="px-4 py-2.5 text-right tabular-nums text-text-muted">{i + 1}</td>
                        <td className="px-4 py-2.5">
                          <a
                            href={`https://raider.io${entry.guild.path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary transition-colors hover:text-primary-hover"
                          >
                            {entry.guild.name}
                          </a>
                          <div className="text-xs text-text-muted mt-0.5">
                            {entry.guild.realm.name} ({entry.guild.region.short_name})
                          </div>
                        </td>
                        <td className="px-4 py-2.5">
                          <span className={isHorde ? "text-red-400" : "text-blue-400"}>
                            {isHorde ? "Horde" : "Alliance"}
                          </span>
                        </td>
                        <td className="px-4 py-2.5 text-text-secondary">{formatDate(entry.defeatedAt)}</td>
                        <td className="px-4 py-2.5">
                          {entryVideoUrl && (
                            <a
                              href={entryVideoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-primary transition-colors hover:text-primary-hover"
                            >
                              <Play size={13} className="fill-current" />
                              <span className="text-xs">Watch</span>
                            </a>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default BossProgression
