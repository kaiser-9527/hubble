import { del, get, set } from "idb-keyval";
import { getStarredList } from "~/api/github";
import { pick } from "lodash-es";
import { getSupaRepoList, getSupaTagList } from "~/api/supabase";

import {
  GH_REPO_UPDATE,
  SUPA_REPO_UPDATE,
  SUPA_TAG_UPDATE,
} from "~/constants/pubEvent";

export const TABLE_NAME = {
  SUPA_REPO_LIST: "sp-repo-list",
  SUPA_TAG_LIST: "sp-tag-list",
  GH_REPO_LIST: "gh-repo-list",
};

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

class DBBase {
  uid?: string;
  inited?: boolean;

  async init(uid?: string) {
    console.log("DB: init. UID:", uid);
    if (uid && uid !== this.uid) {
      this.uid = uid;
      await this.checkLocalData();
    }
  }

  get(key: string) {
    return get(`${this.uid}-${key}`);
  }

  set(key: string, data: any) {
    return set(`${this.uid}-${key}`, data);
  }

  del(key: string) {
    return del(`${this.uid}-${key}`);
  }

  async checkLocalData() {
    const github = await this.get(TABLE_NAME.GH_REPO_LIST);
    console.log("DB: local github repo list:", github);

    if (!github) {
      this.syncGhRepoList();
    }

    const supaRepoList = await this.get(TABLE_NAME.SUPA_REPO_LIST);
    console.log("DB: local supa repo list:", supaRepoList);
    if (!supaRepoList) {
      this.syncSupaRepoList();
    }

    const supaTagList = await this.get(TABLE_NAME.SUPA_TAG_LIST);
    console.log("DB: local supa tag list:", supaTagList);
    if (!supaTagList) {
      this.syncSupaTagList();
    }
  }

  async syncSupaRepoList() {
    const { data, error } = await getSupaRepoList();
    this.set(TABLE_NAME.SUPA_REPO_LIST, error ? [] : data);
  }

  async syncSupaTagList() {
    const { data, error } = await getSupaTagList();
    this.set(TABLE_NAME.SUPA_TAG_LIST, error ? [] : data);
  }

  async syncGhRepoList() {
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
    this.set(TABLE_NAME.GH_REPO_LIST, data);
  }

  async forceSync() {
    this.syncGhRepoList();
    this.syncSupaRepoList();
    this.syncSupaTagList();
  }
}
export default DBBase;
