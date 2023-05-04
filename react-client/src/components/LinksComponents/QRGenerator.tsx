'use client'

import { useQRCode } from 'next-qrcode'
import { useRef } from 'react'

const QR_GENERATOR_OPTIONS = {
  margin: 3,
  width: 200
}
export default function QRGenerator({ hrefLink }: { hrefLink: string }) {
  const { Canvas } = useQRCode()
  const qrCodeContainerRef = useRef<HTMLDivElement>(null)

  const handleDownloadQRCode = () => {
    const canvas = qrCodeContainerRef.current?.querySelector(
      'canvas'
    ) as HTMLCanvasElement | null
    if (!canvas) return
    const image = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'qr-code.png'
    link.href = image
    link.click()
  }
  return (
    <button type="button" onClick={handleDownloadQRCode}>
      <div className="overflow-hidden rounded-xl" ref={qrCodeContainerRef}>
        <Canvas text={hrefLink} options={QR_GENERATOR_OPTIONS} />
      </div>
    </button>
  )
}
