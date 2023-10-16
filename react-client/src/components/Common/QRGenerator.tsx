'use client'

import { useQRCode } from 'next-qrcode'

export default function QRGenerator({ text }: { text: string }) {
  const { Canvas } = useQRCode()

  return (
    <Canvas
      text={text}
      options={{
        errorCorrectionLevel: 'M',
        margin: 4,
        scale: 4,
        width: 200,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      }}
    />
  )
}
