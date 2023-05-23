import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"
import { createRouteHandlerSupabaseClient } from "@supabase/auth-helpers-nextjs"

import { RelationItem, SupaRepoItem, TagItem, UpsertRepo } from "@/types/base"
import type { Database } from "@/types/database"

// do not cache this page
export const revalidate = 0

const resError = (message: string) =>
  new Response(
    JSON.stringify({
      error: {
        message,
      },
    }),
    {
      status: 200,
    }
  )

export async function POST(request: Request) {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })

  const res = (await request.json()) as UpsertRepo

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error || !user) {
    return NextResponse.json({ error })
  }

  const {
    comment,
    github_id,

    added_tag_ids,
    removed_tag_ids,
    created_tag_titles,
  } = res

  // response data
  let repo: {
    type: string
    data: SupaRepoItem
  }

  const faildMessages: string[] = []

  if (!github_id) {
    return resError("github_id is required")
  }

  const repoSelectCols = "id,comment,github_id"

  // update repo
  const upsertRepoRes = await supabase
    .from("repo")
    .update({
      comment,
    })
    .match({
      github_id,
      user_id: user.id,
    })
    .select(repoSelectCols)
    .single()

  if (!upsertRepoRes.error) {
    repo = {
      type: "update",
      data: upsertRepoRes.data,
    }
  } else {
    // insert
    const insertRepoRes = await supabase
      .from("repo")
      .insert({
        user_id: user.id,
        github_id,
        comment,
      })
      .select(repoSelectCols)
      .single()

    if (insertRepoRes.error) {
      return NextResponse.json({ error: insertRepoRes.error })
    }

    repo = {
      type: "insert",
      data: insertRepoRes.data,
    }
  }

  const removedRelations: number[] = []
  if (removed_tag_ids?.length) {
    // batch delete
    const removedRelationsRes = await Promise.all(
      removed_tag_ids.map((tagId) => {
        return supabase
          .from("repo_tag")
          .delete()
          .match({
            tag_id: tagId,
            user_id: user.id,
            repo_id: repo.data.id,
          })
          .select("id")
          .single()
      })
    )

    removedRelationsRes.forEach((r, idx) => {
      if (r.error) {
        faildMessages.push(`Failed to remove tag: ${removed_tag_ids[idx]}`)
      } else {
        removedRelations.push(r.data?.id)
      }
    })
  }

  let addedTags = added_tag_ids ?? []

  let newTags: TagItem[] = []
  if (created_tag_titles?.length) {
    const createTagRes = await supabase
      .from("tag")
      .insert(
        created_tag_titles.map((title) => ({
          title,
          user_id: user.id,
        }))
      )
      .select("id, title")

    if (createTagRes.error) {
      faildMessages.push("Failed to create tags")
    } else {
      createTagRes.data?.forEach((tag) => {
        addedTags.push(tag.id)
        newTags.push(tag)
      })
    }
  }

  let newRelations: RelationItem[] = []
  if (addedTags) {
    const newRelationsRes = await supabase
      .from("repo_tag")
      .insert(
        addedTags.map((tagId) => ({
          tag_id: tagId,
          repo_id: repo.data.id,
          user_id: user.id,
        }))
      )
      .select("id,repo_id,tag_id")

    if (newRelationsRes.error) {
      faildMessages.push("Failed to add tags")
    } else {
      newRelationsRes.data?.forEach((r) => {
        newRelations.push(r)
      })
    }
  }

  return NextResponse.json({
    repo,
    newTags,
    newRelations,
    removedRelations,
    faildMessages,
  })
}
