import type { CharacterProfile } from "@/types/raiderio/character"

type StatCardsProps = { profile: CharacterProfile }

const StatCards = ({ profile }: StatCardsProps) => {
  const mpScore = profile.mythic_plus_scores_by_season?.[0]?.scores.all ?? 0

  const stats = [
    { label: "Item Level", value: profile.gear.item_level_equipped },
    { label: "M+ Score", value: mpScore.toFixed(1) },
    { label: "World Rank", value: profile.mythic_plus_ranks.overall.world.toLocaleString() },
    { label: "Region Rank", value: profile.mythic_plus_ranks.overall.region.toLocaleString() },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map(({ label, value }) => (
        <div key={label} className="rounded-xl bg-surface p-4">
          <p className="text-xs uppercase tracking-widest text-text-muted">{label}</p>
          <p className="mt-1 text-2xl font-bold text-text-primary">{value}</p>
        </div>
      ))}
    </div>
  )
}

export default StatCards
