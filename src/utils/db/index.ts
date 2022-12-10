import { GithubRepo } from "~/types/repo";
import DBBase, { TABLE_NAME } from "./base";

class DB extends DBBase {
  async searchRepos(val?: string) {
    const githubRepos = (await this.get(
      TABLE_NAME.GH_REPO_LIST
    )) as GithubRepo[];

    console.log("DB: search", val);

    return githubRepos.slice(0, 15);
  }
}

export default new DB();
