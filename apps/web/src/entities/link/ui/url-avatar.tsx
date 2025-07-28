import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'

export function UrlAvatar({
  url,
  ...props
}: { url: URL } & React.ComponentProps<typeof Avatar>) {
  return (
    <Avatar {...props}>
      <AvatarImage
        src={`http://www.google.com/s2/favicons?domain=${url}`}
        alt="avatar"
      />
      <AvatarFallback>{url.hostname[0]}</AvatarFallback>
    </Avatar>
  )
}
