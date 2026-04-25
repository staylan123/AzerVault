import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useAffixes } from "@/hooks/useAffixes"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const REGIONS = ["us", "eu", "kr", "tw"] as const
const LOCALES = ["en", "ru", "ko", "cn", "pt", "it", "fr", "es", "de", "tw"] as const

const inputClass =
  "h-11 rounded-lg border border-border bg-surface px-4 text-sm text-text-primary focus:border-primary/60 focus:outline-none transition-colors"

const formatTime = (ms: number) => {
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${m}:${s.toString().padStart(2, "0")}`
}

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
            className="h-11 rounded-lg bg-primary px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? "Loading…" : "Search"}
          </button>
        </form>

        {error && (
          <p className="mt-8 text-sm text-danger">{error}</p>
        )}

        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mt-10 flex flex-col gap-8"
          >
            <div>
              <h1 className="text-xl font-bold text-text-primary">{data.title}</h1>
              <a
                href={data.leaderboard_url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 text-xs text-primary hover:underline"
              >
                View Leaderboard →
              </a>
            </div>

            <div>
              <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">This Week's Affixes</h2>
              <div className="flex flex-wrap gap-4">
                {data.affix_details.map(affix => (
                  <div key={affix.id} className="flex items-start gap-3 rounded-xl bg-surface p-4 w-full sm:w-auto sm:max-w-sm">
                    <img src={affix.icon_url} alt={affix.name} className="h-12 w-12 shrink-0 rounded-lg" />
                    <div>
                      <a
                        href={affix.wowhead_url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-text-primary hover:text-primary"
                      >
                        {affix.name}
                      </a>
                      <p className="mt-0.5 text-xs text-text-muted">{affix.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {data.recent_run && (
              <div>
                <h2 className="mb-3 text-xs uppercase tracking-widest text-text-muted">Recent Run</h2>
                <a
                  href={data.recent_run.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-xl bg-surface p-4 transition-colors hover:border-primary/40 border border-transparent"
                >
                  <img
                    src={data.recent_run.icon_url}
                    alt={data.recent_run.dungeon}
                    className="h-14 w-14 shrink-0 rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary">{data.recent_run.dungeon}</p>
                    <p className="text-xs text-text-muted mt-0.5">
                      {data.recent_run.affixes.map(a => a.name).join(" · ")}
                    </p>
                  </div>
                  <div className="flex gap-6 text-right shrink-0">
                    <div>
                      <p className="font-semibold text-primary">+{data.recent_run.mythic_level}</p>
                      <p className="text-xs text-text-muted">
                        {data.recent_run.num_keystone_upgrades > 0
                          ? `+${data.recent_run.num_keystone_upgrades} chest`
                          : "Depleted"}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-secondary">{formatTime(data.recent_run.clear_time_ms)}</p>
                      <p className="text-xs text-text-muted">/ {formatTime(data.recent_run.par_time_ms)}</p>
                    </div>
                    <div>
                      <p className="font-medium text-accent-gold">{data.recent_run.score.toFixed(1)}</p>
                      <p className="text-xs text-text-muted">score</p>
                    </div>
                  </div>
                </a>
              </div>
            )}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default AffixesPage
