import { Link } from "react-router-dom"
import type { CharacterProfile } from "@/types/raiderio/character"
import { CLASS_COLORS, FACTION_COLORS } from "@/data/colors"

type CharacterHeaderProps = { profile: CharacterProfile }

const CharacterHeader = ({ profile }: CharacterHeaderProps) => (
  <div className="flex items-center gap-6">
    <img
      src={profile.thumbnail_url}
      alt={profile.name}
      className="h-20 w-20 rounded-xl border border-border object-cover"
    />
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold text-text-primary">{profile.name}</h1>
        <a
          href={profile.profile_url}
          target="_blank"
          rel="noreferrer"
          className="text-text-muted transition-colors hover:text-text-primary"
          title="View on Raider.io"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
        </a>
      </div>
      <p className="mt-1 text-text-secondary">
        <span style={{ color: CLASS_COLORS[profile.class] }}>
          {profile.active_spec_name} {profile.class}
        </span>
        {" "}&mdash; {profile.active_spec_role} &mdash; {profile.realm} ({profile.region.toUpperCase()})
      </p>
      <p className="mt-0.5 text-sm capitalize text-text-muted">
        {profile.race} &middot;{" "}
        <span style={{ color: FACTION_COLORS[profile.faction] }}>{profile.faction}</span>
        {profile.guild && (
          <>
            {" "}&middot;{" "}
            <Link
              to={`/guild/${profile.region}/${profile.guild.realm.toLowerCase().replace(/'/g, "").replace(/\s+/g, "-")}/${encodeURIComponent(profile.guild.name)}`}
              className="transition-colors hover:text-text-primary underline"
            >
              {profile.guild.name}
            </Link>
          </>
        )}
      </p>
      <p className="mt-1 text-xs text-text-muted">
        Updated {new Date(profile.last_crawled_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
      </p>
    </div>
  </div>
)

export default CharacterHeader
