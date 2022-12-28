import { pick } from "lodash-es";
import { GithubRepo, MixedRepo, SupaRepo, SupaTag } from "~/types/repo";
import { UnknownLangLabel } from "../../constants";
import { matchSearchType, matchVal } from "./match";

const findSupaRepo = (list: SupaRepo[], gid: number) => {
  return list.find((repo) => repo.gid === gid);
};

const findSupaTags = (list: SupaTag[], tagList?: number[]) => {
  if (!tagList?.length) return undefined;
  return list.filter((tag) => tagList?.includes(tag.id));
};

export const mixRepos = ({
  githubRepoList,
  supaRepoList,
  supaTagList,
}: {
  githubRepoList: GithubRepo[];
  supaRepoList: SupaRepo[];
  supaTagList: SupaTag[];
}): MixedRepo[] => {
  return githubRepoList.map((ghRepo) => {
    const supaRepo = findSupaRepo(supaRepoList, ghRepo.id);
    const supaTags = findSupaTags(supaTagList, supaRepo?.tag_list);

    return {
      ...pick(ghRepo, [
        "description",
        "forks_count",
        "watchers_count",
        "language",
        "stargazers_count",
        "full_name",
        "html_url",
      ]),
      gid: ghRepo.id,
      sid: supaRepo?.id,
      comment: supaRepo?.comment,
      tags: supaTags,
    };
  });
};

export default (value: string, source: MixedRepo[]) => {
  const valList = value.split(" ").filter(Boolean);
  let result: MixedRepo[] = source;
  valList.forEach((val) => {
    const valType = matchSearchType(val);
    switch (valType.type) {
      case "pure":
        result = result.filter((repo) => !repo.comment && !repo.tags);
        break;
      case "lang":
        result = result.filter((repo) => {
          if (valType.value === UnknownLangLabel) {
            return !repo.language;
          }
          return repo.language === valType.value;
        });
        break;
      case "tag":
        result = result.filter((repo) =>
          repo.tags?.some((tag) => tag.name === valType.value)
        );
        break;
      case "comment":
        result = result.filter((repo) => matchVal(valType.value, repo.comment));
        break;
      default:
        result = result.filter((repo) => {
          // match title
          if (matchVal(valType.value, repo.full_name)) {
            return true;
          }

          // match descriptin
          if (matchVal(valType.value, repo.description)) {
            return true;
          }

          // lang
          if (matchVal(valType.value, repo.language)) {
            return true;
          }

          // tag
          if (repo.tags?.some((tag) => matchVal(valType.value, tag.name))) {
            return true;
          }

          // comment
          if (matchVal(valType.value, repo.comment)) {
            return true;
          }

          return false;
        });
    }
  });

  return result;
};
