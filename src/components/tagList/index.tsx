import SideBarList from "../sideBar/list";

const TagList = () => {
  const arr = new Array(13).fill({ label: "12" });
  return <SideBarList title="tags" list={arr}></SideBarList>;
};

export default TagList;
