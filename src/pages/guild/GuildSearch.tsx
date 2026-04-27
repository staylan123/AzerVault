import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { SiLionair } from "react-icons/si"
import { REALMS_BY_REGION } from "@/data/realms"
import { REGIONS, type Region } from "@/data/game"
import Navbar from "@/components/navbar/Navbar"
import Footer from "@/components/footer/Footer"

const ALL_FIELDS = [
  { id: "raid_progression", label: "Raid Progression" },
  { id: "raid_rankings", label: "Raid Rankings" },
  { id: "members", label: "Members" },
] as const

const inputClass =
  "h-11 w-full rounded-lg border border-border bg-surface px-4 text-sm text-text-primary placeholder:text-text-muted focus:border-primary/60 focus:outline-none transition-colors disabled:opacity-40"

const GuildSearch = () => {
  const [region, setRegion] = useState<Region>("us")
  const [realm, setRealm] = useState("")
  const [name, setName] = useState("")
  const [fields, setFields] = useState<string[]>(["raid_progression", "raid_rankings", "members"])
  const navigate = useNavigate()

  const realms = REALMS_BY_REGION[region] ?? []

  const handleRegionChange = (r: Region) => {
    setRegion(r)
    setRealm("")
  }

  const toggleField = (id: string) => {
    setFields(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!realm || !name.trim() || fields.length === 0) return
    const params = new URLSearchParams({ fields: fields.join(",") })
    navigate(`/guild/${region}/${realm}/${encodeURIComponent(name.trim())}?${params}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />

      <main className="flex flex-1 items-center justify-center px-4 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <div className="mb-8 flex flex-col items-center gap-3 text-center">
            <SiLionair className="text-4xl text-primary" />
            <h1 className="text-2xl font-bold text-text-primary">Look up a guild</h1>
            <p className="text-sm text-text-muted">
              Enter a guild name, realm, and region to view their profile.
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
              <label className="text-xs uppercase tracking-widest text-text-muted">Guild Name</label>
              <input
                type="text"
                placeholder="e.g. Mythic Guild"
                value={name}
                onChange={e => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs uppercase tracking-widest text-text-muted">Fields</label>
              <div className="flex flex-col gap-2 rounded-lg border border-border bg-surface px-4 py-3">
                {ALL_FIELDS.map(f => (
                  <label key={f.id} className="flex cursor-pointer items-center gap-3 text-sm text-text-primary">
                    <input
                      type="checkbox"
                      checked={fields.includes(f.id)}
                      onChange={() => toggleField(f.id)}
                      className="h-4 w-4 accent-primary"
                    />
                    {f.label}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={!realm || !name.trim() || fields.length === 0}
              className="mt-2 h-11 rounded-lg bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-40"
            >
              Search
            </button>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}

export default GuildSearch
