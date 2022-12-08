import { useEffect, useState } from "react";
import { UserMetadata } from "~/types/common";
import { supabase } from "~/utils/supabase";

export default () => {
  const [user, setUser] = useState<UserMetadata | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser((data.session?.user.user_metadata as UserMetadata) ?? null);
    });
  }, []);

  supabase.auth.onAuthStateChange(async (event, session) => {
    setUser((session?.user.user_metadata as UserMetadata) ?? null);
  });

  return {
    user,
  };
};
