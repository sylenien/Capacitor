import { makeAutoObservable } from 'mobx'
import { ScenarioStats, ScenarioStatHash } from 'const/types'

export class Stats {
  stats: ScenarioStats[] = []
  scenarioHighscoreStats: ScenarioStatHash = {}
  statsAmount = 0
  statsReady = false

  constructor() {
    makeAutoObservable(this)
  }

  public setStatsAmount = (amount: number) => {
    return (this.statsAmount = amount)
  }

  public saveData = (stats: ScenarioStats[]) => {
    this.setStats(stats)
    this.mapStats(stats)
    this.setReadyState(true)
  }

  public mapStats = (stats: ScenarioStats[]) => {
    let i = 0
    const scenariosHash = this.scenarioHighscoreStats

    while (i < stats.length) {
      const scenario = stats[i]
      const lowercaseName = scenario.name.toLowerCase()
      const existingData = scenariosHash[lowercaseName]
      if (existingData) {
        const isNewScoreHigher = scenario.score > existingData.score
        if (isNewScoreHigher) {
          scenariosHash[lowercaseName] = scenario
        }
      } else {
        scenariosHash[lowercaseName] = scenario
      }
      i++
    }

    return this.saveHighscoreStats(scenariosHash)
  }

  public setStats = (stats: ScenarioStats[]) => {
    return (this.stats = stats)
  }

  public setReadyState = (state: boolean) => {
    return (this.statsReady = state)
  }

  private saveHighscoreStats = (mappedStats: ScenarioStatHash) => {
    this.scenarioHighscoreStats = mappedStats
  }
}

const StatsStore = new Stats()

export default StatsStore
