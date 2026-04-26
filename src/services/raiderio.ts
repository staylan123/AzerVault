/* Raider.io API v1 — https://raider.io/api */

import type { CharacterProfile } from "@/types/raiderio/character"
import type { AffixesResponse } from "@/types/raiderio/affixes"
import type { GuildProfile } from "@/types/raiderio/guild"
import type { RaidStaticData, HallOfFameResponse } from "@/types/raiderio/raiding"

const BASE = "https://raider.io/api/v1"

/* Fields requested on every character profile fetch */
const FIELDS = [
  "gear",
  "guild",
  "talents:categorized",
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

export const fetchGuildProfile = async (
  region: string,
  realm: string,
  name: string,
  fields: string[],
): Promise<GuildProfile> => {
  const params = new URLSearchParams({
    region,
    realm,
    name,
    fields: fields.join(","),
  })
  const url = `${BASE}/guilds/profile?${params}`
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { message?: string }).message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<GuildProfile>
}

export const fetchRaidStaticData = async (
  expansionId: number,
): Promise<RaidStaticData> => {
  const url = `${BASE}/raiding/static-data?expansion_id=${expansionId}`
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { message?: string }).message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<RaidStaticData>
}

export const fetchHallOfFame = async (
  raid: string,
  difficulty: string,
  region: string,
): Promise<HallOfFameResponse> => {
  const params = new URLSearchParams({ raid, difficulty, region })
  const url = `${BASE}/raiding/hall-of-fame?${params}`
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { message?: string }).message ?? `HTTP ${res.status}`)
  }
  return res.json() as Promise<HallOfFameResponse>
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
