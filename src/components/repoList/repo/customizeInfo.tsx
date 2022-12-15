import { SupaTag } from "~/types/repo";
import { useState } from "react";

interface Props {
  comment?: string;
  tags?: SupaTag[];
  editable: boolean;
}

export default ({ comment, tags, editable }: Props) => {
  const [commentValue, setCommentValue] = useState(comment ?? "");
  return (
    <>
      {comment && !editable && (
        <p className="text-xs text-txt-3 pb-2 font-italic">{comment}</p>
      )}

      {tags && !editable && (
        <div className="flex gap-1 text-xs text-txt-2 pb-2">
          {tags.map((tag) => (
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
              {tags?.map((tag) => (
                <span
                  className="pl-1  bg-primary-50 text-primary-900 rounded-lg flex items-cente gap-2 "
                  key={tag.id}
                >
                  {tag.name}{" "}
                  <i className="bg-rose-500 cursor-pointer text-white rounded-r-lg px-2 text-center block">
                    x
                  </i>
                </span>
              ))}
              <button className="px-2  bg-primary-50 text-primary-900 rounded-lg flex items-cente gap-2 ">
                +
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button className="btn ">cancel</button>
            <button className="btn btn-primary">save</button>
          </div>
        </div>
      )}
    </>
  );
};
