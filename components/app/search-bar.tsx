"use client"

import { KeyboardEvent as ReactKeyboardEvent, useRef } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { isMac } from "@/lib/utils-client"

import { useStore } from "./store-provider"

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { searchValue, setSearchValue, search } = useStore()

  const hotKeyHint = isMac() ? "⌘ k" : "ctrl k"

  // focus to the input
  useHotkeys("meta+k,ctrl+k", (e) => {
    inputRef.current?.focus()
    e.preventDefault()
  })

  // do search
  const handleInputKeydow = (e: ReactKeyboardEvent<HTMLElement>) => {
    const key = e.key

    if (key === "Enter") {
      search()
    }

    if (key === "Escape") {
      inputRef.current?.blur()
    }
  }

  return (
    <div className="relative rounded-lg border-2  transition focus-within:border-primary">
      <input
        className="h-full w-full bg-transparent p-4 focus:outline-0"
        type="text"
        ref={inputRef}
        value={searchValue}
        placeholder="search"
        onKeyDown={handleInputKeydow}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <kbd className="pointer-events-none  absolute inset-y-0 right-1 m-auto h-7 rounded-lg px-1 leading-7 text-muted-foreground">
        {hotKeyHint}
      </kbd>
    </div>
  )
}
