import { useEffect, useMemo, useState } from "react";
import { GithubRepo, MixedRepo, SupaRepo, SupaTag } from "~/types/repo";
import searchUtil, { mixRepos } from "~/utils/search";

export default ({
  githubRepoList,
  supaRepoList,
  supaTagList,
}: {
  githubRepoList: GithubRepo[];
  supaRepoList: SupaRepo[];
  supaTagList: SupaTag[];
}) => {
  const [searchValue, _setSearchValue] = useState("");
  const [result, setResult] = useState<MixedRepo[]>([]);

  const allMixedRepoList = useMemo(() => {
    return mixRepos({ githubRepoList, supaRepoList, supaTagList });
  }, [githubRepoList, supaRepoList, supaTagList]);

  const search = (val: string = "") => {
    _setSearchValue(val);

    if (!val) {
      setResult(allMixedRepoList);
    } else {
      setResult(searchUtil(val, allMixedRepoList));
    }
  };

  const setSearchValue = (val: string) => {
    _setSearchValue(val);
  };

  useEffect(() => {
    search();
  }, [githubRepoList]);

  return {
    searchValue,
    setSearchValue,
    searchResult: result,
    search,
  };
};
