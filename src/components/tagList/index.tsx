import { useContext, useMemo } from "react";
import { RepoContext } from "../context/repo";
import SideBarList from "../sideBar/list";
import { hasMiddleSpace } from "~/utils/helpers";

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

    return supaTagList.map((tag) => {
      const name = tag.name.trim();
      const searchKeyword = hasMiddleSpace(tag.name)
        ? `tag:"${name}"`
        : `tag:${name}`;
      return {
        label: tag.name,
        id: tag.id,
        searchKeyword,
        extral: tagMap[tag.id] ?? 0,
      };
    });
  }, [supaTagList, supaRepoList]);

  return (
    <SideBarList showCounts hideEmpty title="Tags" list={tagList}></SideBarList>
  );
};

export default TagList;
