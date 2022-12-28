import { useContext, useEffect, useState } from "react";
import { RepoContext } from "~/components/context/repo";
import RepoItem from "./item";
import { useHotkeys } from "react-hotkeys-hook";
const RepoList = () => {
  const { searchResult } = useContext(RepoContext);
  useHotkeys("down", () => {
    console.log("down", document.activeElement);
  });

  return (
    <ul className="flex flex-col flex-1 overflow-y-scroll scroll-bar gap-4">
      {searchResult.map((repo) => (
        <RepoItem repo={repo} key={repo.gid} />
      ))}
    </ul>
  );
};

export default RepoList;
