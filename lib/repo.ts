import {
  GithubRepoItem,
  MixedRepo,
  RelationItem,
  SupaRepoItem,
  TagItem,
} from "@/types/base"

const findSupaRepo = (list: SupaRepoItem[] = [], gid: number) => {
  return list.find((repo) => repo.github_id === gid)
}

const findRelations = (list?: RelationItem[], repoId?: number) => {
  if (!repoId || !list?.length) return
  return list.filter((relation) => relation.repo_id === repoId)
}

const findSupaTags = (list?: TagItem[], relations?: RelationItem[]) => {
  if (!list?.length || !relations?.length) return

  const relationMap: Record<number, any> = relations.reduce(
    (pre, item) => ({
      ...pre,
      [item.tag_id]: 1,
    }),
    {}
  )

  return list.filter((tag) => relationMap[tag.id])
}

export const mixRepos = ({
  githubRepos,
  supaRepos,
  tags,
  relations,
}: {
  githubRepos: GithubRepoItem[]
  supaRepos?: SupaRepoItem[]
  tags?: TagItem[]
  relations?: RelationItem[]
}) => {
  const langCountMap: Record<string, number> = {}
  const repos = githubRepos.map((ghRepo) => {
    const supaRepo = findSupaRepo(supaRepos, ghRepo.github_id)
    const repoTagRelations = findRelations(relations, supaRepo?.id)
    const supaTags = findSupaTags(tags, repoTagRelations)

    // language count
    const lang = ghRepo.language ?? "unknown"
    if (!langCountMap[lang]) {
      langCountMap[lang] = 1
    } else {
      langCountMap[lang]++
    }

    return {
      ...ghRepo,
      supa_id: supaRepo?.id,
      comment: supaRepo?.comment,
      tags: supaTags,
    }
  })

  const languagsCount = Object.entries(langCountMap).map((item) => ({
    label: item[0],
    extral: item[1],
  }))

  return {
    repos,
    languagsCount,
  }
}
