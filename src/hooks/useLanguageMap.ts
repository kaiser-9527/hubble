import { useContext, useEffect, useState } from "react";
import { RepoContext } from "~/components/context/repo";

type LangItem = Record<string, number>;
export default () => {
  const [languageMap, setLanguageMap] = useState<LangItem>({});
  const { githubRepoList } = useContext(RepoContext);

  useEffect(() => {
    const langMap: LangItem = {};
    githubRepoList.forEach((repo) => {
      const lang = repo.language ?? "Unknow";
      if (!langMap[lang]) {
        langMap[lang] = 0;
      }
      langMap[lang]++;
    });

    setLanguageMap(langMap);
  }, [githubRepoList]);

  return languageMap;
};
