import { supabase } from "~/utils/supabase";

export const signIn = () =>
  supabase.auth.signInWithOAuth({
    provider: "github",
  });
