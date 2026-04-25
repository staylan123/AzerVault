import { useState } from "react"
import { fetchGuildProfile } from "@/services/raiderio"
import type { GuildProfile } from "@/types/raiderio/guild"

type UseGuildProfile = {
  profile: GuildProfile | null
  loading: boolean
  error: string | null
  getProfile: (region: string, realm: string, name: string, fields: string[]) => Promise<void>
}

export const useGuildProfile = (): UseGuildProfile => {
  const [profile, setProfile] = useState<GuildProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getProfile = async (region: string, realm: string, name: string, fields: string[]) => {
    setLoading(true)
    setError(null)
    setProfile(null)
    try {
      const data = await fetchGuildProfile(region, realm, name, fields)
      setProfile(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { profile, loading, error, getProfile }
}
