import { useContext, useMemo } from "react";
import { RepoContext } from "../context/repo";
import SideBarList from "../sideBar/list";

const LanguageList = () => {
  const { languageMap } = useContext(RepoContext);

  const list = useMemo(() => {
    return Object.keys(languageMap).map((key) => ({
      label: key,
      extral: languageMap[key].length,
    }));
  }, [languageMap]);
  return (
    <SideBarList
      title="Languages"
      searchPrefix="lang:"
      list={list}
    ></SideBarList>
  );
};

export default LanguageList;
