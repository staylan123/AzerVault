import type { RosterMember } from "@/types/raiderio/mythic-plus"
import { classColor, factionColor, shortName, formatRole } from "@/utils/wow"
import { ROLE_ORDER } from "@/data/game"

const sortRoster = (roster: RosterMember[]) =>
  [...roster].sort(
    (a, b) =>
      (ROLE_ORDER[a.role as keyof typeof ROLE_ORDER] ?? 2) -
      (ROLE_ORDER[b.role as keyof typeof ROLE_ORDER] ?? 2),
  )

type RunRosterProps = {
  roster: RosterMember[]
}

const RunRoster = ({ roster }: RunRosterProps) => {
  const sorted = sortRoster(roster)

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-surface/60 text-xs uppercase tracking-widest text-text-muted">
            <th className="px-4 py-2.5 text-left">Name</th>
            <th className="px-4 py-2.5 text-left">Spec / Class / Role</th>
            <th className="px-4 py-2.5 text-left">Level</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((member, i) => {
            const { character, role } = member
            return (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="px-4 py-2.5">
                  <a
                    href={`https://raider.io${character.path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="block truncate font-medium transition-opacity hover:opacity-80"
                    style={{ color: classColor(character.class.name) }}
                  >
                    {shortName(character.name)}
                  </a>
                  <p className="mt-0.5 text-xs text-text-muted">
                    <span style={{ color: factionColor(character.faction) }}>
                      {character.faction.charAt(0).toUpperCase() + character.faction.slice(1)}
                    </span>
                    {" · "}
                    {character.region.short_name.toUpperCase()}
                  </p>
                </td>
                <td className="px-4 py-2.5 text-text-secondary">
                  {character.spec.name} {character.class.name} ({formatRole(role)})
                </td>
                <td className="px-4 py-2.5 text-text-secondary">
                  {character.level}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RunRoster
