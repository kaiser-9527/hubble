import { useEffect, useState } from "react";
import PubSub from "pubsub-js";
import db from "~/utils/db";
import { GH_REPO_UPDATE } from "~/constants/pubEvent";

export default () => {
  const [languageMap, setLanguageMap] = useState<Record<string, number>>({});

  const getLangMap = () => {
    db.getLangMap().then(setLanguageMap);
  };
  useEffect(() => {
    getLangMap();
    const subToken = PubSub.subscribe(GH_REPO_UPDATE, getLangMap);
    return () => {
      PubSub.unsubscribe(subToken);
    };
  }, []);

  return languageMap;
};
