import SideBarList from "../sideBar/list";

const LanguageList = () => {
  const arr = new Array(122).fill({ label: "12" });
  return <SideBarList title="languages" list={arr}></SideBarList>;
};

export default LanguageList;
