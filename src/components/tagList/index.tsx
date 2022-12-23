import { useContext, useMemo } from "react";
import { RepoContext } from "../context/repo";
import SideBarList from "../sideBar/list";

const TagList = () => {
  const { supaTagList, supaRepoList } = useContext(RepoContext);

  const tagList = useMemo(() => {
    const tagMap: Record<string, number> = {};
    supaRepoList.forEach((repo) => {
      if (repo.tag_list?.length) {
        repo.tag_list.forEach((tagId) => {
          if (!tagMap[tagId]) {
            tagMap[tagId] = 0;
          }
          tagMap[tagId] += 1;
        });
      }
    });

    return supaTagList.map((tag) => ({
      label: tag.name,
      id: tag.id,
      extral: tagMap[tag.id] ?? 0,
    }));
  }, [supaTagList, supaRepoList]);

  return (
    <SideBarList
      showCounts
      hideEmpty
      title="Tags"
      searchPrefix="tag:"
      list={tagList}
    ></SideBarList>
  );
};

export default TagList;

// 964a02cc-577e-4136-b9d4-e5133cd26021
