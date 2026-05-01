import { useEffect } from "react"
import { useParams, useSearchParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { useGuildProfile } from "@/hooks/useGuildProfile"
import type { GuildProfile } from "@/types/raiderio/guild"
import GuildHeader from "./components/GuildHeader"
import GuildRaidProgression from "./components/GuildRaidProgression"
import GuildRaidRankings from "./components/GuildRaidRankings"
import GuildMembers from "./components/GuildMembers"

const GuildView = ({ profile }: { profile: GuildProfile }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="flex flex-col gap-8"
  >
    <Link
      to="/guild"
      className="flex w-fit items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text-primary"
    >
      &#8592; Guild Search
    </Link>
    <GuildHeader profile={profile} />
    {profile.raid_progression && (
      <GuildRaidProgression raidProgression={profile.raid_progression} />
    )}
    {profile.raid_rankings && (
      <GuildRaidRankings raidRankings={profile.raid_rankings} />
    )}
    {profile.members && profile.members.length > 0 && (
      <GuildMembers members={profile.members} />
    )}
  </motion.div>
)

const GuildPage = () => {
  const { region = "", realm = "", name = "" } = useParams()
  const [searchParams] = useSearchParams()
  const fields = (searchParams.get("fields") ?? "raid_progression,raid_rankings,members")
    .split(",")
    .filter(Boolean)
  const { profile, loading, error, getProfile } = useGuildProfile()

  useEffect(() => {
    if (region && realm && name) getProfile(region, realm, decodeURIComponent(name), fields)
  }, [region, realm, name])

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-12 pt-24">
        {loading && (
          <div className="flex items-center justify-center py-32">
            <p className="text-sm text-text-muted">Looking up guild...</p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center py-32">
            <p className="text-sm text-danger">{error}</p>
          </div>
        )}
        {profile && <GuildView profile={profile} />}
    </main>
  )
}

export default GuildPage
