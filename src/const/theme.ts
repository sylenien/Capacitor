import React from 'react'

const theme = {
  light: {
    background: '#f4eeff',
    backgroundDarker: '#dcd6f7',
    accent: '#a6b1e1',
    text: '#424874',
  },
  dark: {
    background: '#424874',
    text: '#f4eeff',
    backgroundDarker: '#a6b1e1',
    accent: '#dcd6f7',
  },
}

export const colors = (isDarkTheme?: boolean) =>
  isDarkTheme ? theme.dark : theme.light

export const ThemeContext = React.createContext({
  isDarkTheme: false,
  onThemeChange: (arg: any) => {},
})
