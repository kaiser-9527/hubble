import Image from "next/image"

import { useSupabase } from "../supabase-provider"
import { Box } from "../ui/box"
import { Skeleton } from "../ui/skeleton"
import { useStore } from "./store-provider"

export default function UserInfo() {
  const { user } = useSupabase()
  return (
    <Box className="flex flex-col items-center gap-2">
      {user ? (
        <>
          <Image
            className="rounded-full"
            alt="kaiser"
            width={66}
            height={66}
            src={user?.user_metadata.avatar_url}
          />
          <h3>{user?.user_metadata.name || user?.email}</h3>
        </>
      ) : (
        <>
          <Skeleton className="h-[66px] w-[66px] rounded-full" />
          <Skeleton className="h-[40px] w-[100px] rounded-md" />
        </>
      )}
    </Box>
  )
}
