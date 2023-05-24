"use client"

import { useState } from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { EditIcon, Trash2Icon } from "lucide-react"

import { TagItem } from "@/types/base"
import { cn, hasMiddleSpace } from "@/lib/utils"

import { Button } from "../ui/button"
import { IconButton } from "../ui/icon-button"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useStore } from "./store-provider"

export interface EditableTagItemProps {
  tag: TagItem
  count: number
  editable: boolean
}

export default function EditableTagItem({
  tag,
  count,
  editable,
}: EditableTagItemProps) {
  const { setSearchValue, search, updateTag, deleteTag } = useStore()
  const [popoverVisible, setPopoverVisible] = useState(false)
  const [tagName, setTagName] = useState(tag.title)
  const [loading, setLoading] = useState(false)

  const onItemClick = (label: string) => {
    const searchKeyword = hasMiddleSpace(label)
      ? `tag:"${label}"`
      : `tag:${label}`
    setSearchValue(searchKeyword)
    search(searchKeyword)
  }

  const handleRename = async () => {
    if (!tagName.trim()) return
    setLoading(true)
    await updateTag(tag.id, tagName)
    setLoading(false)
  }

  const handleDelete = async () => {
    setLoading(true)
    await deleteTag(tag.id)
    setLoading(false)
  }
  return (
    <div className="group relative">
      <Button
        onClick={() => onItemClick(tag.title)}
        className={cn(
          "w-full justify-between group-hover:bg-accent group-hover:text-accent-foreground",
          popoverVisible ? "bg-accent text-accent-foreground" : ""
        )}
        variant="ghost"
      >
        <span>{tag.title}</span>
        <span className="text-muted-foreground">{count}</span>
      </Button>

      <div
        className={cn(
          "absolute top-0 flex h-full items-center gap-2 transition-all",
          editable ? "right-2" : "-right-32"
        )}
      >
        <Popover onOpenChange={setPopoverVisible}>
          <PopoverTrigger asChild>
            <IconButton size="sm" variant="secondary">
              <EditIcon size={16} />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent side="top">
            <p>Reanme</p>
            <Input
              className="my-2"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
            />
            <footer className="flex justify-end">
              <PopoverPrimitive.Close asChild>
                <Button onClick={handleRename} size="sm">
                  Save
                </Button>
              </PopoverPrimitive.Close>
            </footer>
          </PopoverContent>
        </Popover>

        <Popover onOpenChange={setPopoverVisible}>
          <PopoverTrigger asChild>
            <IconButton size="sm" variant="destructive">
              <Trash2Icon size={16} />
            </IconButton>
          </PopoverTrigger>
          <PopoverContent side="top">
            <p>
              Please be aware that deleting a tag will result in the automatic
              removal of the tag from all repositories that are currently using
              it.
            </p>
            <footer className="flex justify-end">
              <PopoverPrimitive.Close asChild>
                <Button variant="destructive" onClick={handleDelete} size="sm">
                  delete
                </Button>
              </PopoverPrimitive.Close>
            </footer>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
