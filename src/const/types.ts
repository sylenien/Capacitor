export interface ComponentWithTheme {
  isDarkTheme?: boolean
}

export interface ScenarioStats {
  name: string
  score: string
  date: string
}

export interface ScenarioStatHash {
  [key: string]: ScenarioStats
}
