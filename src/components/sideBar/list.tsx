interface Props {
  title?: string;
  list: Array<{
    label: string;
  }>;
  className?: string;
}
const SideBarList: React.FC<Props> = ({ title, list, className }) => {
  return (
    <div className={`flex flex-col overflow-hidden box ${className}`}>
      {title && <h5 className="mb-4">{title}</h5>}
      <ul className="flex-1 overflow-y-auto scrollbar scrollbar-rounded ">
        {list.map((item, i) => (
          <li
            className="px-2 py-2 rounded hover:bg-primary-900/20 hover:text-primary-400 cursor-pointer"
            key={i}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default SideBarList;
