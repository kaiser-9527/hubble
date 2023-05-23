import { useStore } from "./store-provider"

export default function SearchResultCount() {
  const { displayRepos } = useStore()
  return (
    <p className="text-xs text-muted-foreground">
      Resoult: {displayRepos?.length ?? 0}
    </p>
  )
}
