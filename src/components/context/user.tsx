import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { TUser } from "~/types/common";
import { getSupabaseUser } from "~/utils/supabase";

export const UserContext = createContext<{
  user?: TUser;
}>({});

const UserProvider: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<TUser | undefined>();

  useEffect(() => {
    getSupabaseUser((user) => {
      console.log(user);

      setUser(user);
    });
  }, []);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
