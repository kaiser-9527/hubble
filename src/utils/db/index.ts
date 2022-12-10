import { GithubRepo } from "~/types/repo";
import DBBase, { TABLE_NAME } from "./base";

class DB extends DBBase {
  async getOverView() {
    const githubRepos = await this.get(TABLE_NAME.GH_REPO_LIST);
    const supaRepos = await this.get(TABLE_NAME.SUPA_REPO_LIST);

    return {
      total: githubRepos?.length ?? 0,
      pure: Math.max(githubRepos?.length ?? 0 - supaRepos?.length ?? 0, 0),
    };
  }

  async getLangMap() {
    const githubRepos = (await this.get(
      TABLE_NAME.GH_REPO_LIST
    )) as GithubRepo[];

    const langMap: Record<string, number> = {};
    githubRepos.forEach((repo) => {
      const lang = repo.language ?? "Unknow";
      if (!langMap[lang]) {
        langMap[lang] = 0;
      }

      langMap[lang]++;
    });

    return langMap;
  }

  async getTagList() {
    const tagList = await this.get(TABLE_NAME.SUPA_TAG_LIST);

    return tagList ?? [];
  }

  async searchRepos(val?: string) {
    const githubRepos = (await this.get(
      TABLE_NAME.GH_REPO_LIST
    )) as GithubRepo[];

    console.log("DB: search", val);

    return githubRepos.slice(0, 15);
  }
}

export default new DB();
