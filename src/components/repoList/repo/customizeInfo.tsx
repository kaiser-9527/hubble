import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { insertRepo, updateRepo } from "~/api/supabase";
import { LoadingContext } from "~/components/context/loading";
import { RepoContext } from "~/components/context/repo";
import { UserContext } from "~/components/context/user";
import { MixedRepo, SupaRepoRespon, SupaTag } from "~/types/repo";
import AddTag from "./addTag";

interface Props {
  repo: MixedRepo;
  editable: boolean;
  setEditable: (val: boolean) => void;
}

interface SimpleTag {
  id: number | string;
  name: string;
}

export default ({ repo, editable, setEditable }: Props) => {
  const { user } = useContext(UserContext);
  const { comment, tags } = repo;
  const [commentValue, setCommentValue] = useState(comment ?? "");
  const [tagList, setTagList] = useState<SimpleTag[]>(tags ?? []);
  const [tagInputVisible, setTagInputVisible] = useState(false);
  const { updateSupaRepo } = useContext(RepoContext);
  const [optimisticComment, setOptimisticComment] = useState(comment ?? "");
  const [optimisticTagList, setOptimisticTagList] = useState<SimpleTag[]>(
    tags ?? []
  );

  const { loading } = useContext(LoadingContext);

  const handleDelTag = (index: number) => {
    setTagList((tags) => {
      return tags.filter((t, idx) => idx !== index);
    });
  };

  const handleTagSelectChange = (tag: SupaTag) => {
    setTagList((list) => [...list, tag]);
  };

  const toggleTagInput = () => {
    setTagInputVisible((v) => !v);
  };

  const handleSubmit = async () => {
    loading(true);
    const res: {
      comment: string;
      tagNames: string[];
      tagIds: number[];
    } = {
      comment: commentValue,
      tagNames: [],
      tagIds: [],
    };

    tagList.forEach((t) => {
      if (typeof t.id === "string") {
        res.tagNames.push(t.name);
      } else {
        res.tagIds.push(t.id);
      }
    });

    // 乐观更新
    setOptimisticComment(commentValue);
    setOptimisticTagList(tagList);

    setTagInputVisible(false);
    setEditable(false);

    if (repo.sid) {
      const { data, error } = await updateRepo({
        ...res,
        id: repo.sid,
      });
      loading(false);
      if (error || !data) {
        // 更新失败
        setOptimisticComment(comment ?? "");
        setOptimisticTagList(tags ?? []);
        toast.error("update repo fail.");
        return;
      }
      updateSupaRepo(data as unknown as SupaRepoRespon);
    } else {
      const { data, error } = await insertRepo({
        ...res,
        gid: repo.gid,
        uid: user!.id,
      });
      loading(false);
      if (error || !data) {
        // 更新失败
        setOptimisticComment(comment ?? "");
        setOptimisticTagList(tags ?? []);
        toast.error("insert repo fail.");
        return;
      }
      updateSupaRepo(data as unknown as SupaRepoRespon);
    }
  };
  return (
    <>
      {optimisticComment && !editable && (
        <p className="text-xs text-txt-3 pb-2 font-italic">
          {optimisticComment}
        </p>
      )}

      {optimisticTagList && !editable && (
        <div className="flex gap-1 text-xs text-txt-2 pb-2">
          {optimisticTagList.map((tag) => (
            <span className="bg-fill-3 px-1 rounded text-txt-2" key={tag.id}>
              {tag.name}
            </span>
          ))}
        </div>
      )}

      {editable && (
        <div className="border-2 rounded p-4 rounded-lg border-primary-500  border-bd-1">
          <div className="flex gap-2 items-center">
            <span className="block w-20 text-right">Comment:</span>
            <textarea
              className="bg-transparent border-bd-1 rounded border p-1 w-full"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
            />
          </div>

          <div className="flex gap-2 items-center mt-2">
            <span className="block w-20 text-right">Tags:</span>
            <div className="flex gap-2 flex-wrap">
              {tagList?.map((tag, index) => (
                <span
                  className="pl-1  bg-primary-50 text-primary-900 rounded-lg flex items-cente gap-2 "
                  key={tag.id}
                >
                  {tag.name}{" "}
                  <i
                    onClick={() => handleDelTag(index)}
                    className="bg-rose-500 cursor-pointer text-white rounded-r-lg px-2 text-center block"
                  >
                    x
                  </i>
                </span>
              ))}

              <div className="flex items-center">
                {tagInputVisible && (
                  <AddTag onSelectChange={handleTagSelectChange} />
                )}
                <button
                  onClick={() => toggleTagInput()}
                  className={`h-6 w-6 transition-transform duration-500 bg-primary-50 text-primary-900 rounded-full justify-center flex items-center ${
                    tagInputVisible ? "rotate-45" : ""
                  }`}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button className="btn ">cancel</button>
            <button className="btn btn-primary" onClick={() => handleSubmit()}>
              save
            </button>
          </div>
        </div>
      )}
    </>
  );
};
