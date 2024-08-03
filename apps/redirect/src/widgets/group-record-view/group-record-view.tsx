import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'

export default function GroupRecordView({ urls }: { urls: string[] }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-full max-w-sm overflow-hidden rounded-lg border p-6">
        <h1 className="text-center text-2xl font-bold">Shorty</h1>
        <ul className="flex flex-col overflow-hidden pt-4">
          {urls.map((url, index) => (
            <li key={`url-${index.toString()}`}>
              <div className="flex h-20 w-full items-center gap-4">
                <Avatar className="size-14">
                  <AvatarImage
                    src={`http://www.google.com/s2/favicons?domain=${url}`}
                    alt="avatar"
                  />
                  <AvatarFallback>{new URL(url).hostname[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="truncate font-medium">
                    {new URL(url).hostname}
                  </h3>
                  <a
                    className="text-muted-foreground truncate text-sm hover:underline"
                    href={url}
                  >
                    {url}
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
