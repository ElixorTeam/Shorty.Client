'use client'

import { QRCodeCanvas } from 'qrcode.react'

export function QrcodeExample() {
  return (
    <div className="overflow-hidden rounded-lg border bg-white p-5">
      <QRCodeCanvas value="elixor-shorty" size={150} />
    </div>
  )
}
