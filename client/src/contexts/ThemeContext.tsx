import { createContext, useEffect, type ReactNode } from 'react'

interface ThemeContextType {
  dark: boolean
}

export const ThemeContext = createContext<ThemeContextType>({
  dark: false,
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.remove('dark')
  }, [])

  return (
    <ThemeContext.Provider value={{ dark: false }}>
      {children}
    </ThemeContext.Provider>
  )
}
