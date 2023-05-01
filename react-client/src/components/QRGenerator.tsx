'use client'
import { useQRCode } from 'next-qrcode'

const QR_GENERATOR_OPTIONS = {
  margin: 3,
  width: 200
}

export default function QRGenerator({ hrefLink }: { hrefLink: string }) {
  const { Canvas } = useQRCode()
  return (
    <div className="cursor-pointer overflow-hidden rounded-xl">
      <Canvas text={hrefLink} options={QR_GENERATOR_OPTIONS} />
    </div>
  )
}
