"use client"

import Image from "next/image"

import { useTheme } from "@/components/theme-provider"

export default function ScreenShotPic() {
  const { theme } = useTheme()
  return (
    <Image
      src={`/images/screen-shot-${theme === "dark" ? "dark" : "light"}.png`}
      alt="hubble screen shot"
      height="577"
      width="1049"
      className="mx-auto rounded-md border shadow"
    />
  )
}
