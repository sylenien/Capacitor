import { observable, action } from 'mobx'
import { ScenarioStats, ScenarioStatHash } from 'const/types'

class Stats {
  @observable stats: ScenarioStats[] = []
  @observable scenarioHighscoreStats: ScenarioStatHash = {}
  @observable statsAmount = 0
  @observable statsReady = false

  @action
  public setStatsAmount = (amount: number) => {
    this.statsAmount = amount
  }

  @action
  public setStats = (stats: ScenarioStats[]) => {
    this.stats = stats

    let i = 0
    while (i < stats.length) {
      const scenario = stats[i]
      const lowercaseName = scenario.name.toLowerCase()
      const existingData = this.scenarioHighscoreStats[lowercaseName]
      if (existingData) {
        const isNewScoreHigher = scenario.score > existingData.score
        if (isNewScoreHigher) {
          this.scenarioHighscoreStats[lowercaseName] = scenario
        }
      } else {
        this.scenarioHighscoreStats[lowercaseName] = scenario
      }
      i++
    }

    this.statsReady = true

    console.log(this.stats, this.scenarioHighscoreStats)
  }
}

const StatsStore = new Stats()
export default StatsStore
