import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { FilePicker } from 'evergreen-ui'
import { observer } from 'mobx-react-lite'

import { colors, ThemeContext } from 'const/theme'
import { ComponentWithTheme } from 'const/types'
import StatsStore from 'Stores/StatsStore'

const MainPageContainer = styled.div<ComponentWithTheme>`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > .customInput > button {
    background-color: ${({ isDarkTheme }) => colors(isDarkTheme).backgroundAccent};
    background-image: none;
    color: ${({ isDarkTheme }) => colors(isDarkTheme).text}!important;
  }
`
const Greeting = styled.div`
  font-size: 16px;
  margin-bottom: 6px;
`
const Tip = styled.div<ComponentWithTheme>`
  font-size: 12px;
  margin-top: 3px;
  color: ${({ isDarkTheme }) => colors(isDarkTheme).accent};
`

interface ScenarioStats {
  name?: string
  score?: string
}

const hint =
  '<Your steam folder>\\steamapps\\common\\FPSAimTrainer\\FPSAimTrainer\\stats'

const MainPage: React.FC = observer(() => {
  const { isDarkTheme } = useContext(ThemeContext)
  const [filesProcessed, setProcessedValue] = useState(0)

  const readCsv = (files: FileList) => {
    console.log(files)

    const scenarioCount = files.length
    StatsStore.statsAmount = scenarioCount
    setProcessedValue(0)

    const promises: Promise<ScenarioStats>[] = []

    Array.from(files).forEach((file, index) => {
      const filePromise = new Promise<ScenarioStats>((resolve) => {
        const reader = new FileReader()
        reader.readAsText((file as unknown) as Blob)
        reader.onload = () => {
          if (reader.result !== null) {
            const resultData = reader.result as string
            const scenarioStats = {
              name: file.name.match(/(.*).-.Challenge/i)![1],
              score: resultData.match(/Score:,(\d*)/i)![1],
              date: file.name.match(/Challenge.-.(.*).Stats/i)![1],
            }
            resolve(scenarioStats)
            setProcessedValue(index + 1)
          }
          resolve({ name: 'null', score: 'null' })
        }
      })

      promises.push(filePromise)
    })

    Promise.all(promises).then((scenarioStats) => {
      console.log(scenarioStats)
    })
  }

  const { statsAmount } = StatsStore

  return (
    <MainPageContainer isDarkTheme={isDarkTheme}>
      <Greeting>Upload your statistics to begin</Greeting>
      <FilePicker
        multiple
        width={250}
        placeholder="0 files selected"
        onChange={readCsv}
        className="customInput"
      />
      <Tip isDarkTheme={isDarkTheme}>
        {statsAmount === 0 ? hint : `${filesProcessed}/${statsAmount}`}
      </Tip>
    </MainPageContainer>
  )
})

export default MainPage
