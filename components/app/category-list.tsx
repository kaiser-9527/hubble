import { ListItem } from "@/types/base"

import { Box } from "../ui/box"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Skeleton } from "../ui/skeleton"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  list?: ListItem[]
  displayTotal?: boolean
}

function CategoryListItem({ data }: { data: ListItem }) {
  const handleItemClick = () => {
    console.log("click")
  }
  return (
    <Button
      onClick={handleItemClick}
      className="w-full justify-between"
      variant="ghost"
    >
      <span>{data.label}</span>
      <span className="text-muted-foreground">{data.extral}</span>
    </Button>
  )
}

export default function CategoryList({ title, list, displayTotal }: Props) {
  return (
    <Box className="box flex flex-col px-0">
      {title && (
        <h5 className="mb-2 px-6 text-lg font-extrabold">
          {title}
          {displayTotal && (
            <span className="ml-1 text-sm text-muted-foreground">
              ({list?.length})
            </span>
          )}
        </h5>
      )}
      <ScrollArea className="w-full flex-1 px-2">
        <div className="space-y-1 p-2">
          {list ? (
            list.map((item) => (
              <CategoryListItem key={item.label} data={item} />
            ))
          ) : (
            <>
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </>
          )}
        </div>
      </ScrollArea>
    </Box>
  )
}
