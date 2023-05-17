import { cn } from "@/lib/utils"

function Box({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export { Box }
