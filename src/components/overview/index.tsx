import { useMemo } from "react";
import useOverview from "~/hooks/useOverview";
import SideBarList from "../sideBar/list";

const OverView = () => {
  const overview = useOverview();
  const list = useMemo(() => {
    return [
      {
        label: "total",
        extral: overview.total,
      },
      {
        label: "pure",
        extral: overview.pure,
      },
    ];
  }, [overview]);
  return (
    <SideBarList
      title="Overview"
      className="shrink-0"
      list={list}
    ></SideBarList>
  );
};

export default OverView;
