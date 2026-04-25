import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAffixes } from "@/hooks/useAffixes"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"
import AffixList from "./components/AffixList"
import AffixRecentRun from "./components/AffixRecentRun"

const REGIONS = ["us", "eu", "kr", "tw"] as const
const LOCALES = ["en", "ru", "ko", "cn", "pt", "it", "fr", "es", "de", "tw"] as const

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
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="mx-auto w-full max-w-4xl flex-1 px-6 pb-12 pt-24">
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

      <Footer />
    </div>
  )
}

export default AffixesPage
