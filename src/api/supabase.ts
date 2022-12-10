import { supabase } from "~/utils/supabase";

export const signIn = () =>
  supabase.auth.signInWithOAuth({
    provider: "github",
  });

export const getSupaRepoList = async () => {
  const { data } = await supabase.auth.getSession();
  return supabase.from("repo").select("*").match({
    uid: data.session?.user.id,
  });
};

export const getSupaTagList = async () => {
  const { data } = await supabase.auth.getSession();
  return supabase.from("tag").select("*").match({
    uid: data.session?.user.id,
  });
};
