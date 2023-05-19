"use client"

import { GithubIcon } from "lucide-react"

import useSignIn from "@/hooks/useSignIn"

import { Button } from "./ui/button"

export default function SignIn() {
  const handleSignIn = useSignIn()
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col justify-center">
        <h2 className="pb-10 text-4xl font-bold">Log in to Hubble</h2>
        <Button onClick={handleSignIn}>
          <GithubIcon></GithubIcon>
          Continue with github
        </Button>
      </div>
    </div>
  )
}
