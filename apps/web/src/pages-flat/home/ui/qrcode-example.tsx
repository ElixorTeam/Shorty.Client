'use client'

import { useQRCode } from 'next-qrcode'

export function QrcodeExample() {
  const { Canvas } = useQRCode()
  return (
    <div className="overflow-hidden rounded-lg border">
      <Canvas
        text="https://github.com/bunlong/next-qrcode"
        options={{
          errorCorrectionLevel: 'M',
          scale: 4,
          width: 200,
        }}
      />
    </div>
  )
}
