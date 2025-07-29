'use client'

import { QRCodeCanvas } from 'qrcode.react'

export function QrcodeExample() {
  return (
    <div className="overflow-hidden rounded-lg border">
      <QRCodeCanvas value="elixor-shorty" size={128} />
    </div>
  )
}
