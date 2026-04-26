import type { TalentLoadout } from "@/types/raiderio/character"

const ICON_BASE = "https://cdn.raiderio.net/images/wow/icons/medium"

type TalentBuildProps = { loadout: TalentLoadout }

const TalentBuild = ({ loadout }: TalentBuildProps) => {
  const { active_hero_tree, class_talents, spec_talents, hero_talents } = loadout

  const summaryTalents = [...class_talents, ...spec_talents, ...hero_talents].filter(
    t => t.includeInSummary,
  )

  return (
    <div>
      <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">Talent Build</h2>
      <div className="rounded-xl bg-surface p-4">
        <div className="mb-4 flex items-center gap-3">
          <img
            src={active_hero_tree.iconUrl}
            alt={active_hero_tree.name}
            className="h-10 w-10 shrink-0 rounded-lg"
          />
          <div>
            <p className="font-semibold text-text-primary">{active_hero_tree.name}</p>
            <p className="text-xs text-text-muted">{active_hero_tree.description}</p>
          </div>
        </div>
        {summaryTalents.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {summaryTalents.map(t => {
              const entry = t.node.entries[t.entryIndex]
              return (
                <div
                  key={t.node.id}
                  className="flex items-center gap-1.5 rounded-lg bg-background px-2 py-1.5"
                >
                  <img
                    src={`${ICON_BASE}/${entry.spell.icon}.jpg`}
                    alt={entry.spell.name}
                    className="h-5 w-5 shrink-0 rounded"
                  />
                  <span className="text-xs text-text-secondary">{entry.spell.name}</span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default TalentBuild
