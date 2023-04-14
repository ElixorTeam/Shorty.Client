'use client'
import { useQRCode } from 'next-qrcode'

export default function LinkGenerator({
  translate,
  hrefLink
}: {
  translate: { [key: string]: string }
  hrefLink: string
}) {
  const { Canvas } = useQRCode()
  return (
    <>
      <p className="pt-5 text-2xl font-bold">{translate['windowQR']}</p>
      <Canvas
        text={hrefLink}
        options={{
          level: 'M',
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: '#000000',
            light: '#FFFFFF'
          }
        }}
      />
    </>
  )
}
