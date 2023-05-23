"use client"

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import {
  ListItem,
  MixedRepo,
  RelationItem,
  TagItem,
  UpsertRepo,
} from "@/types/base"
import { searchRepo } from "@/lib/search-repo"
import useRepoData from "@/hooks/useRepoData"

interface StoreContextProps {
  repos?: MixedRepo[]
  tags?: TagItem[]
  relations?: RelationItem[]

  loadingCount: number
  languagsCount?: ListItem[]

  // search
  searchValue?: string
  setSearchValue: (val: string) => void
  displayRepos?: MixedRepo[]
  search: (val?: string) => void

  // fetch data
  getGithubRepos: () => void
  getSupabaseRepos: () => void
  getTags: () => void
  forceSyncAllData: () => void

  upsertRepo: (d: UpsertRepo) => void
}

export const StoreContext = createContext<StoreContextProps | undefined>(
  undefined
)

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [displayRepos, setDisplayRepos] = useState<MixedRepo[] | undefined>()
  const [searchValue, setSearchValue] = useState<string>("")
  const {
    tags,
    languagsCount,
    repos,
    relations,
    loadingCount,
    getTags,
    getSupabaseRepos,
    getGithubRepos,
    upsertRepo,
    forceSyncAllData,
  } = useRepoData()

  const search: StoreContextProps["search"] = (val?: string) => {
    if (!val) {
      setDisplayRepos(repos)
    } else {
      const res = searchRepo({ repos, keyword: val })
      setDisplayRepos(res)
    }
  }

  useEffect(() => {
    search(searchValue)
  }, [repos])

  return (
    <StoreContext.Provider
      value={{
        repos,
        tags,
        languagsCount,
        displayRepos,
        relations,
        searchValue,
        loadingCount,
        setSearchValue,
        search,
        getGithubRepos,
        getSupabaseRepos,
        getTags,
        forceSyncAllData,
        upsertRepo,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)

  if (context === undefined) {
    throw new Error("useGithub must be used inside GithubProvider")
  }

  return context
}
