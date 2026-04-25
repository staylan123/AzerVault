import type { GuildMember } from "@/types/raiderio/guild"

type GuildMembersProps = { members: GuildMember[] }

const RANK_LABELS: Record<number, string> = {
  0: "Guild Master",
  1: "Officer",
  2: "Officer Alt",
}

const GuildMembers = ({ members }: GuildMembersProps) => {
  const sorted = [...members].sort(
    (a, b) => a.rank - b.rank || a.character.name.localeCompare(b.character.name),
  )

  return (
    <div>
      <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">
        Members ({members.length})
      </h2>
      <div className="overflow-x-auto rounded-xl border border-border">
        <div className="max-h-[520px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-border bg-surface text-left">
                <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-text-muted">Name</th>
                <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-text-muted">Race / Class / Spec</th>
                <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-text-muted">Role</th>
                <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-text-muted">Faction</th>
                <th className="px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-text-muted text-right">Achiev. Pts</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(({ rank, character: c }) => (
                <tr
                  key={`${c.name}-${c.realm}`}
                  className="border-b border-border last:border-0 hover:bg-surface transition-colors"
                >
                  <td className="px-4 py-2.5">
                    <a
                      href={c.profile_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium text-primary hover:underline"
                    >
                      {c.name}
                    </a>
                    <p className="text-xs text-text-muted">{RANK_LABELS[rank] ?? `Rank ${rank}`}</p>
                  </td>
                  <td className="px-4 py-2.5 text-text-secondary">
                    <span className="capitalize">{c.race}</span>
                    {" · "}
                    <span>{c.class}</span>
                    {" · "}
                    <span>{c.active_spec_name}</span>
                  </td>
                  <td className="px-4 py-2.5 capitalize text-text-secondary">{c.active_spec_role}</td>
                  <td className="px-4 py-2.5 capitalize text-text-secondary">{c.faction}</td>
                  <td className="px-4 py-2.5 text-right text-text-secondary">
                    {c.achievement_points.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GuildMembers
