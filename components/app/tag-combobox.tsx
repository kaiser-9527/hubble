"use client"

import * as React from "react"
import { useEffect, useMemo, useState } from "react"
import { CheckIcon, PlusIcon, Settings } from "lucide-react"

import { TagItem } from "@/types/base"
import { cn, fullMatch, fuzzyMatch } from "@/lib/utils"
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Tag } from "../ui/tag"
import { useStore } from "./store-provider"

interface Props {
  selectedTags?: TagItem[]
  availableTags?: TagItem[]
  onRemoveTag: (t: TagItem) => void
  onSelectTag: (t: TagItem) => void
  onCreateTag: (t: TagItem) => void
}
export function TagCombobox({
  selectedTags = [],
  availableTags = [],
  onRemoveTag,
  onSelectTag,
  onCreateTag,
}: Props) {
  const [value, setValue] = useState("")
  const [actionVisible, setActionVisible] = useState(false)
  const [displayTags, setDisplayTags] = useState<TagItem[]>(availableTags)

  const handleSelectTag = (tag: any) => {
    if (selectedTagMap[tag.id]) {
      onRemoveTag(tag)
    } else {
      onSelectTag(tag)
    }
  }

  const handleCreateTag = (val: string) => {
    console.log("create tag:", val)
    const newTag: TagItem = {
      id: -1 * Date.now(), // id < 0 means this is a local/temp tag
      title: val,
    }
    onCreateTag(newTag)
  }

  const filter = () => {
    const val = value.trim()

    if (!val) {
      setDisplayTags(availableTags ?? [])
      setActionVisible(false)
      return
    }

    let hasFullMatch = false

    const _tags = availableTags?.filter((tag) => {
      if (fullMatch(tag.title, val)) {
        hasFullMatch = true
      }
      return fuzzyMatch(tag.title, val)
    })

    setActionVisible(!hasFullMatch)

    setDisplayTags(_tags ?? [])
  }

  useEffect(() => {
    filter()
  }, [value, availableTags])

  const selectedTagMap: Record<number, any> = useMemo(() => {
    return selectedTags.reduce(
      (pre, tag) => ({
        ...pre,
        [tag.id]: 1,
      }),
      {}
    )
  }, [selectedTags])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Tag className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
          <Settings size={18} />
        </Tag>
      </PopoverTrigger>
      <PopoverContent className="min-w-[200px] p-0">
        <Command shouldFilter={false}>
          <CommandInput value={value} onValueChange={setValue} />
          <CommandList>
            {actionVisible && (
              <CommandGroup heading="Action">
                <CommandItem className="space-x-2" onSelect={handleCreateTag}>
                  <PlusIcon size={16} className="mr-2" />
                  <span>{value}</span>
                </CommandItem>
              </CommandGroup>
            )}
            <CommandGroup heading="Tags">
              {displayTags?.length ? (
                displayTags.map((item) => (
                  <CommandItem
                    onSelect={() => {
                      handleSelectTag(item)
                    }}
                    key={item.id}
                  >
                    <CheckIcon
                      size={16}
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedTagMap[item.id] ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.title}
                  </CommandItem>
                ))
              ) : (
                <p className="p-2 text-center text-xs text-muted-foreground">
                  No matching tags
                </p>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
