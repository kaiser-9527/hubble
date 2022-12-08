import { useEffect, useState } from "react";
import { TUserMetadata } from "~/types/common";
import { getSupabaseUser } from "~/utils/supabase";

export default () => {
  const [user, setUser] = useState<TUserMetadata | undefined>();

  useEffect(() => {
    getSupabaseUser((user) => {
      setUser(user?.user_metadata as TUserMetadata);
    });
  }, []);

  return {
    user,
  };
};
