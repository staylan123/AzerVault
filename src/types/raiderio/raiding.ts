export type RaidEncounter = {
  id: number
  slug: string
  name: string
}

export type RaidStaticEntry = {
  id: number
  slug: string
  name: string
  short_name: string
  starts: Record<string, string>
  ends: Record<string, string>
  encounters: RaidEncounter[]
}

export type RaidStaticData = {
  raids: RaidStaticEntry[]
}

export type HofRealm = {
  id: number
  name: string
  slug: string
  altName: string | null
  altSlug: string | null
  locale: string
  isConnected: boolean
  connectedRealmId: number
  realmType: string
  wowRealmId: number
  wowConnectedRealmId: number
}

export type HofRegion = {
  name: string
  short_name: string
  slug: string
}

export type HofGuild = {
  id: number
  name: string
  faction: string
  realm: HofRealm
  region: HofRegion
  path: string
  logo: string
  color: string
  isDefaultLogo: boolean
  displayName: string
}

export type EncounterDefeated = {
  slug: string
  firstDefeated: string
  lastDefeated: string
}

export type WinningGuild = {
  guild: HofGuild
  rank: number
  encountersDefeated: EncounterDefeated[]
}

export type BossSummary = {
  encounterId: number
  name: string
  slug: string
  ordinal: number
  wingId: number
  iconUrl: string
}

export type BossKillEntry = {
  guild: HofGuild
  defeatedAt: string
  doesVideoExist: boolean
}

export type BossKill = {
  boss: string
  bossSummary: BossSummary
  bossKillVideo: Array<{ type: string; id: string }> | null
  defeatedBy: { totalCount: number; guilds: BossKillEntry[] }
  attemptedBy: { totalCount: number; attempts: BossKillEntry[] }
}

export type HallOfFameResponse = {
  hallOfFame: {
    winningGuilds: WinningGuild[]
    bossKills: BossKill[]
  }
}

export type BossRankingRecruitment = {
  activity_type: string
  entity_type: string
  recruitment_profile_id: number
}

export type BossRankingEntry = {
  guild: HofGuild
  rank: number
  regionRank: number
  encountersDefeated: EncounterDefeated[]
  doesVideoExist: boolean
  itemLevelAvg: number
  recruitmentProfiles: BossRankingRecruitment[]
}

export type BossRankingsResponse = {
  bossRankings: BossRankingEntry[]
}

export type EncounterPulled = {
  id: number
  slug: string
  isDefeated: boolean
  numPulls: number
  pullStartedAt: string
  bestPercent: number
}

export type GuildPrivacy = {
  raidPulls: boolean
  raidPercents: boolean
  raidComps: boolean
  wereRaidPullsRestricted: boolean
  wereRaidPercentsRestricted: boolean
  wereRaidCompsRestricted: boolean
  shareRaidUntil: string
}

export type RaidRankingEntry = {
  guild: HofGuild
  rank: number
  regionRank: number
  encountersPulled: EncounterPulled[]
  encountersDefeated: EncounterDefeated[]
  guildPrivacy: GuildPrivacy
}

export type RaidRankingsResponse = {
  raidRankings: RaidRankingEntry[]
}
