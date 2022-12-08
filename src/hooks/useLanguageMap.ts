import { useEffect, useState } from "react";
import db from "~/utils/db";

export default () => {
  const [languageMap, setOverviewMap] = useState<Record<string, number>>({});

  useEffect(() => {
    db.getLangMap().then(setOverviewMap);
  }, []);

  return languageMap;
};
