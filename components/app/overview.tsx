import { useMemo } from "react"

import CategoryList from "./category-list"
import { useStore } from "./store-provider"

export default function Overview() {
  const { repos, setSearchValue, search } = useStore()

  const list = useMemo(() => {
    if (!repos) return

    const pureCount = repos.reduce((count, repo) => {
      if (repo.comment || repo.tags?.length) {
        return count
      } else {
        return count + 1
      }
    }, 0)

    return [
      {
        label: "All",
        extral: repos.length,
      },
      {
        label: "Pure",
        extral: pureCount,
      },
    ]
  }, [repos])

  const onItemClick = (label: string) => {
    const keyword = label === "All" ? "" : "pure:"
    setSearchValue(keyword)
    search(keyword)
  }

  return <CategoryList title="Overview" list={list} onItemClick={onItemClick} />
}
