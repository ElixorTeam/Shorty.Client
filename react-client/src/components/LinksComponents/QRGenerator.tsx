'use client'

import { useQRCode } from 'next-qrcode'
import { useRef } from 'react'
import {
  ArrowDownTrayIcon,
  DocumentDuplicateIcon
} from '@heroicons/react/24/outline'
import LinkShare from '@/components/LinksComponents/LinkShare'
import IconButton from '@/components/Common/IconButton'
import toast from 'react-hot-toast'

const QR_GENERATOR_OPTIONS = {
  width: 150,
  margin: 2
}
export default function QRGenerator({ hrefLink }: { hrefLink: string }) {
  const { Canvas } = useQRCode()
  const qrCodeContainerRef = useRef<HTMLDivElement>(null)

  const getCanvas = () => {
    return qrCodeContainerRef.current?.querySelector(
      'canvas'
    ) as HTMLCanvasElement | null
  }

  const handleDownloadQRCode = () => {
    const canvas = getCanvas()
    if (!canvas) return
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = image
    link.click()
  }

  const handleCopyQRCode = () => {
    const canvas = getCanvas()
    if (!canvas) return
    canvas.toBlob(blob => {
      if (typeof navigator.clipboard.write === 'function') {
        navigator.clipboard
          .write([new ClipboardItem({ 'image/png': blob as Blob })])
          .then()
        toast('QR Code copied')
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="overflow-hidden rounded-xl" ref={qrCodeContainerRef}>
        <Canvas text={hrefLink} options={QR_GENERATOR_OPTIONS} />
      </div>
      <div className="flex gap-1">
        <IconButton onClick={handleDownloadQRCode}>
          <ArrowDownTrayIcon className="h-5 w-5 text-neutral-500" />
        </IconButton>
        <IconButton onClick={handleCopyQRCode}>
          <DocumentDuplicateIcon className="h-5 w-5 text-neutral-500" />
        </IconButton>
        <LinkShare shareLink={hrefLink} />
      </div>
    </div>
  )
}
