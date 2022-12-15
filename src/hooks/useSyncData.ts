import { pick } from "lodash-es";
import { useEffect, useState } from "react";
import { getStarredList } from "~/api/github";
import { getSupaRepoList, getSupaTagList } from "~/api/supabase";
import { GithubRepo, SupaRepo, SupaTag } from "~/types/repo";
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

  const db = new DB(uid);

  const syncGhRepoList = async () => {
    const res = await getStarredList();
    const data = res.map((repo) => ({
      ...pick(repo, githubRepoPickedKeys),
      owner: {
        avatar_url: repo.owner.avatar_url,
        html_url: repo.owner.html_url,
        id: repo.owner.id,
        login: repo.owner.login,
      },
    }));

    setGithubRepoList(data as GithubRepo[]);
    db.set(TABLE_NAME.GH_REPO_LIST, data);
  };

  const syncSupaRepoList = async () => {
    const { data, error } = await getSupaRepoList(uid);
    const list = error ? [] : data;
    setSupaRepoList(list);
    db.set(TABLE_NAME.SUPA_REPO_LIST, list);
  };

  const syncSupaTagList = async () => {
    const { data, error } = await getSupaTagList(uid);
    const list = error ? [] : data;
    setSupaTagList(list);
    db.set(TABLE_NAME.SUPA_TAG_LIST, list);
  };

  useEffect(() => {
    // check local data
    db.get(TABLE_NAME.GH_REPO_LIST).then((res) => {
      if (!res) {
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
  };
};
