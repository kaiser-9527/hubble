import CategoryList from "./category-list"
import { useStore } from "./store-provider"

export default function Languages() {
  const { languagsCount } = useStore()
  return <CategoryList title="Languages" list={languagsCount} />
}
