import { createClient } from "@supabase/supabase-js";
import { TUser } from "~/types/common";

const url = import.meta.env.DEV
  ? import.meta.env.VITE_SUPABASE_URL
  : process.env.SUPABASE_URL;
const key = import.meta.env.DEV
  ? import.meta.env.VITE_SUPABASE_ANON_KEY
  : process.env.SUPABASE_ANON_KEY;
export const supabase = createClient(url, key);

export const getSupabaseUser = (callback: (user?: TUser) => void) => {
  supabase.auth.getSession().then(({ data }) => {
    callback(data.session?.user as TUser);
  });

  supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user as TUser);
  });
};
