'use client'

import { Button } from '@repo/ui/button'
import { Card, CardContent } from '@repo/ui/card'
import { Skeleton } from '@repo/ui/skeleton'
import { ClipboardCopyIcon, DownloadIcon } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

import { useGetLinkUrl } from '@/entities/link'

import { copyCanvasToClipboard, downloadCanvas } from '../lib/canvas'
import { ColorPicker } from './color-picker'

export function QrCodeCard({ linkUid }: Readonly<{ linkUid: string }>) {
  const { url } = useGetLinkUrl(linkUid)
  const qrcodeContainerRef = useRef<HTMLDivElement>(null)
  const [mainColor, setMainColor] = useState<string>('#000')
  const [bgColor, setBgColor] = useState<string>('#fff')

  const download = async () => {
    const canvas = qrcodeContainerRef.current?.querySelector('canvas')
    if (!canvas) return
    try {
      await downloadCanvas(canvas, 'qr-code.png')
    } catch {
      toast.error('Failed to download QR code')
    }
  }

  const copy = async () => {
    const canvas = qrcodeContainerRef.current?.querySelector('canvas')
    if (!canvas) return
    try {
      await copyCanvasToClipboard(canvas)
    } catch {
      toast.error('Failed to copy QR code')
    }
  }

  return (
    <Card ref={qrcodeContainerRef}>
      <CardContent className="flex flex-col gap-6 sm:flex-row">
        <div className="mx-auto w-fit sm:mx-0">
          {!url ? (
            <Skeleton className="size-[162px] border" />
          ) : (
            <div className="rounded-md border bg-white p-4">
              <QRCodeCanvas
                value={url.toString()}
                size={128}
                bgColor={bgColor}
                fgColor={mainColor}
              />
            </div>
          )}
        </div>
        <div className="flex w-full flex-col justify-center gap-2 overflow-hidden">
          <div className="flex flex-col">
            <h3 className="text-muted-foreground text-sm">Content</h3>
            {!url ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <span>{url.toString()}</span>
            )}
          </div>
          <div className="flex w-full gap-6 overflow-hidden">
            <div className="flex w-1/2 flex-col overflow-hidden">
              <p className="text-muted-foreground truncate text-sm">
                Main color
              </p>
              <ColorPicker
                value={mainColor}
                onValueChange={setMainColor}
                variant="outline"
                size="sm"
                className="h-7"
              />
            </div>
            <div className="flex w-1/2 flex-col overflow-hidden">
              <p className="text-muted-foreground truncate text-sm">
                Background color
              </p>
              <ColorPicker
                value={bgColor}
                onValueChange={setBgColor}
                variant="outline"
                size="sm"
                className="h-7"
              />
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-4">
            <Button onClick={download} variant="outline" size="sm">
              <DownloadIcon />
              Download
            </Button>
            <Button onClick={copy} variant="outline" size="sm">
              <ClipboardCopyIcon />
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
