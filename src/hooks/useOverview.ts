import { useContext, useEffect, useState } from "react";
import { RepoContext } from "~/components/context/repo";
import { TOverView } from "~/types/common";

export default () => {
  const { githubRepoList, supaRepoList } = useContext(RepoContext);

  const [overview, setOverview] = useState<TOverView>({
    total: 0,
    pure: 0,
  });

  useEffect(() => {
    const pure = Math.max(githubRepoList.length - supaRepoList.length, 0);
    setOverview({
      total: githubRepoList.length,
      pure,
    });
  }, [githubRepoList, supaRepoList]);

  return overview;
};
