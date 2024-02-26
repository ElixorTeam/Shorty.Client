'use client'

import { useQRCode } from 'next-qrcode'

export default function QrcodeExample() {
  const { Image } = useQRCode()
  return (
    <div className="overflow-hidden rounded-lg border">
      <Image
        text="https://elixor.sh0.su"
        options={{
          type: 'image/jpeg',
          quality: 0.3,
          errorCorrectionLevel: 'M',
          margin: 3,
          scale: 4,
          width: 200,
        }}
      />
    </div>
  )
}
