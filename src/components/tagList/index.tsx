import useTagList from "~/hooks/useTagList";
import SideBarList from "../sideBar/list";

const TagList = () => {
  const { tagList } = useTagList();
  return <SideBarList title="Tags" list={tagList}></SideBarList>;
};

export default TagList;
