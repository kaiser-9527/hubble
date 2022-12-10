import { useContext } from "react";
import { RepoContext } from "..";
import RepoItem from "./item";

const RepoList = () => {
  const { result } = useContext(RepoContext);
  return (
    <ul className="flex flex-col flex-1 overflow-y-scroll scroll-bar gap-4">
      {result.map((repo) => (
        <RepoItem repo={repo} key={repo.id} />
      ))}
    </ul>
  );
};

export default RepoList;
