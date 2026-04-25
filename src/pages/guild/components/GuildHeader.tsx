import type { GuildProfile } from "@/types/raiderio/guild"
import { formatRelativeTime } from "@/utils/date"

type GuildHeaderProps = { profile: GuildProfile }

const GuildHeader = ({ profile }: GuildHeaderProps) => (
  <div>
    <div className="flex items-baseline gap-3">
      <h1 className="text-3xl font-bold text-text-primary">{profile.name}</h1>
      <a
        href={profile.profile_url}
        target="_blank"
        rel="noreferrer"
        className="text-xs text-primary hover:underline"
      >
        Raider.io ↗
      </a>
    </div>
    <p className="mt-1 capitalize text-text-secondary">
      {profile.faction} &mdash; {profile.realm} ({profile.region.toUpperCase()})
    </p>
    {profile.last_crawled_at && (
      <p className="mt-1 text-xs text-text-muted">
        Last updated {formatRelativeTime(profile.last_crawled_at)}
      </p>
    )}
  </div>
)

export default GuildHeader
