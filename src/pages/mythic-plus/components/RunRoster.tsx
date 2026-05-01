import type { RosterMember } from "@/types/raiderio/mythic-plus"
import { classColor, factionColor, shortName, formatRole } from "@/utils/wow"

const ROLE_ORDER = { tank: 0, healer: 1, dps: 2 } as const

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
    <div className="flex flex-col gap-2">
      <div className="border-b border-border pb-1.5 text-xs uppercase tracking-wider text-text-muted">
        <span>Player</span>
      </div>

      {sorted.map((member, i) => (
        <div key={i} className="min-w-0">
          <a
            href={`https://raider.io${member.character.path}`}
            target="_blank"
            rel="noreferrer"
            className="block truncate text-sm font-medium transition-opacity hover:opacity-80"
            style={{ color: classColor(member.character.class.name) }}
          >
            {shortName(member.character.name)}
          </a>
          <p className="mt-0.5 text-xs text-text-muted">
            {member.character.spec.name} {member.character.class.name}{" "}
            ({formatRole(member.role)}){" · "}
            <span style={{ color: factionColor(member.character.faction) }}>
              {member.character.faction.charAt(0).toUpperCase() + member.character.faction.slice(1)}
            </span>
            {" · "}
            {member.character.region.short_name.toUpperCase()}
          </p>
        </div>
      ))}
    </div>
  )
}

export default RunRoster
