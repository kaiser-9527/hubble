import { del, get, set } from "idb-keyval";
import { getStarredList } from "~/api/github";
import { pick } from "lodash-es";

export const TABLE_NAME = {
  SUPA_REPO_LIST: "sp-repo-list",
  SUPA_TAG_LIST: "sp-tag-list",
  GH_REPOS: "gh-repos",
};

const githubReposPickedKeys = [
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
    if (uid && uid !== this.uid) {
      this.uid = uid;
      await this.checkLocalData();
      console.log("DB: inited. UID:", uid);
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
    const github = await this.get(TABLE_NAME.GH_REPOS);
    console.log("DB: local github repos:", github);

    if (!github) {
      this.syncGhRepos();
    }

    const supaRepos = await this.get(TABLE_NAME.SUPA_REPO_LIST);
    console.log("DB: local suparepos:", supaRepos);
    if (!supaRepos) {
      // TODO
    }
  }

  async syncGhRepos() {
    const res = await getStarredList();
    const data = res.map((repo) => ({
      ...pick(repo, githubReposPickedKeys),
      owner: {
        avatar_url: repo.owner.avatar_url,
        html_url: repo.owner.html_url,
        id: repo.owner.id,
        login: repo.owner.login,
      },
    }));
    this.set(TABLE_NAME.GH_REPOS, data);
  }

  async forceSync() {
    // sync github
    getStarredList();
  }
}
export default DBBase;
