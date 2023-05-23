import { DownloadCloud } from "lucide-react"

import { Button } from "../ui/button"
import { useStore } from "./store-provider"

export default function AppHeader() {
  const { forceSyncAllData } = useStore()

  return (
    <header className="border-b py-2">
      <div className="container">
        <Button
          onClick={forceSyncAllData}
          size="sm"
          variant="ghost"
          className="group"
        >
          <DownloadCloud size={18} className="group-hover:animate-pulse " />
          Fetch data
        </Button>
      </div>
    </header>
  )
}
