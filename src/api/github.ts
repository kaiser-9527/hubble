import toast from "react-hot-toast";
import { GithubRepo } from "~/types/repo";
import githubRequest from "~/utils/githubRequest";

export const getStarredList = async (
  page = 1,
  result: GithubRepo[] = []
): Promise<GithubRepo[]> => {
  const data = await githubRequest<GithubRepo[]>(
    `/user/starred?page=${page}&per_page=100`
  ).catch((error) => {
    toast.error("github repos sync fail.");
  });

  const res = data ?? [];
  const _list = [...result, ...res];
  if (data?.length === 100) return getStarredList(page + 1, _list);
  return _list;
};
