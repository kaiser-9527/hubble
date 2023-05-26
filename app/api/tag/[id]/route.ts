import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"
import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database"

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })

  const id = params.id

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    return NextResponse.json({ error })
  }

  const relationsRes = await supabase
    .from("repo_tag")
    .delete()
    .match({
      user_id: user.id,
      tag_id: id,
    })
    .select("id")

  if (relationsRes.error) {
    return NextResponse.json({ error: relationsRes.error })
  }

  const tagRes = await supabase.from("tag").delete().eq("id", id)
  if (tagRes.error) {
    return NextResponse.json({ error: tagRes.error })
  }

  return NextResponse.json({ data: { removed_relations: relationsRes.data } })
}
