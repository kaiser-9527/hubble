import { createClient } from "@supabase/supabase-js";
import { TUser } from "~/types/common";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getSupabaseUser = (callback: (user?: TUser) => void) => {
  supabase.auth.getSession().then(({ data }) => {
    callback(data.session?.user as TUser);
  });

  supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user as TUser);
  });
};
