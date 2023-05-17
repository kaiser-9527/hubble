export default function SideBar({ children }: { children: React.ReactNode }) {
  return <aside className="flex w-60 shrink-0 flex-col gap-2">{children}</aside>
}
