export type Affix = {
  id: number
  name: string
  description: string
  wowhead_url: string
  icon: string
  icon_url: string
}

export type AffixRun = {
  dungeon: string
  short_name: string
  mythic_level: number
  keystone_run_id: number
  completed_at: string
  clear_time_ms: number
  par_time_ms: number
  num_keystone_upgrades: number
  icon_url: string
  background_image_url: string
  score: number
  url: string
  affixes: Affix[]
  role: string
}

export type AffixesResponse = {
  region: string
  title: string
  leaderboard_url: string
  recent_run: AffixRun
  affix_details: Affix[]
}
