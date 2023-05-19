import { useMemo } from "react"

import CategoryList from "./category-list"
import { useStore } from "./store-provider"

export default function TagList() {
  const { tags } = useStore()

  const list = tags?.map((tag) => ({
    label: tag.title,
    extral: tag.repos_count,
  }))

  return <CategoryList title="Tags" displayTotal list={list} />
}
