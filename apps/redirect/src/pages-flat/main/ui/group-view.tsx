import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'
import { Logo } from '@repo/ui/logo'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export function GroupRecordView({ urls }: { urls: string[] }) {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex w-full max-w-xs flex-col items-center justify-center gap-2 overflow-hidden">
        <div className="flex flex-col items-center text-center">
          <Logo stroke="currentColor" className="w-18 stroke-[0.05]" />
          <span className="text-muted-foreground mx-auto text-xs">
            Choose a desired link
          </span>
        </div>
        <ul className="flex w-full max-w-3xs flex-col divide-y overflow-hidden py-2">
          {urls.map((url, index) => (
            <li
              key={`url-${index.toString()}`}
              className="after:bg-border mb-1 w-full pb-1"
            >
              <Button asChild variant="ghost" className="w-full">
                <Link href={url}>
                  <Avatar className="mr-1 size-5 rounded-none">
                    <AvatarImage
                      src={`http://www.google.com/s2/favicons?domain=${url}`}
                      alt="avatar"
                    />
                    <AvatarFallback>{new URL(url).hostname[0]}</AvatarFallback>
                  </Avatar>
                  <span className="truncate">{new URL(url).hostname}</span>
                  <Button
                    asChild
                    size="icon"
                    variant="outline"
                    className="ml-auto size-6"
                  >
                    <span>
                      <ArrowLeft />
                    </span>
                  </Button>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
