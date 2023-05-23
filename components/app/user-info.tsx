import { useMemo } from "react"
import Image from "next/image"

import { useSupabase } from "../supabase-provider"
import { Box } from "../ui/box"
import { Skeleton } from "../ui/skeleton"

export default function UserInfo() {
  const { user } = useSupabase()

  const userNameOrEmail = useMemo(() => {
    return user?.user_metadata.name || user?.email
  }, [user])

  return (
    <Box className="group flex flex-col items-center gap-2">
      {user ? (
        <>
          <div className="relative p-2 ">
            <Image
              className="relative z-[2] rounded-full"
              alt="kaiser"
              width={66}
              height={66}
              src={user?.user_metadata.avatar_url}
            />
            <Image
              className="absolute inset-0 z-[1] m-auto h-2 w-2 rounded-full opacity-0 blur-xl transition-all duration-1000 group-hover:h-24 group-hover:w-24 group-hover:opacity-100"
              src={`https://avatar.vercel.sh/${userNameOrEmail}?size=60`}
              width={60}
              height={60}
              alt={user?.user_metadata.name || user?.email}
            />
          </div>
          <h3>{userNameOrEmail}</h3>
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
