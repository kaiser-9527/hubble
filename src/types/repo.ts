export interface SupaTag {
  id: number;
  name: string;
}

// repo on supabase
export interface SupaRepo {
  id: number;
  gid: number;
  comment?: string;
  tag_list?: number[];
}

/**
 * simple repo from github and customs data
 */
export interface GithubRepo {
  created_at: string;
  description: string;
  forks_count: number;
  full_name: string;
  homepage: string;
  id: number;
  language: string;
  name: string;
  html_url: string;
  stargazers_count: number;
  topics: string[];
  updated_at: string;
  watchers_count: number;
}

export type TRepoItem = SupaRepo & GithubRepo;

export type MixedRepo = Pick<
  GithubRepo,
  | "description"
  | "language"
  | "forks_count"
  | "watchers_count"
  | "stargazers_count"
  | "full_name"
  | "html_url"
> & {
  gid: number;
  sid?: number;
  comment?: string;
  tags?: SupaTag[];
};

export interface SupaRepoRespon {
  id: number;
  gid: number;
  isNewRepo: boolean;
  comment?: string;
  tagList?: number[];
  newTags?: SupaTag[];
}
