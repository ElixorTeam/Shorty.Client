import { Avatar, AvatarFallback } from '@repo/ui/avatar'

import { UrlAvatar } from './url-avatar'

export function LinkAvatar({
  link,
  ...props
}: { link: { title: string; urls: URL[] } } & React.ComponentProps<
  typeof Avatar
>) {
  if (link.urls.length === 1 && link.urls[0])
    return <UrlAvatar url={link.urls[0]} {...props} />
  return (
    <Avatar {...props}>
      <AvatarFallback>{link.urls.length}</AvatarFallback>
    </Avatar>
  )
}
