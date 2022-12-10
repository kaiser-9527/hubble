import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { GithubRepo, SupaRepo, SupaTag } from "~/types/repo";
import db from "~/utils/db";
import { TABLE_NAME } from "~/utils/db/base";
import { UserContext } from "./user";

export const RepoContext = createContext<{
  githubRepoList: GithubRepo[];
  supaRepoList: SupaRepo[];
  supaTagList: SupaTag[];
}>({
  githubRepoList: [],
  supaRepoList: [],
  supaTagList: [],
});

const RepoProvider: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const { user } = useContext(UserContext);
  const [githubRepoList, setGithubRepoList] = useState<GithubRepo[]>([]);
  const [supaRepoList, setSupaRepoList] = useState<SupaRepo[]>([]);
  const [supaTagList, setSupaTagList] = useState<SupaTag[]>([]);

  useEffect(() => {
    db.init(user?.id).then(async () => {
      const ghRepos = await db.get(TABLE_NAME.GH_REPO_LIST);
      setGithubRepoList(ghRepos ?? []);

      const spRepos = await db.get(TABLE_NAME.SUPA_REPO_LIST);
      setSupaRepoList(spRepos ?? []);

      const spTags = await db.get(TABLE_NAME.SUPA_TAG_LIST);
      setSupaTagList(spTags ?? []);
    });
  }, []);

  return (
    <RepoContext.Provider
      value={{
        githubRepoList,
        supaRepoList,
        supaTagList,
      }}
    >
      {children}
    </RepoContext.Provider>
  );
};

export default RepoProvider;
