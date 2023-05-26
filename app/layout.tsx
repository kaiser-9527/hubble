import { Metadata } from "next"
import { Inter } from "next/font/google"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"

import "@/styles/globals.css"
import { cookies, headers } from "next/headers"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"

import { themeConfig } from "@/lib/config"
import SupabaseProvider from "@/components/supabase-provider"
import ThemeProvider from "@/components/theme-provider"

export const metadata: Metadata = {
  title:
    "Hubble - GitHub Star Management Tool - Efficiently Manage Your Starred Projects",
  description:
    "Efficiently manage your GitHub starred projects with our GitHub Star Management Tool. Organize your starred projects with ease and find what you need quickly.",
  keywords:
    "GitHub, management tool, starred projects, organization, productivity",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const theme = (cookieStore.get(themeConfig.keyInCookie)?.value ??
    themeConfig.default) as string

  const supabase = createServerComponentSupabaseClient({
    headers,
    cookies,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()
  return (
    <html lang="en" className={cn(theme, inter.className)}>
      <body
        className={cn(
          "flex min-h-screen flex-col bg-background font-sans subpixel-antialiased"
        )}
      >
        <ThemeProvider theme={theme}>
          <SupabaseProvider session={session}>{children}</SupabaseProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
