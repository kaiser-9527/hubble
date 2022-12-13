import SearchBar from "./searchBar";
import List from "./repo/list";
import { createContext, useState } from "react";
import { GithubRepo } from "~/types/repo";
import db from "~/utils/db";

export const SearchContext = createContext<{
  result: GithubRepo[];
  isLoading: boolean;
  search: (val: string) => void;
}>({
  result: [],
  isLoading: false,
  search: () => [],
});

const RepoList = () => {
  const [result, setResult] = useState<GithubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = async (val: string) => {
    setIsLoading(true);
    const repos = await db.searchRepos(val);
    setResult(repos);
    setIsLoading(false);
  };

  return (
    <SearchContext.Provider
      value={{
        isLoading,
        result,
        search,
      }}
    >
      <section className="flex-1 flex flex-col px-4 gap-2">
        <SearchBar />
        {/* info */}
        <div className="flex justify-between pt-4 pb-2">
          <span className="text-txt-3 text-xs">
            Result: {result.length ?? 0}
          </span>

          <span>
            {/* TODO icon:loading */}
            {isLoading && <i>loading...</i>}
          </span>
        </div>
        <List />
      </section>
    </SearchContext.Provider>
  );
};

export default RepoList;
