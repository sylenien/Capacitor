export interface ComponentWithTheme {
  isDarkTheme?: boolean
}

export interface ScenarioStats {
  name: string
  score: number
  date: string
}

export interface ScenarioStatHash {
  [key: string]: ScenarioStats
}

export interface Rankings {
  silver: number
  gold: number
  platinum: number
  diamond: number
  master: number
  grandmaster: number
  nova: number
  ascended: number
}
export interface ISparky {
  [key: string]: Rankings
}
