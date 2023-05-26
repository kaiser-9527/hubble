import { useEffect, useState } from "react"
import { UploadCloudIcon } from "lucide-react"

import { MixedRepo, TagItem } from "@/types/base"
import { compareTags } from "@/lib/utils"

import { Button } from "../ui/button"
import { Tag } from "../ui/tag"
import { Textarea } from "../ui/textarea"
import { useStore } from "./store-provider"
import { TagCombobox } from "./tag-combobox"

interface Props {
  isEditable: boolean
  setIsEditable: (val: boolean) => void
  data: MixedRepo
}
export default function RepoItemCustomizeInfo({
  isEditable,
  setIsEditable,
  data,
}: Props) {
  const { tags: allTags, upsertRepo } = useStore()
  const { comment, tags } = data
  const [commentValue, setCommentValue] = useState(comment ?? "")
  const [editableTags, setEditableTags] = useState<TagItem[]>(tags ?? [])
  const [availableTags, setAvailableTags] = useState(allTags ?? [])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setEditableTags(tags ?? [])
  }, [tags])

  const handleCancelEdit = () => {
    setCommentValue(comment ?? "")
    setEditableTags(tags ?? [])
    setIsEditable(false)
  }

  const handleRemoveTag = (t: TagItem) => {
    setEditableTags((tags) => tags.filter((tag) => tag.id !== t.id))
    if (t.id < 0) {
      setAvailableTags((tags) => tags.filter((tag) => tag.id !== t.id))
    }
  }

  const handleAddTag = (t: TagItem) => {
    setEditableTags((tags) => [...tags, t])
    if (t.id < 0) {
      setAvailableTags((tags) => [...tags, t])
    }
  }

  const handleSaveRepoInfo = async () => {
    setLoading(true)
    setIsEditable(false)

    const { added_tag_ids, removed_tag_ids, created_tag_titles } = compareTags(
      tags ?? [],
      editableTags
    )

    await upsertRepo({
      github_id: data.github_id,
      comment: commentValue,
      added_tag_ids,
      removed_tag_ids,
      created_tag_titles,
    })
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="z-1 absolute left-0  top-0 flex h-full w-full items-center justify-center rounded-md backdrop-blur-sm">
        <UploadCloudIcon size={30} className="animate-bounce" />
      </div>
    )
  }

  if (isEditable) {
    return (
      <>
        <div
          className="z-1 absolute left-0  top-0 h-full w-full rounded-md backdrop-blur-sm"
          onClick={handleCancelEdit}
        ></div>
        <div className="relative z-10 pb-2">
          <Textarea
            className="min-h-[40px]"
            placeholder="Type your comment here."
            value={commentValue}
            onChange={(e) => setCommentValue(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 py-2">
            {editableTags.map((tag) => (
              <Tag closable onClick={() => handleRemoveTag(tag)} key={tag.id}>
                {tag.title}
              </Tag>
            ))}
            <TagCombobox
              selectedTags={editableTags}
              availableTags={availableTags}
              onRemoveTag={handleRemoveTag}
              onSelectTag={handleAddTag}
              onCreateTag={handleAddTag}
            />
          </div>
          <footer className="flex justify-end gap-2 py-2">
            <Button size="sm" variant="secondary" onClick={handleCancelEdit}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleSaveRepoInfo}>
              Save
            </Button>
          </footer>
        </div>
      </>
    )
  } else if (!!comment || !!tags?.length) {
    return (
      <div className="relative z-10 pb-2">
        <p className="text-sm">{comment}</p>
        <div className="flex flex-wrap gap-2 py-2">
          {tags?.map((tag) => (
            <Tag key={tag.id}>{tag.title}</Tag>
          ))}
        </div>
      </div>
    )
  }

  return null
}
