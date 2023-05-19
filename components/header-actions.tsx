"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { User } from "@supabase/auth-helpers-nextjs"
import { Github, MoonStarIcon, SunIcon } from "lucide-react"

import useSignIn from "@/hooks/useSignIn"

import { useSupabase } from "./supabase-provider"
import { useTheme } from "./theme-provider"
import { Button } from "./ui/button"
import { IconButton } from "./ui/icon-button"

function GithubIcon() {
  return (
    <IconButton asChild size="sm" variant="ghost">
      <Link href="https://github.com/kaiser-9527/hubble" target="_blank">
        <Github size={18} />
      </Link>
    </IconButton>
  )
}
function ThemeButton() {
  const { theme, toggleTheme } = useTheme()

  return (
    <IconButton size="sm" variant="ghost" onClick={toggleTheme}>
      {theme === "dark" ? <MoonStarIcon size={18} /> : <SunIcon size={18} />}
    </IconButton>
  )
}

function UserAvatar() {
  const { user } = useSupabase()
  const handleSignIn = useSignIn()

  if (!user) {
    return (
      <Button size="sm" variant="secondary" onClick={handleSignIn}>
        Sign in
      </Button>
    )
  }

  return (
    <Link href="/app">
      <Image
        className="h-7 w-7 rounded-full"
        src={user.user_metadata.avatar_url}
        width={28}
        height={28}
        alt={user?.email ?? user.user_metadata.name}
      />
    </Link>
  )
}

export default function HeaderActions() {
  return (
    <div className="flex items-center gap-2">
      <GithubIcon />
      <ThemeButton />
      <UserAvatar />
    </div>
  )
}
