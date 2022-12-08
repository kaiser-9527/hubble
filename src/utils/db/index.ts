import { GithubRepo } from "~/types/repo";
import DBBase, { TABLE_NAME } from "./base";

class DB extends DBBase {
  async getOverView() {
    const githubRepos = await this.get(TABLE_NAME.GH_REPOS);

    // TODO get pure
    return {
      total: githubRepos.length,
      pure: 0,
    };
  }

  async getLangMap() {
    const githubRepos = (await this.get(TABLE_NAME.GH_REPOS)) as GithubRepo[];

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
}

export default new DB();
