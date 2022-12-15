import SearchBar from "./searchBar";
import List from "./repo/list";
import { useContext } from "react";
import { RepoContext } from "../context/repo";

const RepoList = () => {
  const { searchResult } = useContext(RepoContext);

  return (
    <section className="flex-1 flex flex-col px-4 gap-2">
      <SearchBar />
      {/* info */}
      <div className="flex justify-between items-center pt-4 pb-2">
        <span className="text-txt-3 text-xs">
          Result: {searchResult.length}
        </span>
      </div>
      <List />
    </section>
  );
};

export default RepoList;
