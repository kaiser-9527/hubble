import { useEffect, useState } from "react"

import {
  GithubRepoItem,
  ListItem,
  MixedRepo,
  RelationItem,
  SupaRepoItem,
  TagItem,
  UpsertRepo,
} from "@/types/base"
import { LOCAL_DB } from "@/lib/config"
import { db } from "@/lib/db"
import { getStarredList } from "@/lib/github"
import { mixRepos } from "@/lib/repo"
import { useSupabase } from "@/components/supabase-provider"

import useSignIn from "./useSignIn"

export default function useSupabaseData() {
  const { supabase, user } = useSupabase()
  const signIn = useSignIn()

  const [supaRepos, setSupaRepos] = useState<SupaRepoItem[]>([])
  const [relations, setRelations] = useState<RelationItem[]>([])
  const [githubRepos, setGithubRepos] = useState<GithubRepoItem[]>([])

  const [tags, setTags] = useState<TagItem[] | undefined>()
  const [repos, setRepos] = useState<MixedRepo[] | undefined>()
  const [languagsCount, setLanguagsCount] = useState<ListItem[] | undefined>()

  const getTags = async () => {
    const { data, error } = await supabase
      .from("tag")
      .select("id,title,repos_count")
    if (!error) {
      setTags(data)
      db.set(LOCAL_DB.TAGS, data)
    }
  }

  const getRepoTagRelation = async () => {
    const { data, error } = await supabase
      .from("repo_tag")
      .select("id,repo_id,tag_id")
    if (!error) {
      setRelations(data)
      db.set(LOCAL_DB.RELATION, data)
    }
  }

  const getSupabaseRepos = async () => {
    const { data, error } = await supabase
      .from("repo")
      .select("id,comment,github_id")
    if (!error) {
      setSupaRepos(data)
      db.set(LOCAL_DB.SUPA_REPOS, data)
    }
  }

  const getGithubRepos = async () => {
    const { data } = await supabase.auth.getSession()
    const { data: _repos, error } = await getStarredList(
      data.session?.provider_token ?? ""
    )
    if (error) {
      if (error.status === 401) {
        console.log("?? 401")

        signIn()
      } else {
        db.set(LOCAL_DB.GH_REPOS, "")
      }
    } else {
      setGithubRepos(_repos!)
      db.set(LOCAL_DB.GH_REPOS, _repos)
    }
  }

  const upsertRepo = async (data: UpsertRepo) => {
    const res = await fetch("/api/upsert-repo", {
      method: "post",
      body: JSON.stringify(data),
    })
    console.log("====>", res)
  }

  const initLocalData = async () => {
    const _ghRepos = await db.get(LOCAL_DB.GH_REPOS)
    const _tags = await db.get(LOCAL_DB.TAGS)
    const _spRepos = await db.get(LOCAL_DB.SUPA_REPOS)
    const _relation = await db.get(LOCAL_DB.RELATION)

    if (!_ghRepos) {
      getGithubRepos()
    } else {
      setGithubRepos(_ghRepos)
    }

    if (!_spRepos) {
      getSupabaseRepos()
    } else {
      setSupaRepos(_spRepos)
    }

    if (!_tags) {
      getTags()
    } else {
      setTags(_tags)
    }

    if (!_relation) {
      getRepoTagRelation()
    } else {
      setRelations(_relation)
    }
  }

  useEffect(() => {
    const result = mixRepos({
      githubRepos,
      supaRepos,
      tags,
      relations,
    })
    setRepos(result.repos)
    setLanguagsCount(result.languagsCount)
  }, [githubRepos, tags, supaRepos, relations])

  // init local data
  useEffect(() => {
    if (user) {
      db.setUid(user.id)
      initLocalData()
    }
  }, [user])

  return {
    tags,
    languagsCount,
    repos,

    getTags,
    getSupabaseRepos,
    getGithubRepos,
    getRepoTagRelation,
    upsertRepo,
  }
}
