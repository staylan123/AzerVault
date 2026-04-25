import type { RaidProgression } from "@/types/raiderio/character"

type GuildRaidProgressionProps = { raidProgression: RaidProgression }

const GuildRaidProgression = ({ raidProgression }: GuildRaidProgressionProps) => {
  const active = Object.entries(raidProgression).filter(
    ([, r]) => r.normal_bosses_killed + r.heroic_bosses_killed + r.mythic_bosses_killed > 0,
  )
  if (!active.length) return null
  return (
    <div>
      <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">Raid Progression</h2>
      <div className="flex flex-wrap gap-3">
        {active.map(([slug, raid]) => (
          <div key={slug} className="rounded-lg bg-surface px-4 py-3">
            <p className="text-sm font-medium capitalize text-text-primary">
              {slug.replace(/-/g, " ")}
            </p>
            <p className="mt-0.5 text-xs text-text-muted">{raid.summary}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GuildRaidProgression
