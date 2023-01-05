import React, { useContext } from "react";
import { RepoContext } from "../context/repo";

interface Item {
  label: string;
  icon?: string;
  searchKeyword?: string;
  extral?: React.ReactNode;
}

interface Props {
  title?: string;
  showCounts?: boolean;
  list: Array<Item>;
  hideEmpty?: boolean;
  className?: string;
}
const SideBarList: React.FC<Props> = ({
  title,
  list,
  hideEmpty,
  className,
  showCounts,
}) => {
  const { search } = useContext(RepoContext);

  const handleLiClick = (item: Item) => {
    search(item.searchKeyword ?? item.label);
  };

  const renderList = () => {
    if (list.length) {
      return list.map((item, i) => {
        if (hideEmpty && item.extral === 0) return null;
        return (
          <li
            onClick={() => handleLiClick(item)}
            className="px-2 py-2 text-sm  hover:bg-primary-900/20 hover:text-primary-400 cursor-pointer rounded-lg flex justify-between"
            key={i}
          >
            <span>
              {item.icon && <i className={item.icon}></i>}
              {item.label}
            </span>
            {item.extral && <span>{item.extral}</span>}
          </li>
        );
      });
    }

    return <li className="text-txt-4 text-sm">Empty</li>;
  };
  return (
    <div className={`flex flex-col overflow-hidden box ${className}`}>
      {title && (
        <h5 className="mb-4 text-txt-2">
          {title}
          {showCounts && (
            <span className="text-sm ml-1 text-txt-3">({list.length})</span>
          )}
        </h5>
      )}
      <ul className="flex-1 overflow-y-auto scroll-bar">{renderList()}</ul>
    </div>
  );
};
export default SideBarList;
