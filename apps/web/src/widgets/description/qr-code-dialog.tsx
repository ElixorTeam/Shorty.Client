'use client'

import { Button } from '@repo/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/drawer'
import { toast } from 'sonner'
import { saveAs } from 'file-saver'
import { useQRCode } from 'next-qrcode'
import { ReactNode, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

export default function QrCodeDialog({
  link,
  children,
}: {
  link: string
  children: ReactNode
}) {
  const { Canvas } = useQRCode()
  const [open, setOpen] = useState<boolean>(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
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
        .then(() => toast({ title: 'Successfully copied' }))
        .catch(() =>
          toast({
            title: 'Error copying',
            description: 'Your browser does not allow copying to the clipboard',
            variant: 'destructive',
          })
        )
    })
  }

  if (isDesktop)
    return (
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value)
        }}
      >
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
    <Drawer
      open={open}
      onOpenChange={(value) => {
        setOpen(value)
      }}
    >
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="sm:text-center">
          <DrawerTitle>QR Code</DrawerTitle>
          <DrawerDescription>
            You can easily generate qr code for your short url
          </DrawerDescription>
        </DrawerHeader>
        <div
          className="mx-auto my-2 overflow-hidden rounded-md border"
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
          <Button onClick={copyQRCode} variant="outline">
            Copy
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
