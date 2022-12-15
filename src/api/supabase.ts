import { supabase } from "~/utils/supabase";

export const signIn = () =>
  supabase.auth.signInWithOAuth({
    provider: "github",
  });

export const getSupaRepoList = async (uid: string) =>
  supabase.from("repo").select("*").match({
    uid,
  });

export const getSupaTagList = async (uid: string) =>
  supabase.from("tag").select("*").match({
    uid,
  });

// insert repo
interface InsertRepoReq {
  gid: number;
  uid: string;
  comment?: string;
  tagId?: number[];
  tagLabel?: string[];
}

export const insertRepo = (info: InsertRepoReq) =>
  supabase.rpc("insert_repo", { repo: info });

// update repo
interface UpdateRepoReq {
  id: number;
  commnet?: string;
  tagId?: number[];
  tagLabel?: string[];
}
export const updateRepo = (info: UpdateRepoReq) =>
  supabase.rpc("update_repo", { repo: info });

interface UpsertTag {
  id?: number;
  label: string;
}
