import { useContext } from "react";
import { SearchContext } from "..";
import RepoItem from "./item";

const RepoList = () => {
  const { result } = useContext(SearchContext);
  return (
    <ul className="flex flex-col flex-1 overflow-y-scroll scroll-bar gap-4">
      {result.map((repo) => (
        <RepoItem repo={repo} key={repo.id} />
      ))}
    </ul>
  );
};

export default RepoList;
