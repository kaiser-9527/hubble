import { Skeleton } from "@/components/ui/skeleton"

export default function AppLoading() {
  return (
    <main className="container relative mx-auto  flex h-screen py-10">
      <aside className="flex w-60 shrink-0 flex-col gap-2">
        <Skeleton className="h-[130px] w-full rounded-md" />
        <Skeleton className="h-[130px] w-full rounded-md" />
        <Skeleton className="w-full flex-1 rounded-md" />
      </aside>
      <section className="flex flex-1 flex-col gap-4 px-4">
        <Skeleton className="mb-10 h-[80px] w-full rounded-md" />
        <Skeleton className="h-[150px] w-full rounded-md" />
        <Skeleton className="h-[150px] w-full rounded-md" />
        <Skeleton className="h-[150px] w-full rounded-md" />
        <Skeleton className="h-[150px] w-full rounded-md" />
        <Skeleton className="h-[150px] w-full rounded-md" />
      </section>

      <aside className="flex w-60 shrink-0 flex-col gap-2">
        <Skeleton className="w-full flex-1 rounded-md" />
      </aside>
    </main>
  )
}
