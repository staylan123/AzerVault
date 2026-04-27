import { useState } from "react"
import { fetchBossRankings } from "@/services/raiderio"
import type { BossRankingsResponse } from "@/types/raiderio/raiding"

type UseBossRankings = {
  data: BossRankingsResponse | null
  loading: boolean
  error: string | null
  getBossRankings: (raid: string, boss: string, difficulty: string, region: string) => Promise<void>
}

export const useBossRankings = (): UseBossRankings => {
  const [data, setData] = useState<BossRankingsResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getBossRankings = async (raid: string, boss: string, difficulty: string, region: string) => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await fetchBossRankings(raid, boss, difficulty, region)
      setData(result)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, getBossRankings }
}
