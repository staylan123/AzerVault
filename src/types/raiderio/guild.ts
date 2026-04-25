import type { RaidProgression } from "./character"

export type GuildRankEntry = {
  world: number
  region: number
  realm: number
}

export type GuildRaidDifficultyRanking = {
  world: number
  region: number
  realm: number
}

export type GuildRaidRankingEntry = {
  mythic: GuildRaidDifficultyRanking
  heroic: GuildRaidDifficultyRanking
  normal: GuildRaidDifficultyRanking
}

export type GuildRaidRankings = Record<string, GuildRaidRankingEntry>

export type GuildMemberCharacter = {
  name: string
  race: string
  class: string
  active_spec_name: string
  active_spec_role: string
  faction: string
  achievement_points: number
  thumbnail_url: string
  region: string
  realm: string
  profile_url: string
  gear?: { item_level_equipped: number }
}

export type GuildMember = {
  rank: number
  character: GuildMemberCharacter
}

export type GuildProfile = {
  name: string
  faction: string
  region: string
  realm: string
  profile_url: string
  last_crawled_at: string
  raid_progression?: RaidProgression
  raid_rankings?: GuildRaidRankings
  members?: GuildMember[]
}
