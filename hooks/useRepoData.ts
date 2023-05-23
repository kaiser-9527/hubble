import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

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
import { mixRepos } from "@/lib/repo"
import { useToast } from "@/components/ui/use-toast"
import { useSupabase } from "@/components/supabase-provider"

export default function useSupabaseData() {
  const { supabase, user } = useSupabase()
  const { toast } = useToast()
  const [loadingCount, setLoadingCount] = useState(0)
  const [supaRepos, setSupaRepos] = useState<SupaRepoItem[]>([])
  const [relations, setRelations] = useState<RelationItem[]>([])
  const [githubRepos, setGithubRepos] = useState<GithubRepoItem[]>([])

  const [tags, setTags] = useState<TagItem[] | undefined>()
  const [repos, setRepos] = useState<MixedRepo[] | undefined>()
  const [languagsCount, setLanguagsCount] = useState<ListItem[] | undefined>()

  const router = useRouter()

  const getTags = async () => {
    setLoadingCount((c) => c + 1)
    const { data, error } = await supabase.from("tag").select("id,title")
    if (!error) {
      setTags(data)
      db.set(LOCAL_DB.TAGS, data)
    }
    setLoadingCount((c) => c - 1)
  }

  const getRepoTagRelation = async () => {
    setLoadingCount((c) => c + 1)
    const { data, error } = await supabase
      .from("repo_tag")
      .select("id,repo_id,tag_id")
    if (!error) {
      setRelations(data)
      db.set(LOCAL_DB.RELATION, data)
    }
    setLoadingCount((c) => c - 1)
  }

  const getSupabaseRepos = async () => {
    setLoadingCount((c) => c + 1)
    const { data, error } = await supabase
      .from("repo")
      .select("id,comment,github_id")
    if (!error) {
      setSupaRepos(data)
      db.set(LOCAL_DB.SUPA_REPOS, data)
    }
    setLoadingCount((c) => c - 1)
  }

  const getGithubRepos = async () => {
    setLoadingCount((c) => c + 1)

    const res = await fetch("/api/github-starred-repo")
    setLoadingCount((c) => c - 1)

    if (!res.ok) {
      router.push("/login")
      return
    }
    const { data } = await res.json()
    setGithubRepos(data)
    db.set(LOCAL_DB.GH_REPOS, data)
  }

  const upsertRepo = async (data: UpsertRepo) => {
    const res = await fetch("/api/upsert-repo", {
      method: "post",
      body: JSON.stringify(data),
    })
    const _data = await res.json()
    const { repo, newTags, newRelations, removedRelations, faildMessages } =
      _data
    if (faildMessages?.length) {
      // TODO
      toast({
        variant: "destructive",
        description: [
          ...faildMessages,
          "Please synchronize the remote data first",
        ].join("\n"),
      })
    }

    // update repos
    let newRepos
    if (repo.type === "insert") {
      newRepos = [...supaRepos, repo.data]
    } else {
      newRepos = supaRepos.map((r) => {
        if (r.id === repo.data.id) {
          return {
            ...r,
            comment: repo.data.comment,
          }
        }
        return r
      })
    }
    setSupaRepos(newRepos)
    db.set(LOCAL_DB.SUPA_REPOS, newRepos)

    // update tags
    if (newTags?.length) {
      const _newTags = [...(tags ?? []), ...newTags]
      setTags(_newTags)
      db.set(LOCAL_DB.TAGS, _newTags)
    }

    // update relations
    let _newRelations = relations
    if (removedRelations?.length) {
      _newRelations = relations?.filter((r) => {
        return !removedRelations.includes(r.id)
      })
    }
    if (newRelations?.length) {
      _newRelations = [..._newRelations, ...newRelations]
    }
    setRelations(_newRelations)
    db.set(LOCAL_DB.RELATION, _newRelations)
  }

  const forceSyncAllData = () => {
    getGithubRepos()
    getSupabaseRepos()
    getTags()
    getRepoTagRelation()
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
    relations,
    loadingCount,

    getTags,
    getSupabaseRepos,
    getGithubRepos,
    getRepoTagRelation,
    upsertRepo,
    forceSyncAllData,
  }
}
