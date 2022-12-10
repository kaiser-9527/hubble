import { useEffect, useState } from "react";
import { SUPA_TAG_UPDATE } from "~/constants/pubEvent";
import { SupaTag } from "~/types/repo";
import db from "~/utils/db";

export default () => {
  const [tagList, setTagList] = useState<SupaTag[]>([]);

  const getTagList = () => db.getTagList().then(setTagList);

  useEffect(() => {
    getTagList();

    const pubToken = PubSub.subscribe(SUPA_TAG_UPDATE, getTagList);
    return () => {
      PubSub.unsubscribe(pubToken);
    };
  }, []);
  return {
    tagList,
  };
};
