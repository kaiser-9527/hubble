import { GithubRepoItem } from "@/types/base"

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
        },
      }
    )
    if (!res.ok) {
      throw res
    }
    const data = await res.json()
    const _list = [...result, ...data]
    if (data?.length === 100) return getStarredList(token, page + 1, _list)
    return { data: _list }
  } catch (error) {
    return { error }
  }
}
