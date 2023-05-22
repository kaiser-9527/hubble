import { DownloadCloud } from "lucide-react"

import { useStore } from "./store-provider"

export default function AppLoading() {
  const { loadingCount } = useStore()
  if (loadingCount < 1) {
    return null
  }
  return (
    <div className="fixed left-0 top-0 z-10 h-screen  w-screen backdrop-blur">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <DownloadCloud size={100} className="animate-bounce" />
        <span>Loading...</span>
      </div>
    </div>
  )
}
