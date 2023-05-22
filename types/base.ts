import { Database } from "./database"

export interface ListItem {
  label: string
  icon?: string
  searchKeyword?: string
  extral?: React.ReactNode
}

export type TagItem = Pick<
  Database["public"]["Tables"]["tag"]["Row"],
  "id" | "title"
>

export type RelationItem = Pick<
  Database["public"]["Tables"]["repo_tag"]["Row"],
  "id" | "repo_id" | "tag_id"
>

export type SupaRepoItem = Pick<
  Database["public"]["Tables"]["repo"]["Row"],
  "id" | "comment" | "github_id"
>

export interface GithubRepoItem {
  created_at: string
  description: string
  forks_count: number
  full_name: string
  homepage: string
  id: number
  language: string
  name: string
  html_url: string
  stargazers_count: number
  topics: string[]
  updated_at: string
  watchers_count: number
}

export type MixedRepo = Pick<
  GithubRepoItem,
  | "description"
  | "language"
  | "forks_count"
  | "watchers_count"
  | "stargazers_count"
  | "full_name"
  | "html_url"
> & {
  github_id: number
  supa_id?: number
  comment?: string | null
  tags?: TagItem[]
}

export interface UpsertRepo {
  comment?: string
  github_id?: number

  added_tag_ids?: number[]
  removed_tag_ids?: number[]
  created_tag_titles?: string[]
}
