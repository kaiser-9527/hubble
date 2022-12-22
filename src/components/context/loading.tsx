import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { TUser } from "~/types/common";
import { getSupabaseUser } from "~/utils/supabase";

export const LoadingContext = createContext<{
  loading: (b: boolean) => void;
}>({
  loading: (b) => {},
});

const LoadingProvider: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const loading = (b: boolean) => {
    setLoadingCount((c) => c + (b ? 1 : -1));
  };

  return (
    <LoadingContext.Provider value={{ loading }}>
      <div className="fixed top-0 right-0 h-10 w-10 flex justify-center items-center pointer-events-none">
        {loadingCount > 0 && <i className="i-line-md-loading-twotone-loop" />}
      </div>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
