import { useContext } from "react";
import { RepoContext } from "~/components/context/repo";
import RepoItem from "./item";

const RepoList = () => {
  const { searchResult } = useContext(RepoContext);
  return (
    <ul className="flex flex-col flex-1 overflow-y-scroll scroll-bar gap-4">
      {searchResult.map((repo) => (
        <RepoItem repo={repo} key={repo.gid} />
      ))}
    </ul>
  );
};

export default RepoList;
