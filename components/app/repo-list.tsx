import { ScrollArea } from "../ui/scroll-area"
import { Skeleton } from "../ui/skeleton"
import RepoItem from "./repo-item"
import { useStore } from "./store-provider"

export default function RepoList() {
  const { displayRepos } = useStore()

  function renderChildren() {
    if (typeof displayRepos === "undefined") {
      return (
        <>
          <Skeleton className="h-130 w-full" />
          <Skeleton className="h-130 w-full" />
          <Skeleton className="h-130 w-full" />
        </>
      )
    }

    if (!displayRepos.length) {
      return (
        <div className="py-10 text-center text-muted-foreground">
          No repo found.
        </div>
      )
    }

    return displayRepos.map((item) => (
      <RepoItem key={item.github_id} data={item} />
    ))
  }

  return (
    <ScrollArea className="w-full flex-1">
      <div className="space-y-4">{renderChildren()}</div>
    </ScrollArea>
  )
}
