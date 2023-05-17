import Image from "next/image"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Header from "@/components/header"

export default function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto py-10">
        <div className="pt-32 text-center">
          <h1 className="mx-auto mb-6 max-w-5xl text-5xl font-extrabold leading-none tracking-normal sm:text-6xl md:text-6xl md:tracking-tight lg:text-7xl">
            <span className="w-full bg-gradient-to-r from-lime-500 to-[#3B82F6] bg-clip-text text-transparent lg:inline">
              Github Stars
            </span>
            <span> management</span>
            <br className="hidden lg:block" />
            <span> has never been easier</span>
          </h1>
          <h3 className="mb-6 px-0 text-lg text-muted-foreground md:text-2xl lg:px-24">
            Add tags and comment for each repo to find it easier
          </h3>
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
        <div className="mt-10">
          <Image
            src="/images/screen-shot.png"
            alt="hubble screen shot"
            height="577"
            width="1049"
            className="mx-auto rounded-md border shadow"
          />
        </div>
      </main>
    </>
  )
}
