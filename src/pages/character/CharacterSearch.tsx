import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { SiLionair } from "react-icons/si"
import { REALMS_BY_REGION } from "@/data/realms"
import { REGIONS as BASE_REGIONS } from "@/data/game"

const REGIONS = [...BASE_REGIONS, "cn"] as const
type Region = (typeof REGIONS)[number]

const inputClass =
  "h-11 w-full rounded-lg border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-primary/60 focus:outline-none transition-colors disabled:opacity-40"

const CharacterSearch = () => {
  const [region, setRegion] = useState<Region>("us")
  const [realm, setRealm] = useState("")
  const [name, setName] = useState("")
  const navigate = useNavigate()

  const realms = REALMS_BY_REGION[region] ?? []

  const handleRegionChange = (r: Region) => {
    setRegion(r)
    setRealm("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!realm || !name.trim()) return
    navigate(`/character/${region}/${realm}/${name.trim().toLowerCase()}`)
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <SiLionair className="text-4xl text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">Look up a character</h1>
            <p className="text-sm text-text-muted">
              Enter a character name, realm, and region to view their profile.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-text-muted">Region</label>
              <select
                value={region}
                onChange={e => handleRegionChange(e.target.value as Region)}
                className={inputClass}
              >
                {REGIONS.map(r => (
                  <option key={r} value={r}>{r.toUpperCase()}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-text-muted">Realm</label>
              <select
                value={realm}
                onChange={e => setRealm(e.target.value)}
                disabled={realms.length === 0}
                className={inputClass}
              >
                <option value="">Select a realm</option>
                {realms.map(r => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs uppercase tracking-widest text-text-muted">Character Name</label>
              <input
                type="text"
                placeholder="e.g. Thrall"
                value={name}
                onChange={e => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={!realm || !name.trim()}
              className="mt-2 h-11 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              Search
            </button>
          </form>
        </motion.div>
    </main>
  )
}

export default CharacterSearch
