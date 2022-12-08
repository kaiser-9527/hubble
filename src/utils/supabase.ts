import { createClient, User } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const getSupabaseUser = (callback: (user?: User) => void) => {
  supabase.auth.getSession().then(({ data }) => {
    callback(data.session?.user);
  });

  supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user);
  });
};
