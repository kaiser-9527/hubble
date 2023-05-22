import { useEffect, useState } from "react"

import { ListItem } from "@/types/base"

import CategoryList from "./category-list"
import { useStore } from "./store-provider"

export default function TagList() {
  const { tags, relations } = useStore()
  const [list, setList] = useState<ListItem[]>([])

  useEffect(() => {
    const relationMap = relations
      ? relations.reduce<Record<number, number>>((prev, relation) => {
          if (!prev[relation.tag_id]) {
            prev[relation.tag_id] = 1
          } else {
            prev[relation.tag_id] += 1
          }
          return prev
        }, {})
      : {}

    setList(() =>
      tags
        ? tags.map((tag) => ({
            label: tag.title,
            extral: relationMap[tag.id] ?? 0,
          }))
        : []
    )
  }, [tags, relations])

  return <CategoryList title="Tags" displayTotal list={list} />
}
