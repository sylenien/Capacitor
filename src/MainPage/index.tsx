import React, { useContext } from 'react'
import styled from 'styled-components'
import { FilePicker } from 'evergreen-ui'
import { colors, ThemeContext } from 'const/theme'
import { ComponentWithTheme } from 'const/types'

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

const MainPage: React.FC = () => {
  const { isDarkTheme } = useContext(ThemeContext)
  return (
    <MainPageContainer>
      <Greeting>Upload your statistics to begin</Greeting>
      <FilePicker
        multiple
        width={350}
        placeholder="Select all scenario files"
        onChange={(files) => console.log(files)}
      />
      <Tip isDarkTheme={isDarkTheme}>
        {
          '<Your steam folder>\\steamapps\\common\\FPSAimTrainer\\FPSAimTrainer\\stats'
        }
      </Tip>
    </MainPageContainer>
  )
}

export default MainPage
