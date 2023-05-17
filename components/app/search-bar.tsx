import { KeyboardEvent as ReactKeyboardEvent, useContext, useRef } from "react"
import { useHotkeys } from "react-hotkeys-hook"

import { isMac } from "@/lib/utils"

import { Input } from "../ui/input"

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement | null>(null)

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
    }

    if (key === "Escape") {
      inputRef.current?.blur()
    }
  }

  return (
    <div className="relative rounded-lg border-2 p-4 transition focus-within:border-accent">
      <Input
        className="w-full "
        type="text"
        ref={inputRef}
        placeholder="search"
        onKeyDown={handleInputKeydow}
      />
      <kbd className="pointer-events-none  absolute inset-y-0 right-1 m-auto h-7 rounded-lg px-1 leading-7 text-muted-foreground">
        {hotKeyHint}
      </kbd>
    </div>
  )
}
