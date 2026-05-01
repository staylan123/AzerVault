import type { WinningGuild } from "@/types/raiderio/raiding"

type Props = {
  guilds: WinningGuild[]
  totalBosses: number
}

const WinningGuilds = ({ guilds, totalBosses }: Props) => (
  <div className="overflow-x-auto rounded-xl border border-border">
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-border bg-surface text-xs uppercase tracking-widest text-text-muted">
          <th className="px-4 py-3 text-right w-12">#</th>
          <th className="px-4 py-3 text-left">Guild</th>
          <th className="px-4 py-3 text-left">Faction</th>
          <th className="px-4 py-3 text-right">Bosses</th>
        </tr>
      </thead>
      <tbody>
        {guilds.map((entry) => {
          const { guild, rank, encountersDefeated } = entry
          const isHorde = guild.faction?.toLowerCase() === "horde"
          return (
            <tr
              key={guild.id}
              className="border-b border-border/50 transition-colors hover:bg-surface/60 last:border-0"
            >
              <td className="px-4 py-3 text-right tabular-nums text-text-muted">{rank}</td>
              <td className="px-4 py-3">
                <a
                  href={`https://raider.io${guild.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary transition-colors hover:text-primary-hover"
                >
                  {guild.name}
                </a>
                <div className="text-xs text-text-muted mt-0.5">
                  {guild.realm.name} ({guild.region.short_name})
                </div>
              </td>
              <td className="px-4 py-3">
                <span className={isHorde ? "text-red-400" : "text-blue-400"}>
                  {isHorde ? "Horde" : "Alliance"}
                </span>
              </td>
              <td className="px-4 py-3 text-right tabular-nums text-text-secondary">
                {encountersDefeated.length}
                <span className="text-text-muted">/{totalBosses}</span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default WinningGuilds
