"use client"

import { useEffect } from "react"
import { GithubIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useSupabase } from "@/components/supabase-provider"

export default function Login() {
  const { supabase } = useSupabase()

  const login = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
    })
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col justify-center">
        <h2 className="pb-10 text-4xl font-bold">Log in to Hubble</h2>
        <Button onClick={login}>
          <GithubIcon></GithubIcon>
          Continue with github
        </Button>
      </div>
    </div>
  )
}
