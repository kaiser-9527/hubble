import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"
import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database"

import getStarredList from "./getStarredList"

export async function GET() {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })

  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession()

  if (sessionError || !session?.provider_token) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  const { data, error } = await getStarredList(session!.provider_token!)
  if (error) {
    return NextResponse.json({
      error,
    })
  }

  return NextResponse.json({
    data,
  })
}
