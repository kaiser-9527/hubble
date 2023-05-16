import Image from "next/image"
import Link from "next/link"

export default function UserAvatar() {
  return (
    <Link href="/app">
      user avatar
      {/* <Image
        className="h-8 w-8 rounded-full"
        src={user.user_metadata.avatar_url}
        alt={user.email}
      /> */}
    </Link>
  )
}
