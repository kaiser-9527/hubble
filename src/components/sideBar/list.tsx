import React, { useContext } from "react";
import { RepoContext } from "../context/repo";

interface Props {
  searchPrefix?: string;
  title?: string;
  list: Array<{
    label: string;
    extral?: React.ReactNode;
  }>;
  className?: string;
}
const SideBarList: React.FC<Props> = ({
  title,
  list,
  searchPrefix,
  className,
}) => {
  const { search } = useContext(RepoContext);

  const handleLiClick = (label: string) => {
    search(`#${searchPrefix ?? ""}${label}#`);
  };

  const renderList = () => {
    if (list.length) {
      return list.map((item, i) => (
        <li
          onClick={() => handleLiClick(item.label)}
          className="px-2 py-2 text-xs rounded hover:bg-primary-900/20 hover:text-primary-400 cursor-pointer flex justify-between"
          key={i}
        >
          <span>{item.label}</span>
          {item.extral && <span>{item.extral}</span>}
        </li>
      ));
    }

    return <li className="text-txt-4 text-sm">Empty</li>;
  };
  return (
    <div className={`flex flex-col overflow-hidden box ${className}`}>
      {title && <h5 className="mb-4 text-txt-2">{title}</h5>}
      <ul className="flex-1 overflow-y-auto scroll-bar">{renderList()}</ul>
    </div>
  );
};
export default SideBarList;
