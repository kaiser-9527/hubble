"use client"

import React, { ReactNode, createContext, useContext, useState } from "react"
import { setCookie } from "cookies-next"

import { themeConfig } from "@/lib/config"

interface ThemeContextProps {
  theme: string
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps>({
  theme: themeConfig.default,
  toggleTheme: () => {},
})

export default function ThemeProvider({
  theme: defaultTheme,
  children,
}: {
  theme?: string
  children: ReactNode
}) {
  const [theme, setTheme] = useState<string>(
    defaultTheme ?? themeConfig.default
  )

  const toggleTheme = () => {
    const _theme = theme === "light" ? "dark" : "light"
    setTheme(_theme)

    setCookie(themeConfig.keyInCookie, _theme, {
      maxAge: 60 * 60 * 24 * 10000,
    })

    const html = document.querySelector("html")
    html?.classList.remove("dark", "light")
    html?.classList.add(_theme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }

  return context
}
