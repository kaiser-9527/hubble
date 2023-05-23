import { ReactNode } from "react"
import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database"

export default async function AppLayout({ children }: { children: ReactNode }) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data } = await supabase.auth.getSession()

  if (!data.session) {
    redirect("/login")
  }

  return <>{children}</>
}
