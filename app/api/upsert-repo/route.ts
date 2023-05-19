import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"
import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs"

import type { Database } from "@/types/database"

import { Json } from "../../../types/database"

// do not cache this page
export const revalidate = 0

export async function POST(request: Request) {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })

  const res = await request.json()

  const { data, error } = await supabase.auth.getUser()
  if (error) {
    return NextResponse.json({ error })
  }

  const response = await supabase.rpc("upsert_repo", {
    req: {
      ...res,
      user_id: data.user.id,
    },
  })

  console.log("REQ===>", {
    ...res,
    user_id: data.user.id,
  })

  return NextResponse.json(response)
}
