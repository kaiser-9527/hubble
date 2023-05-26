import Link from "next/link"
import { MessageCircle, PackageSearch, Tag } from "lucide-react"

import { cn } from "@/lib/utils"
import { Box } from "@/components/ui/box"
import { buttonVariants } from "@/components/ui/button"
import Header from "@/components/header"
import ScreenShotPic from "@/components/screen-shot-pic"

export default function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-10">
        <div className="pt-10 text-center">
          <h1 className="mx-auto mb-6 max-w-4xl bg-gradient-to-r from-lime-500 via-yellow-500 to-rose-500 bg-clip-text text-3xl font-extrabold leading-none tracking-normal text-transparent sm:text-5xl md:text-5xl md:tracking-tight lg:text-6xl">
            Hubble helps you manage your <br /> GitHub star projects <br /> with
            ease and efficiency.
          </h1>
          <div className="flex items-center justify-center gap-2">
            <Link href="/app" className={cn(buttonVariants({ size: "lg" }))}>
              Try it now
            </Link>
            <Link
              href="https://www.producthunt.com/posts/hubble-8?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-hubble&#0045;8"
              target="_blank"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=372705&theme=neutral"
                alt="Hubble - Github&#0032;stars&#0032;management&#0032;tool | Product Hunt"
                width="200"
                height="44"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-4 pt-10 sm:flex-row">
          <Box className="w-full sm:max-w-[300px]">
            <span className="flex items-center gap-2 pb-4">
              <Tag size={18} />
              Tagging
            </span>
            <p className="text-muted-foreground">
              Organize your starred projects with custom tags
            </p>
          </Box>
          <Box className="w-full sm:max-w-[300px]">
            <span className="flex items-center gap-2 pb-4">
              <MessageCircle size={18} />
              Comment
            </span>
            <p className="text-muted-foreground">
              Add personal notes to your projects for quick reference
            </p>
          </Box>
          <Box className="w-full sm:max-w-[300px]">
            <span className="flex items-center gap-2 pb-4">
              <PackageSearch size={18} />
              Search
            </span>
            <p className="text-muted-foreground">
              Quickly find the projects you need with powerful filtering options
            </p>
          </Box>
        </div>
        <div className="mt-10">
          <ScreenShotPic />
        </div>
      </main>
    </>
  )
}
