'use client'

import { Card, CardContent, CardHeader } from '@repo/ui/card'
import { Skeleton } from '@repo/ui/skeleton'
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

import { useGetLinkUrl } from '@/entities/link'

export function SocialShareCard({ linkUid }: { linkUid: string }) {
  const { url } = useGetLinkUrl(linkUid)
  const urlString = url?.toString() ?? ''
  return (
    <Card className="gap-2">
      <CardHeader>
        <p className="text-muted-foreground text-sm">Share in social media</p>
      </CardHeader>
      <CardContent className="flex size-full flex-wrap justify-center gap-2">
        {!url ? (
          Array.from({ length: 11 }).map((_, index) => (
            <Skeleton key={index} className="size-12 rounded-full" />
          ))
        ) : (
          <>
            <FacebookShareButton
              url={urlString}
              className="transition-opacity hover:cursor-pointer hover:opacity-60"
            >
              <FacebookIcon size={48} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={urlString}
              className="transition-opacity hover:cursor-pointer hover:opacity-60"
            >
              <XIcon size={48} round />
            </TwitterShareButton>
            <TelegramShareButton
              url={urlString}
              className="transition-opacity hover:cursor-pointer hover:opacity-60"
            >
              <TelegramIcon size={48} round />
            </TelegramShareButton>
            <WhatsappShareButton
              url={urlString}
              className="transition-opacity hover:cursor-pointer hover:opacity-60"
            >
              <WhatsappIcon size={48} round />
            </WhatsappShareButton>
            <PinterestShareButton
              url={urlString}
              media={urlString}
              className="transition-opacity hover:cursor-pointer hover:opacity-60"
            >
              <PinterestIcon size={48} round />
            </PinterestShareButton>
            <VKShareButton
              url={urlString}
              className="transition-opacity hover:cursor-pointer hover:opacity-60"
            >
              <VKIcon size={48} round />
            </VKShareButton>
            <OKShareButton
              url={urlString}
              className="transition-opacity hover:cursor-pointer hover:opacity-60"
            >
              <OKIcon size={48} round />
            </OKShareButton>
            <RedditShareButton
              url={urlString}
              className="transition-opacity hover:cursor-pointer hover:opacity-60"
            >
              <RedditIcon size={48} round />
            </RedditShareButton>
            <MailruShareButton
              url={urlString}
              className="transition-opacity hover:cursor-pointer hover:opacity-60"
            >
              <MailruIcon size={48} round />
            </MailruShareButton>
            <EmailShareButton
              url={urlString}
              body="body"
              className="transition-opacity hover:cursor-pointer hover:opacity-60"
            >
              <EmailIcon size={48} round />
            </EmailShareButton>
            <ViberShareButton
              url={urlString}
              className="transition-opacity hover:cursor-pointer hover:opacity-60"
            >
              <ViberIcon size={48} round />
            </ViberShareButton>
          </>
        )}
      </CardContent>
    </Card>
  )
}
