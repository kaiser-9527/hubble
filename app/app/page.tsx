import CategoryList from "@/components/app/category-list"
import RepoList from "@/components/app/repo-list"
import SearchBar from "@/components/app/search-bar"
import SearchResultCount from "@/components/app/search-result-count"
import SideBar from "@/components/app/sidebar"
import UserInfo from "@/components/app/user-info"

export default function Page() {
  return (
    <main className="container relative mx-auto flex h-screen py-10">
      <SideBar>
        <UserInfo />
        <CategoryList title="Overview" list={[]} />
        <CategoryList title="Languages" list={[]} />
      </SideBar>

      <section className="flex flex-1 flex-col gap-2 px-4">
        <SearchBar />
        <SearchResultCount />
        <RepoList />
      </section>

      <SideBar>
        <CategoryList title="Tags" list={[]} />
      </SideBar>
    </main>
  )
}
