import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { motion } from "framer-motion"
import { useCharacterProfile } from "@/hooks/useCharacterProfile"
import type { CharacterProfile } from "@/types/raiderio/character"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import CharacterHeader from "./components/CharacterHeader"
import StatCards from "./components/StatCards"
import GearGrid from "./components/GearGrid"
import RaidProgression from "./components/RaidProgression"
import RecentRuns from "./components/RecentRuns"

const CharacterView = ({ profile }: { profile: CharacterProfile }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="flex flex-col gap-8"
  >
    <CharacterHeader profile={profile} />
    <StatCards profile={profile} />
    <GearGrid items={profile.gear.items} />
    <RaidProgression raidProgression={profile.raid_progression} />
    <RecentRuns runs={profile.mythic_plus_recent_runs} />
  </motion.div>
)

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
