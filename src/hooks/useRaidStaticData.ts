import { useState } from "react"
import { fetchRaidStaticData } from "@/services/raiderio"
import type { RaidStaticData } from "@/types/raiderio/raiding"

type UseRaidStaticData = {
  data: RaidStaticData | null
  loading: boolean
  error: string | null
  getStaticData: (expansionId: number) => Promise<void>
}

export const useRaidStaticData = (): UseRaidStaticData => {
  const [data, setData] = useState<RaidStaticData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getStaticData = async (expansionId: number) => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await fetchRaidStaticData(expansionId)
      setData(result)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, getStaticData }
}
