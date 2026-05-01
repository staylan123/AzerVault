import { useState } from "react"
import { fetchMythicPlusStaticData } from "@/services/raiderio"
import type { MythicPlusStaticData } from "@/types/raiderio/mythic-plus"

type UseMythicPlusStaticData = {
  data: MythicPlusStaticData | null
  loading: boolean
  error: string | null
  getStaticData: (expansionId: number) => Promise<void>
}

export const useMythicPlusStaticData = (): UseMythicPlusStaticData => {
  const [data, setData] = useState<MythicPlusStaticData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getStaticData = async (expansionId: number) => {
    setLoading(true)
    setError(null)
    setData(null)
    try {
      const result = await fetchMythicPlusStaticData(expansionId)
      setData(result)
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, getStaticData }
}
