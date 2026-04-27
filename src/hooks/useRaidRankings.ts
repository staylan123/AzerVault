import { useState } from "react"
import { fetchRaidRankings } from "@/services/raiderio"
import type { RaidRankingsResponse } from "@/types/raiderio/raiding"

type UseRaidRankings = {
  data: RaidRankingsResponse | null
  loading: boolean
  error: string | null
  getRaidRankings: (raid: string, difficulty: string, region: string) => Promise<void>
}

export const useRaidRankings = (): UseRaidRankings => {
  const [data, setData] = useState<RaidRankingsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getRaidRankings = async (raid: string, difficulty: string, region: string) => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await fetchRaidRankings(raid, difficulty, region)
      setData(result)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, getRaidRankings }
}
