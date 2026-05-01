export type MythicPlusDungeon = {
  id: number
  challenge_mode_id: number
  slug: string
  name: string
  short_name: string
  keystone_timer_seconds: number
  icon_url: string
  background_image_url: string
}

export type MythicPlusSeason = {
  slug: string
  name: string
  short_name: string
  is_main_season: boolean
  dungeons: MythicPlusDungeon[]
}

export type MythicPlusStaticData = {
  seasons: MythicPlusSeason[]
  dungeons: MythicPlusDungeon[]
}

export type RunModifier = {
  id: number
  name: string
  description: string
  icon: string
  slug: string
}

export type RosterMember = {
  character: {
    id: number
    name: string
    path: string
    class: { id: number; name: string; slug: string }
    spec: { id: number; name: string; slug: string; role: string }
    realm: { name: string; slug: string }
    region: { name: string; short_name: string; slug: string }
  }
  role: string
}

export type RunDungeon = {
  id: number
  name: string
  short_name: string
  slug: string
  expansion_id: number
  icon_url: string
  keystone_timer_ms: number
  num_bosses: number
}

export type MythicRun = {
  season: string
  dungeon: RunDungeon
  keystone_run_id: number
  mythic_level: number
  clear_time_ms: number
  keystone_time_ms: number
  completed_at: string
  time_remaining_ms: number
  faction: string
  weekly_modifiers: RunModifier[]
  roster: RosterMember[]
}

export type MythicRunRanking = {
  rank: number
  score: number
  run: MythicRun
}

export type MythicPlusRunsResponse = {
  rankings: MythicRunRanking[]
  leaderboard_url: string
  params: {
    season: string
    region: string
    dungeon: string
    page: number
  }
}
