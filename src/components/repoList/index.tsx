import SearchBar from "./searchBar";
import List from "./repo/list";
import { createContext, useState } from "react";
import { GithubRepo } from "~/types/repo";
import db from "~/utils/db";

export const RepoContext = createContext<{
  result: GithubRepo[];
  search: (val: string) => void;
}>({
  result: [],
  search: () => [],
});

const RepoList = () => {
  const [result, setResult] = useState<GithubRepo[]>([]);

  const search = async (val: string) => {
    const repos = await db.searchRepos(val);
    setResult(repos);
  };

  return (
    <RepoContext.Provider
      value={{
        result,
        search,
      }}
    >
      <section className="flex-1 flex flex-col px-4">
        <SearchBar />
        <List />
      </section>
    </RepoContext.Provider>
  );
};

export default RepoList;
