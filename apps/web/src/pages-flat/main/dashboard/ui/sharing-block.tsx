import QrCodeCard from './qr-code-card'
import SocialShareCard from './social-share-card'

export default function SharingBlock() {
  return (
    <div className="flex flex-col gap-4">
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-1 @4xl/main:grid-cols-2 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t lg:px-6">
        <QrCodeCard />
        <SocialShareCard />
      </div>
    </div>
  )
}
