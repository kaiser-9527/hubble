import { GithubRepoItem } from "@/types/base"

interface ResData {
  repo: {
    description: string
    forks_count: number
    homepage: string
    id: number
    language: string
    name: string
    html_url: string
    stargazers_count: number
    watchers_count: number
  }
  starred_at: string
}

export default async function getStarredList(
  token: string,
  page = 1,
  result: GithubRepoItem[] = []
): Promise<{
  data?: GithubRepoItem[]
  error?: any
}> {
  try {
    const res = await fetch(
      `https://api.github.com/user/starred?page=${page}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.star+json",
        },
      }
    )
    if (!res.ok) {
      throw res
    }
    const data = (await res.json()) as ResData[]

    const _data = data.map(({ repo, starred_at }) => ({
      description: repo.description,
      forks_count: repo.forks_count,
      homepage: repo.homepage,
      github_id: repo.id,
      language: repo.language,
      name: repo.name,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      watchers_count: repo.watchers_count,
      starred_at: starred_at,
    }))

    const _list = [...result, ..._data]
    if (data?.length === 100) return getStarredList(token, page + 1, _list)
    return { data: _list }
  } catch (error) {
    return { error }
  }
}
