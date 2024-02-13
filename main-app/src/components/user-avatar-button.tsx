import { useSession } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

export default function UserAvatarButton() {
  const session = useSession()
  return (
    <button type="button" className="flex items-center gap-2">
      <span className="hidden truncate font-medium lg:block">
        {session.data?.user?.name}
      </span>
      <Avatar className="size-8">
        <AvatarImage src={session.data?.user?.image!} alt="user-avatar" />
        <AvatarFallback>{session.data?.user?.name?.charAt(0)}</AvatarFallback>
      </Avatar>
    </button>
  )
}
