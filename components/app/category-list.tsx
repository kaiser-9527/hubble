import { ScrollArea } from "../ui/scroll-area"

interface Item {
  label: string
  icon?: string
  searchKeyword?: string
  extral?: React.ReactNode
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  list: Item[]
  displayTotal?: boolean
}

function CategoryListItem({ data }: { data: Item }) {
  const handleItemClick = () => {
    console.log("click")
  }
  return (
    <li
      onClick={handleItemClick}
      className="hover:bg-primary-900/20 hover:text-primary-400 flex cursor-pointer justify-between rounded-md p-2"
    >
      <span>{data.label}</span>
      {data.extral && <span>{data.extral}</span>}
    </li>
  )
}

export default function CategoryList({
  title,
  list,
  displayTotal,
  className,
}: Props) {
  return (
    <div className={`box flex flex-col overflow-hidden ${className}`}>
      {title && (
        <h5 className="text-txt-2 mb-4">
          {title}
          {displayTotal && (
            <span className="ml-1 text-sm text-muted-foreground">
              ({list.length})
            </span>
          )}
        </h5>
      )}
      <ScrollArea asChild className="w-full flex-1 rounded-md border p-4">
        <ul>
          {list.map((item) => (
            <CategoryListItem key={item.label} data={item} />
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}
