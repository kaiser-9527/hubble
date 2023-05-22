"use client"

import Languages from "@/components/app/languages"
import AppLoading from "@/components/app/loading"
import Overview from "@/components/app/overview"
import RepoList from "@/components/app/repo-list"
import SearchBar from "@/components/app/search-bar"
import SearchResultCount from "@/components/app/search-result-count"
import SideBar from "@/components/app/sidebar"
import StoreProvider from "@/components/app/store-provider"
import TagList from "@/components/app/tag-list"
import UserInfo from "@/components/app/user-info"

export default function Page() {
  return (
    <main className="container relative mx-auto flex h-screen py-10">
      <StoreProvider>
        <SideBar>
          <UserInfo />
          <Overview />
          <Languages />
        </SideBar>

        <section className="flex flex-1 flex-col gap-2 px-4">
          <SearchBar />
          <SearchResultCount />
          <RepoList />
        </section>

        <SideBar>
          <TagList />
        </SideBar>

        <AppLoading />
      </StoreProvider>
    </main>
  )
}
