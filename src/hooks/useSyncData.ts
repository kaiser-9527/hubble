import { pick } from "lodash-es";
import { useContext, useEffect, useState } from "react";
import { getStarredList } from "~/api/github";
import { getSupaRepoList, getSupaTagList } from "~/api/supabase";
import { LoadingContext } from "~/components/context/loading";
import { GithubRepo, SupaRepo, SupaRepoRespon, SupaTag } from "~/types/repo";
import DB, { TABLE_NAME } from "~/utils/db";

const githubRepoPickedKeys = [
  "id",
  "name",
  "full_name",
  "description",
  "language",
  "topics",
  "created_at",
  "updated_at",
  "stargazers_count",
  "watchers_count",
  "forks_count",
  "homepage",
  "html_url",
];

export default (uid: string) => {
  const [githubRepoList, setGithubRepoList] = useState<GithubRepo[]>([]);
  const [supaRepoList, setSupaRepoList] = useState<SupaRepo[]>([]);
  const [supaTagList, setSupaTagList] = useState<SupaTag[]>([]);
  const {loading} = useContext(LoadingContext)

  const db = new DB(uid);

  const syncGhRepoList = async () => {
    loading(true)
    const res = await getStarredList();
    loading(false)
    const data = res.map((repo) => ({
      ...pick(repo, githubRepoPickedKeys)
    }));

    setGithubRepoList(data as GithubRepo[]);
    db.set(TABLE_NAME.GH_REPO_LIST, data);
  };

  const syncSupaRepoList = async () => {
    loading(true)
    const { data, error } = await getSupaRepoList(uid);
    loading(false)
    const list = error ? [] : data;
    setSupaRepoList(list);
    db.set(TABLE_NAME.SUPA_REPO_LIST, list);
  };

  const syncSupaTagList = async () => {
    loading(true)
    const { data, error } = await getSupaTagList(uid);
    loading(false)
    const list = error ? [] : data;
    setSupaTagList(list);
    db.set(TABLE_NAME.SUPA_TAG_LIST, list);
  };

  const updateSupaRepo = (repo: SupaRepoRespon) => {
    // update repo
    setSupaRepoList((list) => {
      const newRepo = {
        id: repo.id,
        gid: repo.gid,
        comment: repo.comment,
        tag_list: repo.tagList,
      };

      const hasOldRepo = list.some((r) => r.id === repo.id);
      const newList = hasOldRepo
        ? list.map((r) => (r.id === repo.id ? newRepo : r))
        : [...list, newRepo];
      db.set(TABLE_NAME.SUPA_REPO_LIST, newList);
      return newList;
    });

    // update tag
    if (repo.newTags?.length) {
      setSupaTagList((list) => {
        const newList = [...list, ...repo.newTags!];
        db.set(TABLE_NAME.SUPA_TAG_LIST, newList);
        return newList;
      });
    }
  };

  useEffect(() => {
    // check local data
    db.get(TABLE_NAME.GH_REPO_LIST).then((res) => {
      if (!res?.length) {
        syncGhRepoList();
      } else {
        setGithubRepoList(res);
      }
    });

    db.get(TABLE_NAME.SUPA_REPO_LIST).then((res) => {
      if (!res) {
        syncSupaRepoList();
      } else {
        setSupaRepoList(res);
      }
    });

    db.get(TABLE_NAME.SUPA_TAG_LIST).then((res) => {
      if (!res) {
        syncSupaTagList();
      } else {
        setSupaTagList(res);
      }
    });
  }, []);

  return {
    githubRepoList,
    supaRepoList,
    supaTagList,

    syncGhRepoList,
    syncSupaRepoList,
    syncSupaTagList,

    updateSupaRepo,
  };
};
