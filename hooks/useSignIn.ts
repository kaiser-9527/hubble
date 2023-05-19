import { useSupabase } from "@/components/supabase-provider"

export default function useSignIn() {
  const { supabase } = useSupabase()

  return () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
    })
  }
}
