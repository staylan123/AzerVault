/* Raider.io API v1 — https://raider.io/api */

import type { CharacterProfile } from "@/types/raiderio/character"
import type { AffixesResponse } from "@/types/raiderio/affixes"

const BASE = "https://raider.io/api/v1"

/* Fields requested on every character profile fetch */
const FIELDS = [
  "gear",
  "raid_progression",
  "mythic_plus_scores_by_season",
  "mythic_plus_ranks",
  "previous_mythic_plus_ranks",
  "mythic_plus_recent_runs",
  "mythic_plus_best_runs",
  "mythic_plus_alternate_runs",
].join(",")

/* Fetches a full character profile from raider.io.
   Throws with the API's error message on non-2xx responses. */
export const fetchAffixes = async (
  region: string,
  locale?: string,
): Promise<AffixesResponse> => {
  const params = new URLSearchParams({ region })
  if (locale) params.set("locale", locale)
  const url = `${BASE}/mythic-plus/affixes?${params}`
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { message?: string }).message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<AffixesResponse>
}

export const fetchCharacterProfile = async (
  region: string,
  realm: string,
  name: string,
): Promise<CharacterProfile> => {
  const url = `${BASE}/characters/profile?region=${region}&realm=${encodeURIComponent(realm)}&name=${encodeURIComponent(name)}&fields=${FIELDS}`
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { message?: string }).message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<CharacterProfile>
}
