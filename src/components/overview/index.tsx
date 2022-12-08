import SideBarList from "../sideBar/list";

const OverView = () => {
  const arr = new Array(2).fill({ label: "12" });
  return (
    <SideBarList title="overview" className="shrink-0" list={arr}></SideBarList>
  );
};

export default OverView;
