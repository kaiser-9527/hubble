import { Ref, forwardRef } from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

import { IconButton } from "./icon-button"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  closable?: boolean
  onClick?: () => void
  onClose?: () => void
}

export const Tag = forwardRef(
  (
    { className, onClick, children, closable, onClose }: Props,
    ref: Ref<HTMLDivElement>
  ) => {
    return (
      <div
        onClick={onClick}
        className={cn(
          "inline-flex items-center gap-1 rounded-md border bg-secondary px-2 py-1 text-sm",
          className
        )}
        ref={ref}
      >
        <span>{children}</span>
        {closable && (
          <IconButton
            onClick={() => onClose?.()}
            size="xs"
            variant="ghost"
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            <X size={14} />
          </IconButton>
        )}
      </div>
    )
  }
)

Tag.displayName = "Tag"
