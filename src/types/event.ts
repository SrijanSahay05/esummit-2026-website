export interface HUDStat {
  label: string
  value: string
  /** 'gold' | 'cyan' | 'red' — maps to specific hex values in EventHUD */
  colorVariant?: 'gold' | 'cyan' | 'red'
}

export interface MazeGhost {
  name: string
  color: string
}

export interface TimelinePhase {
  step: number | '★' | '▶'
  label: string
  date: string
  active?: boolean
}

export interface ScoreCriteria {
  label: string
  weight: number
  color: string
}

export interface EventStat {
  value: string
  label: string
  color?: 'gold' | 'green' | 'cyan' | 'red'
  icon?: string
}

export interface Event {
  slug: string
  level: string
  title: string
  titleLines: string[]       // e.g. ['DROP-', 'SHIPPING']
  titleSub: string           // e.g. 'CHALLENGE'
  taglineLines: string[]     // e.g. ['SELL SMART.  MARKET HARD.', 'OUTRUN THE COMPETITION.']
  accentColor: string
  marqueeText?: string
  hudStats: [HUDStat, HUDStat, HUDStat, HUDStat]
  mazeGhosts: MazeGhost[]
  stats: [EventStat, EventStat, EventStat, EventStat]
  timeline: TimelinePhase[]
  scoringCriteria: ScoreCriteria[]
  itemList?: { heading: string; items: string[] }
  registerUrl: string
  registerDeadline: string
  registerPlatformUrl?: string
  registerPlatformHint?: string
  description: string
  category: 'competition' | 'workshop' | 'networking' | 'experience'
  // Legacy — used by events listing card
  tagline: string
}
