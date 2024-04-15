import { useSignal } from '@preact-signals/safe-react'
import { ReactNode } from 'react'
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from 'react-share'

import useMediaQuery from '@/shared/lib/use-media-query'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer'
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area'

function SocialNetworkShare({ shortUrl }: { shortUrl: string }) {
  return (
    <ScrollArea className="relative w-full whitespace-nowrap">
      <div className="mx-auto flex w-max gap-2 pb-5 pt-2">
        <FacebookShareButton
          url={shortUrl}
          className="transition-opacity hover:cursor-pointer hover:opacity-60"
        >
          <FacebookIcon size={48} round />
        </FacebookShareButton>
        <TwitterShareButton
          url={shortUrl}
          className="transition-opacity hover:cursor-pointer hover:opacity-60"
        >
          <XIcon size={48} round />
        </TwitterShareButton>
        <TelegramShareButton
          url={shortUrl}
          className="transition-opacity hover:cursor-pointer hover:opacity-60"
        >
          <TelegramIcon size={48} round />
        </TelegramShareButton>
        <WhatsappShareButton
          url={shortUrl}
          className="transition-opacity hover:cursor-pointer hover:opacity-60"
        >
          <WhatsappIcon size={48} round />
        </WhatsappShareButton>
        <PinterestShareButton
          url={shortUrl}
          media={shortUrl}
          className="transition-opacity hover:cursor-pointer hover:opacity-60"
        >
          <PinterestIcon size={48} round />
        </PinterestShareButton>
        <VKShareButton
          url={shortUrl}
          className="transition-opacity hover:cursor-pointer hover:opacity-60"
        >
          <VKIcon size={48} round />
        </VKShareButton>
        <OKShareButton
          url={shortUrl}
          className="transition-opacity hover:cursor-pointer hover:opacity-60"
        >
          <OKIcon size={48} round />
        </OKShareButton>
        <RedditShareButton
          url={shortUrl}
          className="transition-opacity hover:cursor-pointer hover:opacity-60"
        >
          <RedditIcon size={48} round />
        </RedditShareButton>
        <MailruShareButton
          url={shortUrl}
          className="transition-opacity hover:cursor-pointer hover:opacity-60"
        >
          <MailruIcon size={48} round />
        </MailruShareButton>
        <EmailShareButton
          url={shortUrl}
          body="body"
          className="transition-opacity hover:cursor-pointer hover:opacity-60"
        >
          <EmailIcon size={48} round />
        </EmailShareButton>
        <ViberShareButton
          url={shortUrl}
          className="transition-opacity hover:cursor-pointer hover:opacity-60"
        >
          <ViberIcon size={48} round />
        </ViberShareButton>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

export default function SocialShareDialog({
  shortLink,
  children,
}: {
  shortLink: string
  children: ReactNode
}) {
  const open = useSignal<boolean>(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop)
    return (
      <Dialog
        open={open.value}
        onOpenChange={(value) => {
          open.value = value
        }}
      >
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share</DialogTitle>
            <DialogDescription>
              Easily share your link between social networks
            </DialogDescription>
          </DialogHeader>
          <SocialNetworkShare shortUrl={shortLink} />
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer
      open={open.value}
      onOpenChange={(value) => {
        open.value = value
      }}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="pb-10">
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>Share</DrawerTitle>
          <DrawerDescription>
            Easily share your link between social networks
          </DrawerDescription>
        </DrawerHeader>
        <SocialNetworkShare shortUrl={shortLink} />
      </DrawerContent>
    </Drawer>
  )
}
