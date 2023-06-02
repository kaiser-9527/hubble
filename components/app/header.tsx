import { useRouter } from "next/navigation"
import {
  ContactIcon,
  DatabaseBackupIcon,
  DownloadCloud,
  LogOut,
  MoonStarIcon,
  StarHalfIcon,
  StarIcon,
  SunIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useSupabase } from "../supabase-provider"
import { useTheme } from "../theme-provider"
import { Button } from "../ui/button"
import { useStore } from "./store-provider"

export default function AppHeader() {
  const {
    forceSyncAllData,
    getAllGithubRepos,
    getLatestGithubRepos,
    getCustomData,
  } = useStore()
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
        <div className="flex">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost" className="group">
                <DownloadCloud size={18} />
                Fetch
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={forceSyncAllData}>
                <DatabaseBackupIcon
                  size={18}
                  className="mr-2 group-hover:animate-pulse"
                />
                All data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={getCustomData}>
                <ContactIcon
                  size={18}
                  className="mr-2 group-hover:animate-pulse"
                />
                Custom data
              </DropdownMenuItem>
              <DropdownMenuItem onClick={getAllGithubRepos}>
                <StarIcon
                  size={18}
                  className="mr-2 group-hover:animate-pulse"
                />
                All starred repos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={getLatestGithubRepos}>
                <StarHalfIcon
                  size={18}
                  className="mr-2 group-hover:animate-pulse"
                />
                Latest starred repos
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
