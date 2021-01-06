import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { FilePicker } from 'evergreen-ui'
import { observer } from 'mobx-react-lite'

import { colors, ThemeContext } from 'const/theme'
import { ComponentWithTheme } from 'const/types'
import StatsStore from 'Stores/StatsStore'
import { createFilePromiseCollection } from './utils'

const Greeting = styled.div`
  font-size: 16px;
  margin-bottom: 6px;
`
const Tip = styled.div<ComponentWithTheme>`
  font-size: 12px;
  margin-top: 3px;
  color: ${({ isDarkTheme }) => colors(isDarkTheme).accent};
`

const hint =
  '<Your steam folder>\\steamapps\\common\\FPSAimTrainer\\FPSAimTrainer\\stats'

const FileUpload: React.FC = observer(() => {
  const { isDarkTheme } = useContext(ThemeContext)
  const [filesProcessed, setProcessedValue] = useState(0)
  const { statsAmount } = StatsStore

  const readCsv = (files: FileList) => {
    const scenarioCount = files.length
    StatsStore.setStatsAmount(scenarioCount)
    setProcessedValue(0)

    const promises = createFilePromiseCollection(files, setProcessedValue)

    Promise.all(promises).then((scenarioStats) => {
      StatsStore.saveData(scenarioStats)
    })
  }

  return (
    <>
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

      {StatsStore.stats.map((stat) => (
        <>{stat.name}</>
      ))}
    </>
  )
})

export default FileUpload
