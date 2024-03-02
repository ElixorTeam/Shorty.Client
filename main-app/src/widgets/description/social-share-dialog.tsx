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

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { ScrollArea, ScrollBar } from '@/shared/ui/scroll-area'

export default function SocialShareDialog({
  shortLink,
}: {
  shortLink: string
}) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Share</DialogTitle>
        <DialogDescription>
          Easily share your link between social networks
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max gap-2 pb-4 pt-2">
          <FacebookShareButton
            url={shortLink}
            className="transition-opacity hover:cursor-pointer hover:opacity-60"
          >
            <FacebookIcon size={48} round />
          </FacebookShareButton>
          <TwitterShareButton
            url={shortLink}
            className="transition-opacity hover:cursor-pointer hover:opacity-60"
          >
            <XIcon size={48} round />
          </TwitterShareButton>
          <TelegramShareButton
            url={shortLink}
            className="transition-opacity hover:cursor-pointer hover:opacity-60"
          >
            <TelegramIcon size={48} round />
          </TelegramShareButton>
          <WhatsappShareButton
            url={shortLink}
            className="transition-opacity hover:cursor-pointer hover:opacity-60"
          >
            <WhatsappIcon size={48} round />
          </WhatsappShareButton>
          <PinterestShareButton
            url={shortLink}
            media={shortLink}
            className="transition-opacity hover:cursor-pointer hover:opacity-60"
          >
            <PinterestIcon size={48} round />
          </PinterestShareButton>
          <VKShareButton
            url={shortLink}
            className="transition-opacity hover:cursor-pointer hover:opacity-60"
          >
            <VKIcon size={48} round />
          </VKShareButton>
          <OKShareButton
            url={shortLink}
            className="transition-opacity hover:cursor-pointer hover:opacity-60"
          >
            <OKIcon size={48} round />
          </OKShareButton>
          <RedditShareButton
            url={shortLink}
            className="transition-opacity hover:cursor-pointer hover:opacity-60"
          >
            <RedditIcon size={48} round />
          </RedditShareButton>
          <MailruShareButton
            url={shortLink}
            className="transition-opacity hover:cursor-pointer hover:opacity-60"
          >
            <MailruIcon size={48} round />
          </MailruShareButton>
          <EmailShareButton
            url={shortLink}
            body="body"
            className="transition-opacity hover:cursor-pointer hover:opacity-60"
          >
            <EmailIcon size={48} round />
          </EmailShareButton>
          <ViberShareButton
            url={shortLink}
            className="transition-opacity hover:cursor-pointer hover:opacity-60"
          >
            <ViberIcon size={48} round />
          </ViberShareButton>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </DialogContent>
  )
}
