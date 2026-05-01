import { useState } from "react"
import { fetchMythicPlusRuns } from "@/services/raiderio"
import type { MythicPlusRunsResponse } from "@/types/raiderio/mythic-plus"

type UseMythicPlusRuns = {
  data: MythicPlusRunsResponse | null
  loading: boolean
  error: string | null
  getRuns: (season: string, region: string, dungeon: string, page: number) => Promise<void>
}

export const useMythicPlusRuns = (): UseMythicPlusRuns => {
  const [data, setData] = useState<MythicPlusRunsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getRuns = async (season: string, region: string, dungeon: string, page: number) => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await fetchMythicPlusRuns(season, region, dungeon, page)
      setData(result)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, getRuns }
}
