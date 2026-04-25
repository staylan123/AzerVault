import type { GuildRaidRankings as GuildRaidRankingsType } from "@/types/raiderio/guild"

type GuildRaidRankingsProps = { raidRankings: GuildRaidRankingsType }

const GuildRaidRankings = ({ raidRankings }: GuildRaidRankingsProps) => {
  const entries = Object.entries(raidRankings)
  if (!entries.length) return null

  return (
    <div>
      <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">Raid Rankings</h2>
      <div className="flex flex-col gap-3">
        {entries.map(([slug, ranks]) => (
          <div key={slug} className="rounded-xl bg-surface p-4">
            <p className="mb-3 text-sm font-semibold capitalize text-text-primary">
              {slug.replace(/-/g, " ")}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {(["mythic", "heroic", "normal"] as const).map(diff => {
                const r = ranks[diff]
                if (!r || (r.world === 0 && r.region === 0 && r.realm === 0)) return null
                return (
                  <div key={diff} className="rounded-lg bg-background px-3 py-2">
                    <p className="text-xs uppercase tracking-widest text-text-muted">{diff}</p>
                    <p className="mt-1 text-sm text-text-primary">
                      <span className="font-bold text-primary">#{r.world}</span>{" "}
                      <span className="text-text-muted">World</span>
                    </p>
                    <p className="text-xs text-text-muted">#{r.region} Region · #{r.realm} Realm</p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GuildRaidRankings
