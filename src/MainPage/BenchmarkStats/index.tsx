import React from 'react'
import styled from 'styled-components'
import { toJS } from 'mobx'

import { ISparky, ScenarioStatHash, ScenarioStats, Rankings } from 'const/types'

const BenchmarkCard = styled.div`
  border-radius: 6px;
  box-shadow: 0 1px 3px 0 #d4d4d5, 0 0 0 1px #d4d4d5;
  padding: 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

interface IProps {
  title: string
  benchmarks: ISparky
  highScores: ScenarioStatHash
}

const determinateRank = (scenarioData: ScenarioStats, rankings: Rankings) => {
  const rankNames = Object.keys(rankings) as Array<keyof Rankings>
  const { score } = scenarioData
  let rank = 'bronze'
  rankNames.forEach((rankName) => {
    if (score >= rankings[rankName]) rank = rankName
  })

  return rank
}

const matchScores = (benchmarks: ISparky, highScores: ScenarioStatHash) => {
  const scenarios = Object.keys(benchmarks)
  const scoresInBenchmarks = scenarios.map((scenario) => ({
    name: scenario,
    score: highScores[scenario].score,
    date: highScores[scenario].date,
  }))
  const ranksInBenchmarks = scoresInBenchmarks.map((scenario) => {
    const rank = determinateRank(scenario, benchmarks[scenario.name])
    return { name: scenario.name, rank }
  })

  console.log(scoresInBenchmarks, ranksInBenchmarks)
  return { scoresInBenchmarks, ranksInBenchmarks }
}

const BenchmarkStats: React.FC<IProps> = ({ title, benchmarks, highScores }) => {
  console.log(toJS(highScores))
  if (Object.keys(toJS(highScores)).length) {
    const currentRank = matchScores(benchmarks, highScores)
    return <BenchmarkCard>{title}</BenchmarkCard>
  }
  return null
}

export default BenchmarkStats
