import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { LuChevronLeft } from "react-icons/lu"
import { motion } from "framer-motion"
import { useAffixes } from "@/hooks/useAffixes"
import AffixList from "./components/AffixList"
import AffixRecentRun from "./components/AffixRecentRun"
import { REGIONS, LOCALES } from "@/data/game"

const inputClass =
  "h-11 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary focus:border-primary/60 focus:outline-none transition-colors"

const AffixesPage = () => {
  const [region, setRegion] = useState<string>("us")
  const [locale, setLocale] = useState<string>("")
  const { data, loading, error, getAffixes } = useAffixes()

  useEffect(() => {
    getAffixes("us")
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    getAffixes(region, locale || undefined)
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-12 pt-24">
        <Link
          to="/mythic-plus"
          className="mb-6 inline-flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-text-primary"
        >
          <LuChevronLeft size={15} />
          Mythic+
        </Link>

        <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-text-muted">Region</label>
            <select
              value={region}
              onChange={e => setRegion(e.target.value)}
              className={inputClass}
            >
              {REGIONS.map(r => (
                <option key={r} value={r}>{r.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs uppercase tracking-widest text-text-muted">Locale</label>
            <select
              value={locale}
              onChange={e => setLocale(e.target.value)}
              className={inputClass}
            >
              <option value="">Default</option>
              {LOCALES.map(l => (
                <option key={l} value={l}>{l.toUpperCase()}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-11 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Loading…" : "Search"}
          </button>
        </form>

        {error && <p className="mt-8 text-sm text-danger">{error}</p>}

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-8"
          >
            <AffixList
              title={data.title}
              leaderboardUrl={data.leaderboard_url}
              affixes={data.affix_details}
            />
            {data.recent_run && <AffixRecentRun run={data.recent_run} />}
          </motion.div>
        )}
    </main>
  )
}

export default AffixesPage
