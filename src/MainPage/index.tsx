import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import { colors, ThemeContext } from 'const/theme'
import { ComponentWithTheme } from 'const/types'
import { SparkyBenchmarks } from 'const/benchmarks'
import FileUpload from 'MainPage/FileUpload'
import StatsStore from 'Stores/StatsStore'
import BenchmarkStats from 'MainPage/BenchmarkStats'

interface ThemedContainer extends ComponentWithTheme {
  statsUploaded?: boolean
}
const MainPageContainer = styled.div<ThemedContainer>`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ statsUploaded }) => statsUploaded && 'align-self: flex-start;'}

  & > .customInput > button {
    background-color: ${({ isDarkTheme }) => colors(isDarkTheme).backgroundAccent};
    background-image: none;
    color: ${({ isDarkTheme }) => colors(isDarkTheme).text}!important;
  }
  & > .customInput > button:hover {
    background-color: ${({ isDarkTheme }) => colors(isDarkTheme).accent};
    background-image: none !important;
    color: ${({ isDarkTheme }) => colors(isDarkTheme).text}!important;
  }
`

const MainPage: React.FC = observer(() => {
  const { isDarkTheme } = useContext(ThemeContext)

  return (
    <MainPageContainer
      isDarkTheme={isDarkTheme}
      statsUploaded={StatsStore.statsReady}
    >
      <FileUpload />
      {StatsStore.stats.map((stat) => (
        <div>{stat.name}</div>
      ))}
      <BenchmarkStats
        benchmarks={SparkyBenchmarks}
        title="Sparky"
        highScores={StatsStore.scenarioHighscoreStats}
      />
    </MainPageContainer>
  )
})

MainPage.displayName = 'MainPage'

export default MainPage
