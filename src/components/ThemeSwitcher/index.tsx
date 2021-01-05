import React from 'react'
import styled from 'styled-components'
import { Switch, MoonIcon } from 'evergreen-ui'
import { colors } from 'const/theme'
import { ComponentWithTheme } from 'const/types'

const ThemeSwitcherContainer = styled.div<ComponentWithTheme>`
  color: white !important;
  display: flex;
  align-items: center;

  & > svg {
    fill: ${({ isDarkTheme }) => colors(isDarkTheme).text}!important;
  }
`

interface IThemeSwitcher {
  isDarkTheme: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ThemeSwitcher: React.FC<IThemeSwitcher> = ({ isDarkTheme, onChange }) => (
  <ThemeSwitcherContainer isDarkTheme={isDarkTheme}>
    <Switch checked={isDarkTheme} hasCheckIcon={false} onChange={onChange} />
    <MoonIcon
      color={!isDarkTheme ? undefined : 'selected'}
      size={20}
      marginLeft={6}
    />
  </ThemeSwitcherContainer>
)

export default ThemeSwitcher
