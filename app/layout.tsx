import { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"

import "@/styles/globals.css"
import { cookies } from "next/dist/client/components/headers"

import { themeConfig } from "@/lib/config"
import SupabaseProvider from "@/components/supabase-provider"
import ThemeProvider from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "hubble",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/fav.ico",
  },
}

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const theme = (cookieStore.get(themeConfig.keyInCookie)?.value ??
    themeConfig.default) as string
  return (
    <html lang="en" className={cn(theme, inter.className)}>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans subpixel-antialiased"
        )}
      >
        <ThemeProvider theme={theme}>
          <SupabaseProvider>{children}</SupabaseProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
