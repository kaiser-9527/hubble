import { useEffect, useState } from "react";
import { TOverView } from "~/types/common";
import db from "~/utils/db";

export default () => {
  const [overview, setOverview] = useState<TOverView>({
    total: 0,
    pure: 0,
  });

  useEffect(() => {
    db.getOverView().then(setOverview);
  }, []);

  return overview;
};
