import React from "react"

import { cn } from "@/lib/utils"

import { Button, ButtonProps } from "./button"

export const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, ...props }, ref) => {
    const sizeClassNames = {
      lg: "h-10 w-10",
      default: "h-9 w-9",
      sm: "h-7 w-7",
      xs: "h-6 w-6",
    }

    const sizeClassName = size ? sizeClassNames[size] : ""

    return (
      <Button
        ref={ref}
        {...props}
        size={size}
        className={cn(className, "p-0", sizeClassName)}
      />
    )
  }
)
IconButton.displayName = "IconButton"
