import { useState } from "react"
import { fetchAffixes } from "@/services/raiderio"
import type { AffixesResponse } from "@/types/raiderio/affixes"

type UseAffixes = {
  data: AffixesResponse | null
  loading: boolean
  error: string | null
  getAffixes: (region: string, locale?: string) => Promise<void>
}

export const useAffixes = (): UseAffixes => {
  const [data, setData] = useState<AffixesResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAffixes = async (region: string, locale?: string) => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await fetchAffixes(region, locale)
      setData(result)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, getAffixes }
}
