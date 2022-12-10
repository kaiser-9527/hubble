import SearchBar from "./searchBar";
import List from "./repo/list";
import { createContext, useState } from "react";
import { GithubRepo } from "~/types/repo";
import db from "~/utils/db";

export const SearchContext = createContext<{
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
    <SearchContext.Provider
      value={{
        result,
        search,
      }}
    >
      <section className="flex-1 flex flex-col px-4">
        <SearchBar />
        <List />
      </section>
    </SearchContext.Provider>
  );
};

export default RepoList;
