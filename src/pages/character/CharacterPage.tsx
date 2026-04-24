import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { useCharacterProfile } from "@/hooks/useCharacterProfile"
import type { CharacterProfile, MythicPlusRun } from "@/types/raiderio/character"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const formatTime = (ms: number) => {
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${m}:${s.toString().padStart(2, "0")}`
}

const RunRow = ({ run }: { run: MythicPlusRun }) => (
  <div className="flex items-center justify-between rounded-lg bg-surface px-4 py-3 text-sm">
    <div className="flex items-center gap-3">
      <img src={run.icon_url} alt={run.dungeon} className="h-8 w-8 rounded" />
      <div>
        <p className="font-medium text-text-primary">{run.dungeon}</p>
        <p className="text-xs text-text-muted">{run.affixes.map(a => a.name).join(" · ")}</p>
      </div>
    </div>
    <div className="flex items-center gap-6 text-right">
      <div>
        <p className="font-semibold text-primary">+{run.mythic_level}</p>
        <p className="text-xs text-text-muted">
          {run.num_keystone_upgrades > 0 ? `+${run.num_keystone_upgrades} chest` : "Depleted"}
        </p>
      </div>
      <div>
        <p className="text-text-secondary">{formatTime(run.clear_time_ms)}</p>
        <p className="text-xs text-text-muted">/ {formatTime(run.par_time_ms)}</p>
      </div>
      <div>
        <p className="font-medium text-accent-gold">{run.score.toFixed(1)}</p>
        <p className="text-xs text-text-muted">score</p>
      </div>
    </div>
  </div>
)

const CharacterView = ({ profile }: { profile: CharacterProfile }) => {
  const mpScore = profile.mythic_plus_scores_by_season?.[0]?.scores.all ?? 0

  const activeRaids = Object.entries(profile.raid_progression).filter(
    ([, r]) => r.normal_bosses_killed + r.heroic_bosses_killed + r.mythic_bosses_killed > 0,
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col gap-8"
    >
      <div className="flex items-center gap-6">
        <img
          src={profile.thumbnail_url}
          alt={profile.name}
          className="h-20 w-20 rounded-xl border border-white/[0.08] object-cover"
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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: "Item Level", value: profile.gear.item_level_equipped },
          { label: "M+ Score", value: mpScore.toFixed(1) },
          { label: "World Rank", value: profile.mythic_plus_ranks.overall.world.toLocaleString() },
          { label: "Region Rank", value: profile.mythic_plus_ranks.overall.region.toLocaleString() },
        ].map(({ label, value }) => (
          <div key={label} className="rounded-xl bg-surface p-4">
            <p className="text-xs uppercase tracking-widest text-text-muted">{label}</p>
            <p className="mt-1 text-2xl font-bold text-text-primary">{value}</p>
          </div>
        ))}
      </div>

      {activeRaids.length > 0 && (
        <div>
          <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">Raid Progression</h2>
          <div className="flex flex-wrap gap-3">
            {activeRaids.map(([slug, raid]) => (
              <div key={slug} className="rounded-lg bg-surface px-4 py-3">
                <p className="text-sm font-medium capitalize text-text-primary">
                  {slug.replace(/-/g, " ")}
                </p>
                <p className="mt-0.5 text-xs text-text-muted">{raid.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {profile.mythic_plus_recent_runs?.length > 0 && (
        <div>
          <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">Recent Runs</h2>
          <div className="flex flex-col gap-2">
            {profile.mythic_plus_recent_runs.slice(0, 8).map(run => (
              <RunRow key={run.keystone_run_id} run={run} />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

const CharacterPage = () => {
  const { region = "", realm = "", name = "" } = useParams()
  const { profile, loading, error, getProfile } = useCharacterProfile()

  useEffect(() => {
    if (region && realm && name) getProfile(region, realm, name)
  }, [region, realm, name])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-12 pt-24">
        {loading && (
          <div className="flex items-center justify-center py-32">
            <p className="text-sm text-text-muted">Looking up character...</p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center py-32">
            <p className="text-sm text-danger">{error}</p>
          </div>
        )}
        {profile && <CharacterView profile={profile} />}
      </main>
      <Footer />
    </div>
  )
}

export default CharacterPage
