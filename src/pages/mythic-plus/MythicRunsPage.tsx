import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { useMythicPlusStaticData } from "@/hooks/useMythicPlusStaticData"
import { useMythicPlusRuns } from "@/hooks/useMythicPlusRuns"
import { REGIONS, EXPANSIONS } from "@/data/game"
import RunCard from "./components/RunCard"

const inputClass =
  "h-11 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary focus:border-primary/60 focus:outline-none transition-colors disabled:opacity-40"

const MythicRunsPage = () => {
  const {
    expansionId: paramExpansion,
    season: paramSeason,
    dungeon: paramDungeon,
    region: paramRegion,
    page: paramPage,
  } = useParams()
  const navigate = useNavigate()

  const [expansionId, setExpansionId] = useState(paramExpansion ? Number(paramExpansion) : 10)
  const [season, setSeason] = useState(paramSeason ?? "")
  const [dungeon, setDungeon] = useState(paramDungeon ?? "")
  const [region, setRegion] = useState(paramRegion ?? "us")
  const [page, setPage] = useState(paramPage ? Number(paramPage) - 1 : 0)

  const { data: staticData, loading: staticLoading, getStaticData } = useMythicPlusStaticData()
  const { data: runsData, loading: runsLoading, error: runsError, getRuns } = useMythicPlusRuns()

  useEffect(() => {
    setSeason(s => paramSeason ?? s)
    setDungeon(d => paramDungeon ?? d)
    getStaticData(expansionId)
  }, [expansionId])

  useEffect(() => {
    if (staticData?.seasons.length && !paramSeason) {
      setSeason(staticData.seasons[0].slug)
    }
  }, [staticData])

  const currentSeasonDungeons =
    staticData?.seasons.find(s => s.slug === season)?.dungeons ?? []

  useEffect(() => {
    if (currentSeasonDungeons.length && !paramDungeon) {
      setDungeon(currentSeasonDungeons[0].slug)
    }
  }, [season, staticData])

  useEffect(() => {
    if (paramSeason && paramDungeon && paramRegion) {
      getRuns(paramSeason, paramRegion, paramDungeon, paramPage ? Number(paramPage) - 1 : 0)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!season || !dungeon) return
    setPage(0)
    navigate(`/mythic-plus/runs/${expansionId}/${season}/${dungeon}/${region}/1`)
    getRuns(season, region, dungeon, 0)
  }

  const handleExpansionChange = (id: number) => {
    setSeason("")
    setDungeon("")
    setExpansionId(id)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
    navigate(`/mythic-plus/runs/${expansionId}/${season}/${dungeon}/${region}/${newPage + 1}`)
    getRuns(season, region, dungeon, newPage)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const activeDungeonName =
    runsData && currentSeasonDungeons.find(d => d.slug === runsData.params.dungeon)?.name

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 pb-12 pt-24">
      <Link
        to="/mythic-plus"
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text-primary"
      >
        <ChevronLeft size={15} />
        Mythic+
      </Link>

      <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-text-muted">Expansion</label>
          <select
            value={expansionId}
            onChange={e => handleExpansionChange(Number(e.target.value))}
            disabled={staticLoading || runsLoading}
            className={inputClass}
          >
            {EXPANSIONS.map(ex => (
              <option key={ex.id} value={ex.id}>{ex.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-text-muted">Season</label>
          <select
            value={season}
            onChange={e => setSeason(e.target.value)}
            disabled={staticLoading || runsLoading}
            className={inputClass}
          >
            {staticLoading && <option value="">Loading…</option>}
            {staticData?.seasons.map(s => (
              <option key={s.slug} value={s.slug}>{s.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-text-muted">Dungeon</label>
          <select
            value={dungeon}
            onChange={e => setDungeon(e.target.value)}
            disabled={staticLoading || !currentSeasonDungeons.length || runsLoading}
            className={inputClass}
          >
            {currentSeasonDungeons.map(d => (
              <option key={d.slug} value={d.slug}>{d.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs uppercase tracking-widest text-text-muted">Region</label>
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            disabled={runsLoading}
            className={inputClass}
          >
            {REGIONS.map(r => (
              <option key={r} value={r}>{r.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={runsLoading || staticLoading || !season || !dungeon}
          className="h-11 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
        >
          {runsLoading ? "Loading…" : "Search"}
        </button>
      </form>

      {runsError && <p className="mt-8 text-sm text-danger">{runsError}</p>}

      {!runsData && !runsLoading && !runsError && (
        <div className="mt-10 rounded-xl border border-border bg-surface p-6 flex flex-col gap-4">
          <p className="text-xs uppercase tracking-widest text-text-muted">About this page</p>
          <p className="text-sm text-text-muted leading-relaxed">
            Mythic Runs shows the top completed Mythic+ runs for a specific dungeon, season, and
            region. Select your filters and hit Search to see the ranked list of runs with roster
            details.
          </p>
        </div>
      )}

      {runsData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="mt-10 mb-4 flex items-baseline gap-3">
            <h2 className="text-lg font-semibold text-text-primary">Top Runs</h2>
            <span className="text-sm text-text-muted">
              {activeDungeonName} — {runsData.params.region.toUpperCase()} — Page {page + 1}
            </span>
          </div>

          {runsData.rankings.length === 0 ? (
            <p className="text-sm text-text-muted">No results found.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {runsData.rankings.map(r => (
                <RunCard key={r.run.keystone_run_id} ranking={r} />
              ))}
            </div>
          )}

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0 || runsLoading}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text-secondary transition-colors hover:border-primary/40 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={15} />
              Prev
            </button>
            <span className="text-sm text-text-muted">Page {page + 1}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={runsLoading || runsData.rankings.length === 0}
              className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text-secondary transition-colors hover:border-primary/40 hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight size={15} />
            </button>
          </div>
        </motion.div>
      )}
    </main>
  )
}

export default MythicRunsPage
