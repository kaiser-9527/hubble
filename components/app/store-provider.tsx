"use client"

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"

import { ListItem, MixedRepo, TagItem, UpsertRepo } from "@/types/base"
import useRepoData from "@/hooks/useRepoData"

interface StoreContextProps {
  repos?: MixedRepo[]
  tags?: TagItem[]

  languagsCount?: ListItem[]

  // search
  searchValue?: string
  setSearchValue: (val?: string) => void
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
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const {
    tags,
    languagsCount,
    repos,
    getTags,
    getSupabaseRepos,
    getGithubRepos,
    getRepoTagRelation,
    upsertRepo,
  } = useRepoData()

  const search: StoreContextProps["search"] = (val?: string) => {
    if (!val) {
      setDisplayRepos(repos)
    } else {
      console.log("search", val)
    }
  }

  const forceSyncAllData = () => {}

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
        searchValue,
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
