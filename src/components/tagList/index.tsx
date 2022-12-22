import { useContext, useMemo } from "react";
import { RepoContext } from "../context/repo";
import SideBarList from "../sideBar/list";

const TagList = () => {
  const { supaTagList } = useContext(RepoContext);

  const tagList = useMemo(
    () =>
      supaTagList.map((tag) => ({
        label: tag.name,
        id: tag.id,
      })),
    [supaTagList]
  );

  return (
    <SideBarList
      showCounts
      title="Tags"
      searchPrefix="tag:"
      list={tagList}
    ></SideBarList>
  );
};

export default TagList;

// 964a02cc-577e-4136-b9d4-e5133cd26021
