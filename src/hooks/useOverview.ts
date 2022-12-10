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
    setOverview({
      total: githubRepoList.length,
      pure: 0,
    });
  }, [githubRepoList, supaRepoList]);

  return overview;
};
