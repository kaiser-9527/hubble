interface Props {
  children?: React.ReactNode;
}
const SideBar: React.FC<Props> = ({ children }) => {
  return (
    <aside className="w-60 gap-2 shrink-0 flex flex-col">{children}</aside>
  );
};

export default SideBar;
