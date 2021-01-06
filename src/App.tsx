import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import ThemeSwitcher from 'components/ThemeSwitcher'
import { colors, ThemeContext } from 'const/theme'
import { ComponentWithTheme } from 'const/types'
import MainPage from 'MainPage'

const Container = styled.div<ComponentWithTheme>`
  width: 100vw;
  height: 100vh;
  background-color: ${({ isDarkTheme }) => colors(isDarkTheme).background};
  color: ${({ isDarkTheme }) => colors(isDarkTheme).text};
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 44px;
  padding: 12px;
  box-sizing: border-box;
`
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`

const checkIfDeviceDarkTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    window.localStorage.setItem('theme', 'true')
    return 'true'
  }
  window.localStorage.setItem('theme', 'false')
  return 'false'
}

const App: React.FC = () => {
  const storedTheme =
    window.localStorage.getItem('theme') ?? checkIfDeviceDarkTheme()
  const [isDarkTheme, setDarkTheme] = useState(JSON.parse(storedTheme))

  const onThemeChange = (isDarkTheme: boolean) => {
    setDarkTheme(isDarkTheme)
    return window.localStorage.setItem('theme', isDarkTheme ? 'true' : 'false')
  }

  useEffect(() => {
    const listenerFunction = (e: MediaQueryListEvent) => onThemeChange(e.matches)
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', listenerFunction)

    return () =>
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', listenerFunction)
  }, [])

  const themeContext = { isDarkTheme, onThemeChange }
  return (
    <ThemeContext.Provider value={themeContext}>
      <Container isDarkTheme={isDarkTheme}>
        <Header>
          <ThemeSwitcher
            isDarkTheme={isDarkTheme}
            onChange={(e) => onThemeChange(e.target.checked)}
          />
        </Header>
        <Content>
          <MainPage />
        </Content>
      </Container>
    </ThemeContext.Provider>
  )
}

export default App
