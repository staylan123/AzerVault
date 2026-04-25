import { useState } from "react"
import { fetchHallOfFame } from "@/services/raiderio"
import type { HallOfFameResponse } from "@/types/raiderio/raiding"

type UseHallOfFame = {
  data: HallOfFameResponse | null
  loading: boolean
  error: string | null
  getHallOfFame: (raid: string, difficulty: string, region: string) => Promise<void>
}

export const useHallOfFame = (): UseHallOfFame => {
  const [data, setData] = useState<HallOfFameResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getHallOfFame = async (raid: string, difficulty: string, region: string) => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await fetchHallOfFame(raid, difficulty, region)
      setData(result)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, getHallOfFame }
}
