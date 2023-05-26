import { useRouter } from "next/navigation"
import { DownloadCloud, LogOut, MoonStarIcon, SunIcon } from "lucide-react"

import { useSupabase } from "../supabase-provider"
import { useTheme } from "../theme-provider"
import { Button } from "../ui/button"
import { useStore } from "./store-provider"

export default function AppHeader() {
  const { forceSyncAllData } = useStore()
  const { supabase } = useSupabase()
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  return (
    <header className="border-b py-2">
      <div className="container flex items-center justify-between">
        <Button
          onClick={forceSyncAllData}
          size="sm"
          variant="ghost"
          className="group"
        >
          <DownloadCloud size={18} className="group-hover:animate-pulse " />
          Fetch data
        </Button>

        <div>
          <Button
            size="sm"
            onClick={toggleTheme}
            className="group"
            variant="ghost"
          >
            {theme === "dark" ? (
              <MoonStarIcon className="group-hover:animate-spin   " size={18} />
            ) : (
              <SunIcon className="group-hover:animate-spin   " size={18} />
            )}
          </Button>
          <Button
            size="sm"
            onClick={handleSignOut}
            className="group"
            variant="ghost"
          >
            <LogOut size={18} className="group-hover:animate-pulse " />
            Sign out
          </Button>
        </div>
      </div>
    </header>
  )
}
