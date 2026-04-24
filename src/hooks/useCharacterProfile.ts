import { useState } from "react"
import { fetchCharacterProfile } from "@/services/raiderio"
import type { CharacterProfile } from "@/types/raiderio/character"

type UseCharacterProfile = {
  profile: CharacterProfile | null
  loading: boolean
  error: string | null
  getProfile: (region: string, realm: string, name: string) => Promise<void>
}

export const useCharacterProfile = (): UseCharacterProfile => {
  const [profile, setProfile] = useState<CharacterProfile | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getProfile = async (region: string, realm: string, name: string) => {
    setLoading(true)
    setError(null)
    setProfile(null)
    try {
      const data = await fetchCharacterProfile(region, realm, name)
      setProfile(data)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { profile, loading, error, getProfile }
}
