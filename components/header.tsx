import Image from "next/image"
import Link from "next/link"
import { Github } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"

export default function Header() {
  // TODO user avatar
  return (
    <header>
      <div className="h-15 container mx-auto flex items-center justify-between py-2">
        <Image
          src="/images/logo.svg"
          alt="hubble"
          className="h-full"
          height={44}
          width={99}
        />

        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/kaiser-9527/hubble"
            target="_blank"
            className={buttonVariants({ variant: "ghost", size: "sm" })}
          >
            <Github />
          </Link>
        </div>
      </div>
    </header>
  )
}
