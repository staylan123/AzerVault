import type { Affix } from "@/types/raiderio/affixes"

type AffixListProps = { affixes: Affix[]; leaderboardUrl: string; title: string }

const AffixList = ({ affixes, leaderboardUrl, title }: AffixListProps) => (
  <div>
    <div className="mb-3 flex items-baseline justify-between">
      <h1 className="text-xl font-bold text-text-primary">{title}</h1>
      <a
        href={leaderboardUrl}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-primary hover:underline"
      >
        View Leaderboard →
      </a>
    </div>
    <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">This Week's Affixes</h2>
    <div className="flex flex-wrap gap-4">
      {affixes.map(affix => (
        <div key={affix.id} className="flex items-start gap-3 rounded-xl bg-surface p-4 w-full sm:w-auto sm:max-w-sm">
          <img src={affix.icon_url} alt={affix.name} className="h-12 w-12 shrink-0 rounded-lg" />
          <div>
            <a
              href={affix.wowhead_url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-text-primary hover:text-primary"
            >
              {affix.name}
            </a>
            <p className="mt-0.5 text-xs text-text-muted">{affix.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default AffixList
