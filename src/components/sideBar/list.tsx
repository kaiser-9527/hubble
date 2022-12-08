import React from "react";
import toast from "react-hot-toast";

interface Props {
  title?: string;
  list: Array<{
    label: string;
    extral?: React.ReactNode;
  }>;
  className?: string;
}
const SideBarList: React.FC<Props> = ({ title, list, className }) => {
  return (
    <div className={`flex flex-col overflow-hidden box ${className}`}>
      {title && <h5 className="mb-4">{title}</h5>}
      <ul className="flex-1 overflow-y-auto scroll-bar">
        {list.map((item, i) => (
          <li
            onClick={() => toast("nice")}
            className="px-2 py-2 rounded hover:bg-primary-900/20 hover:text-primary-400 cursor-pointer flex justify-between"
            key={i}
          >
            <span>{item.label}</span>
            {item.extral && <span>{item.extral}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SideBarList;
