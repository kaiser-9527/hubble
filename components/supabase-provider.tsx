"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Session,
  User,
  createBrowserSupabaseClient,
  type SupabaseClient,
} from "@supabase/auth-helpers-nextjs"

import type { Database } from "@/types/database"

type MaybeSession = Session | null

type SupabaseContext = {
  supabase: SupabaseClient<Database>
  session: MaybeSession
  user?: User
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode
  session: MaybeSession
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  const router = useRouter()
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [router, supabase])

  return (
    <Context.Provider value={{ supabase, session, user: session?.user }}>
      <>{children}</>
    </Context.Provider>
  )
}

export const useSupabase = () => {
  const context = useContext(Context)

  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }

  return context
}
