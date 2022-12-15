import { del, get, set } from "idb-keyval";

export const TABLE_NAME = {
  SUPA_REPO_LIST: "sp-repo-list",
  SUPA_TAG_LIST: "sp-tag-list",
  GH_REPO_LIST: "gh-repo-list",
};

class DB {
  uid: string;
  constructor(uid: string) {
    this.uid = uid;
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
}

export default DB;
