import { useEffect, useState } from "react"
import { SettingsIcon } from "lucide-react"

import { TagItem } from "@/types/base"

import { Skeleton } from "../ui/skeleton"
import { Toggle } from "../ui/toggle"
import CategoryList from "./category-list"
import EditableTagItem, { EditableTagItemProps } from "./editable-tag-item"
import { useStore } from "./store-provider"

export default function TagList() {
  const { tags, relations } = useStore()
  const [editable, setEditable] = useState(false)
  const [list, setList] = useState<{ tag: TagItem; count: number }[]>([])

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
            tag,
            count: relationMap[tag.id] ?? 0,
          }))
        : []
    )
  }, [tags, relations])

  return (
    <CategoryList
      className="overflow-hidden"
      title="Tags"
      titleExtral={
        <Toggle
          aria-label="Edit tags"
          size="sm"
          pressed={editable}
          onPressedChange={setEditable}
        >
          <SettingsIcon size={16} />
        </Toggle>
      }
    >
      {list ? (
        list.map((item) => (
          <EditableTagItem {...item} editable={editable} key={item.tag.id} />
        ))
      ) : (
        <>
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </>
      )}
    </CategoryList>
  )
}
