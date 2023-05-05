'use client'

import { useQRCode } from 'next-qrcode'
import { useRef } from 'react'
import {
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
  ShareIcon
} from '@heroicons/react/24/outline'
import LinkShare from "@/components/LinksComponents/LinkShare";

const QR_GENERATOR_OPTIONS = {
  margin: 2,
  width: 160
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
        navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob as Blob })
        ])
      }
    })
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="overflow-hidden rounded-xl" ref={qrCodeContainerRef}>
        <Canvas text={hrefLink} options={QR_GENERATOR_OPTIONS} />
      </div>
      <div className="flex gap-1">
        <button
          type="button"
          onClick={handleDownloadQRCode}
          className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 transition-colors ease-linear hover:bg-neutral-100 active:bg-neutral-200"
        >
          <ArrowDownTrayIcon className="h-5 w-[20px] text-neutral-500" />
        </button>
        <button
          type="button"
          onClick={handleCopyQRCode}
          className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 transition-colors ease-linear hover:bg-neutral-100 active:bg-neutral-200"
        >
          <DocumentDuplicateIcon className="h-5 w-[20px] text-neutral-500" />
        </button>
        <LinkShare shareLink={hrefLink} />
        {/*<button*/}
        {/*  type="button"*/}
        {/*  className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 transition-colors ease-linear hover:bg-neutral-100 active:bg-neutral-200"*/}
        {/*>*/}
        {/*  <ShareIcon className="h-5 w-[20px] text-neutral-500" />*/}
        {/*</button>*/}
      </div>
    </div>
  )
}
