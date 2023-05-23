import CategoryList from "./category-list"
import { useStore } from "./store-provider"

export default function Languages() {
  const { languagsCount, setSearchValue, search } = useStore()

  const onItemClick = (label: string) => {
    const keyword = `lang:${label}`
    setSearchValue(keyword)
    search(keyword)
  }

  return (
    <CategoryList
      className="flex-1 overflow-hidden"
      title="Languages"
      list={languagsCount}
      onItemClick={onItemClick}
    />
  )
}
