import { GithubRepoItem } from "@/types/base"

const baseUrl = "https://api.github.com"
export const getStarredList = async (
  token: string,
  page = 1,
  result: GithubRepoItem[] = []
): Promise<{
  data?: GithubRepoItem[]
  error?: any
}> => {
  try {
    const res = await fetch(
      baseUrl + `/user/starred?page=${page}&per_page=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    if (!res.ok) {
      console.log(res)
      throw res
    }
    const data = await res.json()
    const _list = [...result, ...data]
    // if (data?.length === 100) return getStarredList(token, page + 1, _list);
    return { data: _list }
  } catch (error) {
    return { error }
  }
}
