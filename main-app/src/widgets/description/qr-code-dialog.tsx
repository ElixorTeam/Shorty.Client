'use client'

import FileSaver from 'file-saver'
import { useQRCode } from 'next-qrcode'
import { ReactNode, useRef, useState } from 'react'

import useMediaQuery from '@/shared/lib/use-media-query'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer'
import { useToast } from '@/shared/ui/use-toast'

export default function QrCodeDialog({
  link,
  children,
}: {
  link: string
  children: ReactNode
}) {
  const { Canvas } = useQRCode()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const qrcodeContainerRef = useRef<HTMLDivElement>(null)

  const downloadQRCode = () => {
    const canvas = qrcodeContainerRef.current?.querySelector('canvas')
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (blob) FileSaver.saveAs(blob, 'qrcode.png')
    })
  }

  const copyQRCode = async () => {
    const canvas = qrcodeContainerRef.current?.querySelector('canvas')
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (!blob) return
      try {
        navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        toast({ title: 'Successfully copied' })
      } catch {
        toast({
          title: 'Error copying',
          description: 'Your browser not allow to copy to clipboard',
          variant: 'destructive',
        })
      }
    })
  }

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>QR Code</DialogTitle>
            <DialogDescription>
              You can easily generate qr code for your short url
            </DialogDescription>
          </DialogHeader>
          <div
            className="mx-auto my-6 overflow-hidden rounded-md border"
            ref={qrcodeContainerRef}
          >
            <Canvas
              text={link}
              options={{
                errorCorrectionLevel: 'M',
                margin: 3,
                scale: 4,
                width: 200,
              }}
            />
          </div>
          <DialogFooter>
            <Button onClick={downloadQRCode}>Download</Button>
            <Button onClick={copyQRCode}>Copy</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="pb-10">
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>QR Code</DrawerTitle>
          <DrawerDescription>
            You can easily generate qr code for your short url
          </DrawerDescription>
        </DrawerHeader>
        <div
          className="mx-auto my-6 overflow-hidden rounded-md border"
          ref={qrcodeContainerRef}
        >
          <Canvas
            text={link}
            options={{
              errorCorrectionLevel: 'M',
              margin: 3,
              scale: 4,
              width: 200,
            }}
          />
        </div>
        <DrawerFooter>
          <Button onClick={downloadQRCode}>Download</Button>
          <Button onClick={copyQRCode}>Copy</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
