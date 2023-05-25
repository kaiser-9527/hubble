"use client"

import RepoFilter from "@/components/app/filter"
import AppHeader from "@/components/app/header"
import Languages from "@/components/app/languages"
import AppLoading from "@/components/app/loading"
import Overview from "@/components/app/overview"
import RepoList from "@/components/app/repo-list"
import SearchBar from "@/components/app/search-bar"
import SideBar from "@/components/app/sidebar"
import StoreProvider from "@/components/app/store-provider"
import TagList from "@/components/app/tag-list"
import UserInfo from "@/components/app/user-info"

export default function Page() {
  return (
    <StoreProvider>
      <main className="relative flex h-screen flex-col gap-4 overflow-hidden">
        <AppHeader />

        <section className="container flex flex-1 overflow-hidden pb-10">
          <SideBar>
            <UserInfo />
            <Overview />
            <Languages />
          </SideBar>

          <div className="flex flex-1 flex-col gap-2 px-4">
            <SearchBar />
            <RepoFilter />
            <RepoList />
          </div>

          <SideBar>
            <TagList />
          </SideBar>
        </section>

        <AppLoading />
      </main>
    </StoreProvider>
  )
}
