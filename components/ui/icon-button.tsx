import { ReactNode } from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { Button, ButtonProps } from "./button"

interface Props extends ButtonProps {}

export function IconButton({ children, size, className, ...props }: Props) {
  const sizeClassNames = {
    lg: "h-10 w-10",
    default: "h-9 w-9",
    sm: "h-7 w-7",
  }

  const sizeClassName = size ? sizeClassNames[size] : ""

  return (
    <Button {...props} className={cn(className, "p-0", sizeClassName)}>
      {children}
    </Button>
  )
}
