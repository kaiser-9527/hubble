import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useMemo,
} from "react";
import useSearch from "~/hooks/useSearch";
import useSyncData from "~/hooks/useSyncData";
import { GithubRepo, MixedRepo, SupaRepo, SupaTag } from "~/types/repo";
import SignIn from "../signIn";
import { UserContext } from "./user";

export const RepoContext = createContext<{
  githubRepoList: GithubRepo[];
  supaRepoList: SupaRepo[];
  supaTagList: SupaTag[];

  // overview
  languageMap: Record<string, number[]>;

  // search
  searchValue: string;
  search: (val?: string) => void;
  searchResult: MixedRepo[];
  setSearchValue: (val?: string) => void;
}>({
  githubRepoList: [],
  supaRepoList: [],
  supaTagList: [],

  languageMap: {},

  // search
  searchValue: "",
  search: (val?: string) => [],
  searchResult: [],
  setSearchValue: (val?: string) => {},
});

const RepoProvider: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <SignIn />;
  }

  const { githubRepoList, supaRepoList, supaTagList } = useSyncData(user.id);
  const { search, searchResult, searchValue, setSearchValue } = useSearch({
    githubRepoList,
    supaRepoList,
    supaTagList,
  });

  const languageMap = useMemo(() => {
    const langMap: Record<string, number[]> = {};
    githubRepoList.forEach((repo) => {
      const lang = repo.language ?? "Unknow";
      if (!langMap[lang]) {
        langMap[lang] = [];
      }
      langMap[lang].push(repo.id);
    });
    return langMap;
  }, [githubRepoList]);

  return (
    <RepoContext.Provider
      value={{
        githubRepoList,
        supaRepoList,
        supaTagList,

        //overview
        languageMap,

        // search
        search,
        searchResult,
        searchValue,
        setSearchValue,
      }}
    >
      {children}
    </RepoContext.Provider>
  );
};

export default RepoProvider;
