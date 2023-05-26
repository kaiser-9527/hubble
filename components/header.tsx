import Image from "next/image"

import HeaderActions from "./header-actions"

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

        <HeaderActions />
      </div>
    </header>
  )
}
