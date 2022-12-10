import { useContext } from "react";
import { RepoContext } from "../context/repo";
import SideBarList from "../sideBar/list";

const TagList = () => {
  const { supaTagList } = useContext(RepoContext);

  return <SideBarList title="Tags" list={supaTagList}></SideBarList>;
};

export default TagList;
