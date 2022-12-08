import { useMemo } from "react";
import useLanguageMap from "~/hooks/useLanguageMap";
import SideBarList from "../sideBar/list";

const LanguageList = () => {
  const langMap = useLanguageMap();
  const list = useMemo(() => {
    return Object.keys(langMap).map((key) => ({
      label: key,
      extral: langMap[key],
    }));
  }, [langMap]);
  return <SideBarList title="Languages" list={list}></SideBarList>;
};

export default LanguageList;
