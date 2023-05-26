import { hasMiddleSpace } from "@/lib/utils"

import CategoryList from "./category-list"
import { useStore } from "./store-provider"

export default function Languages() {
  const { languagsCount, setSearchValue, search } = useStore()

  const onItemClick = (label: string) => {
    const searchKeyword = hasMiddleSpace(label)
      ? `lang:"${label}"`
      : `lang:${label}`
    setSearchValue(searchKeyword)
    search(searchKeyword)
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
