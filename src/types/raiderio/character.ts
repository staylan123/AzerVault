/* Raider.io /api/v1/characters/profile response types */

export type GuildInfo = {
  name: string;
  realm: string;
};

export type TalentSpell = {
  id: number;
  name: string;
  icon: string;
  school: number;
  rank: string | null;
  hasCooldown: boolean;
};

export type TalentEntry = {
  id: number;
  traitDefinitionId: number;
  traitSubTreeId: number;
  type: number;
  maxRanks: number;
  spell: TalentSpell;
};

export type TalentNode = {
  id: number;
  treeId: number;
  subTreeId: number;
  type: number;
  flags: number;
  entries: TalentEntry[];
  important: boolean;
  posX: number;
  posY: number;
  row: number;
  col: number;
};

export type TalentSelection = {
  node: TalentNode;
  entryIndex: number;
  rank: number;
  includeInSummary?: boolean;
};

export type ActiveHeroTree = {
  id: number;
  traitTreeId: number;
  name: string;
  slug: string;
  description: string;
  iconUrl: string;
};

export type TalentLoadout = {
  loadout_spec_id: number;
  loadout_text: string;
  class_talents: TalentSelection[];
  spec_talents: TalentSelection[];
  hero_talents: TalentSelection[];
  active_hero_tree: ActiveHeroTree;
};

/* 0 Poor · 1 Common · 2 Uncommon · 3 Rare · 4 Epic · 5 Legendary */
export type GearItem = {
  item_id: number;
  item_level: number;
  icon: string;
  name: string;
  item_quality: number;
  is_legendary: boolean;
  is_azerite_armor: boolean;
  enchants?: number[];
  enchants_detail?: { name: string }[];
  gems?: number[];
  gems_detail?: { name: string }[];
};

export type GearSlots = {
  head?: GearItem;
  neck?: GearItem;
  shoulder?: GearItem;
  back?: GearItem;
  chest?: GearItem;
  wrist?: GearItem;
  hands?: GearItem;
  waist?: GearItem;
  legs?: GearItem;
  feet?: GearItem;
  finger1?: GearItem;
  finger2?: GearItem;
  trinket1?: GearItem;
  trinket2?: GearItem;
  mainhand?: GearItem;
  offhand?: GearItem;
};

export type CharacterGear = {
  item_level_equipped: number;
  item_level_total: number;
  artifact_traits: number;
  items: GearSlots;
};

/* A single raid tier's kill progress across all difficulties */
export type RaidProgressionEntry = {
  summary: string;
  expansion_id: number;
  total_bosses: number;
  normal_bosses_killed: number;
  heroic_bosses_killed: number;
  mythic_bosses_killed: number;
};

/* Keys are raid slug strings (e.g. "liberation-of-undermine") */
export type RaidProgression = Record<string, RaidProgressionEntry>;

export type MythicPlusScoreSegment = {
  score: number;
  color: string;
};

export type MythicPlusScores = {
  all: number;
  dps: number;
  healer: number;
  tank: number;
  spec_0: number;
  spec_1: number;
  spec_2: number;
  spec_3: number;
};

export type MythicPlusSegments = {
  all: MythicPlusScoreSegment;
  dps: MythicPlusScoreSegment;
  healer: MythicPlusScoreSegment;
  tank: MythicPlusScoreSegment;
  spec_0: MythicPlusScoreSegment;
  spec_1: MythicPlusScoreSegment;
  spec_2: MythicPlusScoreSegment;
  spec_3: MythicPlusScoreSegment;
};

/* Score + color breakdown per role/spec for a given season */
export type MythicPlusSeasonScore = {
  season: string;
  scores: MythicPlusScores;
  segments: MythicPlusSegments;
};

export type RankEntry = {
  world: number;
  region: number;
  realm: number;
};

/* Reused for both current and previous season ranks */
export type MythicPlusRanks = {
  overall: RankEntry;
  tank: RankEntry;
  healer: RankEntry;
  dps: RankEntry;
  class: RankEntry;
  class_tank: RankEntry;
  class_healer: RankEntry;
  class_dps: RankEntry;
};

export type Affix = {
  id: number;
  name: string;
  description: string;
  icon: string;
  icon_url: string;
  wowhead_url: string;
};

export type Spec = {
  id: number;
  name: string;
  slug: string;
  role: string;
  class_id: number;
  is_melee: boolean;
  ordinal: number;
  patch: string;
};

/* Shared shape for recent_runs, best_runs, and alternate_runs */
export type MythicPlusRun = {
  dungeon: string;
  short_name: string;
  mythic_level: number;
  keystone_run_id: number;
  completed_at: string;
  clear_time_ms: number;
  par_time_ms: number;
  num_keystone_upgrades: number;
  map_challenge_mode_id: number;
  zone_id: number;
  zone_expansion_id: number;
  icon_url: string;
  background_image_url: string;
  score: number;
  url: string;
  affixes: Affix[];
  spec: Spec;
  role: string;
};

/* Top-level character profile response */
export type CharacterProfile = {
  name: string;
  race: string;
  class: string;
  active_spec_name: string;
  active_spec_role: string;
  gender: string;
  faction: string;
  achievement_points: number;
  thumbnail_url: string;
  region: string;
  realm: string;
  last_crawled_at: string;
  profile_url: string;
  profile_banner: string;
  use_animated_banner: boolean;
  guild?: GuildInfo;
  talentLoadout?: TalentLoadout;
  gear: CharacterGear;
  raid_progression: RaidProgression;
  mythic_plus_scores_by_season: MythicPlusSeasonScore[];
  mythic_plus_ranks: MythicPlusRanks;
  previous_mythic_plus_ranks: MythicPlusRanks;
  mythic_plus_recent_runs: MythicPlusRun[];
  mythic_plus_best_runs: MythicPlusRun[];
  mythic_plus_alternate_runs: MythicPlusRun[];
};
