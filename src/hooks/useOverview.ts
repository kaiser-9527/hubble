import { useEffect, useState } from "react";
import { GH_REPO_UPDATE, SUPA_REPO_UPDATE } from "~/constants/pubEvent";
import { TOverView } from "~/types/common";
import db from "~/utils/db";

export default () => {
  const [overview, setOverview] = useState<TOverView>({
    total: 0,
    pure: 0,
  });

  const getOverView = () => db.getOverView().then(setOverview);

  useEffect(() => {
    getOverView();

    const ghToken = PubSub.subscribe(GH_REPO_UPDATE, getOverView);
    const spToken = PubSub.subscribe(SUPA_REPO_UPDATE, getOverView);
    return () => {
      PubSub.unsubscribe(ghToken);
      PubSub.unsubscribe(spToken);
    };
  }, []);

  return overview;
};
