import type { CharacterProfile } from "@/types/raiderio/character"

type Props = { profile: CharacterProfile }

const CharacterHeader = ({ profile }: Props) => (
  <div className="flex items-center gap-6">
    <img
      src={profile.thumbnail_url}
      alt={profile.name}
      className="h-20 w-20 rounded-xl border border-border object-cover"
    />
    <div>
      <h1 className="text-3xl font-bold text-text-primary">{profile.name}</h1>
      <p className="mt-1 text-text-secondary">
        {profile.active_spec_name} {profile.class} &mdash; {profile.realm} ({profile.region.toUpperCase()})
      </p>
      <p className="mt-0.5 text-sm capitalize text-text-muted">
        {profile.race} &middot; {profile.faction}
      </p>
    </div>
  </div>
)

export default CharacterHeader
