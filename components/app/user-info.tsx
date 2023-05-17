import Image from "next/image"

import { Box } from "../ui/box"

export default function UserInfo() {
  return (
    <Box className="flex flex-col items-center gap-2">
      {/* <Image
        className="rounded-full"
        alt="kaiser"
        width={66}
        height={66}
        src={user?.user_metadata.avatar_url}
      />
      <h3>{user?.user_metadata.name || user?.email}</h3> */}
      user info
    </Box>
  )
}
