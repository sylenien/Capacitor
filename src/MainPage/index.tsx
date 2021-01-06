import React, { useContext } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react-lite'

import { colors, ThemeContext } from 'const/theme'
import { ComponentWithTheme } from 'const/types'
import StatsStore from 'Stores/StatsStore'
import FileUpload from 'MainPage/FileUpload'

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

const MainPage: React.FC = observer(() => {
  const { isDarkTheme } = useContext(ThemeContext)

  return (
    <MainPageContainer isDarkTheme={isDarkTheme}>
      {StatsStore.statsReady ? <>Ready</> : <FileUpload />}
    </MainPageContainer>
  )
})

export default MainPage
