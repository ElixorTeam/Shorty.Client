'use client'

import FileSaver from 'file-saver'
import { useQRCode } from 'next-qrcode'
import { useRef } from 'react'

import { Button } from '@/shared/ui/button'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import { useToast } from '@/shared/ui/use-toast'

export default function QrCodeDialog({ link }: { link: string }) {
  const { Canvas } = useQRCode()
  const { toast } = useToast()
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
        })
      }
    })
  }
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>QR Code</DialogTitle>
        <DialogDescription>
          You get your qr code to easily share link
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
  )
}
