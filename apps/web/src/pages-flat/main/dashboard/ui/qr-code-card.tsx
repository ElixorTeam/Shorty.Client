'use client'

import { Button } from '@repo/ui/button'
import { Card, CardContent } from '@repo/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { Skeleton } from '@repo/ui/skeleton'
import { saveAs } from 'file-saver'
import { ClipboardCopyIcon, DownloadIcon } from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import { useRef, useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import { toast } from 'sonner'

import { useLinkUidContext } from '../../models/link-uid-context'
import useGetShortLink from '../models/use-get-short-link'

export default function QrCodeCard() {
  const linkUid = useLinkUidContext()
  const shortLink = useGetShortLink({ linkUid })
  const [mainColorValue, setMainColorValue] = useState<string>('#000')
  const [mainColorOpen, setMainColorOpen] = useState<boolean>(false)

  const [bgColorValue, setBgColorValue] = useState<string>('#fff')
  const [bgColorOpen, setBgColorOpen] = useState<boolean>(false)
  const qrcodeContainerRef = useRef<HTMLDivElement>(null)

  const downloadQRCode = () => {
    const canvas = qrcodeContainerRef.current?.querySelector('canvas')
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (blob) saveAs(blob, 'qrcode.png')
    })
  }

  const copyQRCode = () => {
    const canvas = qrcodeContainerRef.current?.querySelector('canvas')
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (!blob) return
      navigator.clipboard
        .write([new ClipboardItem({ 'image/png': blob })])
        .then(() => toast('Successfully copied'))
        .catch(() =>
          toast('Error copying', {
            description: 'Your browser does not allow copying to the clipboard',
          })
        )
    })
  }

  return (
    <Card ref={qrcodeContainerRef}>
      <CardContent className="flex flex-col gap-6 sm:flex-row">
        <div className="mx-auto w-fit sm:mx-0">
          {!shortLink ? (
            <Skeleton className="size-[162px] border" />
          ) : (
            <div className="rounded-md border bg-white p-4">
              <QRCodeCanvas
                value={shortLink}
                size={128}
                bgColor={bgColorValue}
                fgColor={mainColorValue}
              />
            </div>
          )}
        </div>
        <div className="flex w-full flex-col justify-center gap-2 overflow-hidden">
          <div className="flex flex-col">
            <h3 className="text-muted-foreground text-sm">Content</h3>
            {!shortLink ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <span>{shortLink}</span>
            )}
          </div>
          <div className="flex w-full gap-6 overflow-hidden">
            <div className="flex w-1/2 flex-col overflow-hidden">
              <p className="text-muted-foreground truncate text-sm">
                Main color
              </p>
              <Popover onOpenChange={setMainColorOpen} open={mainColorOpen}>
                <PopoverTrigger asChild>
                  <Button
                    onClick={() => {
                      setMainColorOpen(true)
                    }}
                    variant="outline"
                    size="sm"
                    className="h-7"
                    style={{ backgroundColor: mainColorValue }}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-full">
                  <HexColorPicker
                    color={mainColorValue}
                    onChange={setMainColorValue}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex w-1/2 flex-col overflow-hidden">
              <p className="text-muted-foreground truncate text-sm">
                Background color
              </p>
              <Popover onOpenChange={setBgColorOpen} open={bgColorOpen}>
                <PopoverTrigger asChild>
                  <Button
                    onClick={() => {
                      setBgColorOpen(true)
                    }}
                    variant="outline"
                    size="sm"
                    className="h-7"
                    style={{ backgroundColor: bgColorValue }}
                  />
                </PopoverTrigger>
                <PopoverContent className="w-full">
                  <HexColorPicker
                    color={bgColorValue}
                    onChange={setBgColorValue}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mt-3 flex justify-center gap-4">
            <Button onClick={downloadQRCode} variant="outline" size="sm">
              <DownloadIcon />
              Download
            </Button>
            <Button onClick={copyQRCode} variant="outline" size="sm">
              <ClipboardCopyIcon />
              Copy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
