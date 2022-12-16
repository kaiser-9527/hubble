import { SupaRepoRespon } from "~/types/repo";
import { supabase } from "~/utils/supabase";
import toast from "react-hot-toast";

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
export interface InsertRepoReq {
  gid: number;
  uid: string;
  comment?: string;
  tagIds?: number[];
  tagNames?: string[];
}

export const insertRepo = (info: InsertRepoReq) =>
  supabase.rpc("insert_repo", { repo: info });

// update repo
interface UpdateRepoReq {
  id: number;
  commnet?: string;
  tagIds?: number[];
  tagNames?: string[];
}
export const updateRepo = (info: UpdateRepoReq) =>
  supabase.rpc("update_repo", { repo: info });

interface UpsertTag {
  id?: number;
  label: string;
}
