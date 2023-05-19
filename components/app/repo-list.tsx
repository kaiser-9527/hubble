import { ScrollArea } from "../ui/scroll-area"
import { Skeleton } from "../ui/skeleton"
import RepoItem from "./repo-item"
import { useStore } from "./store-provider"

export default function RepoList() {
  const { displayRepos } = useStore()

  return (
    <ScrollArea className="w-full flex-1">
      <div className="space-y-4">
        {displayRepos ? (
          displayRepos.map((item) => (
            <RepoItem key={item.github_id} data={item} />
          ))
        ) : (
          <>
            <Skeleton className="h-130 w-full" />
            <Skeleton className="h-130 w-full" />
            <Skeleton className="h-130 w-full" />
          </>
        )}
      </div>
    </ScrollArea>
  )
}
