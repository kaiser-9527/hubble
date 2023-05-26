import { useStore } from "./store-provider"

export default function SearchResultCount() {
  const { displayRepos } = useStore()

  return (
    <p className="text-xs text-muted-foreground">
      {displayRepos?.length ?? 0} repo
      {(displayRepos?.length ?? 0) > 1 ? "s" : ""}
    </p>
  )
}
