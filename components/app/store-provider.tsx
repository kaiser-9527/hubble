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
import { filterRepoByDate, searchRepo } from "@/lib/search-repo"
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

  // filter
  startDate?: Date
  endDate?: Date
  setStartDate: (d?: Date) => void
  setEndDate: (d?: Date) => void
  filter: () => void

  // fetch data
  getAllGithubRepos: () => void
  getLatestGithubRepos: () => void
  getSupabaseRepos: () => void
  getTags: () => void
  getCustomData: () => void
  forceSyncAllData: () => void

  upsertRepo: (d: UpsertRepo) => void
  updateTag: (tid: number, title: string) => void
  deleteTag: (tid: number) => void
}

export const StoreContext = createContext<StoreContextProps | undefined>(
  undefined
)

export default function StoreProvider({ children }: { children: ReactNode }) {
  const [displayRepos, setDisplayRepos] = useState<MixedRepo[] | undefined>()
  const [searchValue, setSearchValue] = useState<string>("")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()

  const {
    tags,
    languagsCount,
    repos,
    relations,
    loadingCount,
    getTags,
    getSupabaseRepos,
    getAllGithubRepos,
    upsertRepo,
    forceSyncAllData,
    getLatestGithubRepos,
    getCustomData,
    updateTag,
    deleteTag,
  } = useRepoData()

  const search: StoreContextProps["search"] = (val?: string) => {
    let _repos: MixedRepo[] | undefined
    if (!val) {
      _repos = repos
    } else {
      const res = searchRepo({ repos, keyword: val })
      _repos = res
    }

    _repos = _repos ? filterRepoByDate(_repos, [startDate, endDate]) : _repos
    setDisplayRepos(_repos)
  }

  const filter = () => {
    search(searchValue)
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

        startDate,
        endDate,
        setStartDate,
        setEndDate,
        filter,
        setSearchValue,
        search,
        getAllGithubRepos,
        getSupabaseRepos,
        getTags,
        getCustomData,
        getLatestGithubRepos,
        forceSyncAllData,
        upsertRepo,
        updateTag,
        deleteTag,
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
