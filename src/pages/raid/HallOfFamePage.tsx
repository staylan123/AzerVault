import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { motion } from "framer-motion"
import { useRaidStaticData } from "@/hooks/useRaidStaticData"
import { REGIONS as BASE_REGIONS, EXPANSIONS, DIFFICULTIES } from "@/data/game"
import { useHallOfFame } from "@/hooks/useHallOfFame"
import WinningGuilds from "./components/WinningGuilds"
import BossProgression from "./components/BossProgression"

const REGIONS = ["world", ...BASE_REGIONS] as const

const inputClass =
  "h-11 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary focus:border-primary/60 focus:outline-none transition-colors disabled:opacity-40"

const HallOfFamePage = () => {
  const { expansionId: paramExpansion, raid: paramRaid, difficulty: paramDifficulty, region: paramRegion } = useParams()
  const navigate = useNavigate()

  const [expansionId, setExpansionId] = useState(paramExpansion ? Number(paramExpansion) : 10)
  const [selectedRaid, setSelectedRaid] = useState(paramRaid ?? "")
  const [difficulty, setDifficulty] = useState(paramDifficulty ?? "mythic")
  const [region, setRegion] = useState(paramRegion ?? "world")

  const { data: staticData, loading: staticLoading, error: staticError, getStaticData } = useRaidStaticData()
  const { data: hofData, loading: hofLoading, error: hofError, getHallOfFame } = useHallOfFame()

  useEffect(() => {
    getStaticData(expansionId)
  }, [expansionId])

  useEffect(() => {
    if (staticData?.raids?.length && !paramRaid) {
      setSelectedRaid(staticData.raids[0].slug)
    }
  }, [staticData])

  useEffect(() => {
    if (paramRaid && paramDifficulty && paramRegion) {
      getHallOfFame(paramRaid, paramDifficulty, paramRegion)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedRaid) {
      navigate(`/raid/hall-of-fame/${expansionId}/${selectedRaid}/${difficulty}/${region}`)
      getHallOfFame(selectedRaid, difficulty, region)
    }
  }

  const currentRaid = staticData?.raids.find(r => r.slug === selectedRaid)

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-12 pt-24">
        <Link
          to="/raid"
          className="mb-6 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          <ChevronLeft size={15} />
          Raiding
        </Link>

        <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-text-muted">Expansion</label>
            <select
              value={expansionId}
              onChange={e => setExpansionId(Number(e.target.value))}
              disabled={hofLoading}
              className={inputClass}
            >
              {EXPANSIONS.map(ex => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-text-muted">Raid</label>
            <select
              value={selectedRaid}
              onChange={e => setSelectedRaid(e.target.value)}
              disabled={staticLoading || !staticData || hofLoading}
              className={inputClass}
            >
              {staticLoading && <option value="">Loading…</option>}
              {staticData?.raids.map(raid => (
                <option key={raid.slug} value={raid.slug}>{raid.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-text-muted">Difficulty</label>
            <select
              value={difficulty}
              onChange={e => setDifficulty(e.target.value)}
              disabled={hofLoading}
              className={inputClass}
            >
              {DIFFICULTIES.map(d => (
                <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-text-muted">Region</label>
            <select
              value={region}
              onChange={e => setRegion(e.target.value)}
              disabled={hofLoading}
              className={inputClass}
            >
              {REGIONS.map(r => (
                <option key={r} value={r}>{r.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={hofLoading || !selectedRaid}
            className="h-11 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            {hofLoading ? "Loading…" : "Search"}
          </button>
        </form>

        {staticError && <p className="mt-6 text-sm text-danger">{staticError}</p>}
        {hofError && <p className="mt-6 text-sm text-danger">{hofError}</p>}

        {!hofData && !hofLoading && !hofError && (
          <div className="mt-10 rounded-xl border border-border bg-surface p-6 flex flex-col gap-4">
            <p className="text-xs uppercase tracking-widest text-text-muted">About this page</p>
            <p className="text-sm text-text-muted leading-relaxed">
              Hall of Fame tracks the guilds that have fully cleared a raid on a given difficulty. Select an expansion, raid, difficulty, and region, then hit Search to see the ranked list of clearing guilds alongside a per-boss breakdown of which guilds defeated each encounter first.
            </p>
          </div>
        )}

        {hofData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-4"
          >
            <div className="flex items-baseline gap-3">
              <h2 className="text-lg font-semibold text-text-primary">Hall of Fame</h2>
              <span className="text-sm text-text-muted">
                {currentRaid?.name} — {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </span>
            </div>

            {hofData.hallOfFame.winningGuilds.length === 0 ? (
              <p className="text-sm text-text-muted">No results found.</p>
            ) : (
              <WinningGuilds
                guilds={hofData.hallOfFame.winningGuilds}
                totalBosses={currentRaid?.encounters.length ?? 0}
              />
            )}

            {hofData.hallOfFame.bossKills.length > 0 && (
              <div className="flex flex-col gap-4 mt-4">
                <h2 className="text-lg font-semibold text-text-primary">Boss Progression</h2>
                <BossProgression bossKills={hofData.hallOfFame.bossKills} />
              </div>
            )}
          </motion.div>
        )}
    </main>
  )
}

export default HallOfFamePage
