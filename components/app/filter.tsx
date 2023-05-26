import { useEffect, useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Button } from "../ui/button"
import { IconButton } from "../ui/icon-button"
import SearchResultCount from "./search-result-count"
import { useStore } from "./store-provider"

export default function RepoFilter() {
  const { startDate, endDate, setStartDate, setEndDate, filter } = useStore()

  useEffect(() => {
    filter()
  }, [startDate, endDate])

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">starred at:</span>
        <div className="flex items-center gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "justify-start text-left font-normal",
                  !startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? format(startDate, "PPP") : <span>After</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                disabled={{
                  after: endDate ?? new Date(),
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {startDate && (
            <IconButton
              size="xs"
              variant="secondary"
              onClick={() => setStartDate(undefined)}
            >
              <X size={16} />
            </IconButton>
          )}
        </div>

        <span className="">~</span>
        <div className="flex items-center gap-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "justify-start text-left font-normal",
                  !endDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {endDate ? format(endDate, "PPP") : <span>Before</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={{
                  before: startDate ?? new Date(1976, 0, 0),
                  after: new Date(),
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {endDate && (
            <IconButton
              size="xs"
              variant="secondary"
              onClick={() => setEndDate(undefined)}
            >
              <X size={16} />
            </IconButton>
          )}
        </div>
      </div>
      <SearchResultCount />
    </div>
  )
}
