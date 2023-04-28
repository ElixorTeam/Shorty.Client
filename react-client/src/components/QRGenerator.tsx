'use client'
import { useQRCode } from 'next-qrcode'

export default function QRGenerator({
  translate,
  hrefLink
}: {
  translate: { [key: string]: string }
  hrefLink: string
}) {
  const { Canvas } = useQRCode()
  return (
    <div className="overflow-hidden rounded-xl">
      <Canvas
        text={hrefLink}
        options={{
          margin: 3,
          width: 200,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        }}
      />
    </div>
  )
}
