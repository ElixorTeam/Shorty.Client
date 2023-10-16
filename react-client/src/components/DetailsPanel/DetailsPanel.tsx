import { CameraIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import InputTextWithCopy from '@/components/Common/InputTextWithCopy'
import PanelTagInput from '@/components/DetailsPanel/PanelTagInput'
import PanelTitleInput from '@/components/DetailsPanel/PanelTitleInput'
import DeleteLinkDialog from '@/components/Dialogs/DeleteLinkDialog'
import QRCodeDialog from '@/components/Dialogs/QRCodeDialog'
import ShareLinkMenu from '@/components/Dialogs/ShareLinkMenu'
import avatar_artyom from '@/public/avatar_artyom.jpg'

export default function DetailsPanel() {
  const buttons = [
    { id: 1, button: <QRCodeDialog linkUrl="https://sh0.su/f1fav" /> },
    { id: 2, button: <ShareLinkMenu linkUrl="https://sh0.su/f1fav" /> },
    { id: 3, button: <DeleteLinkDialog linkUid="1" /> },
  ]
  return (
    <div className="h-full w-full pt-5">
      <div className="flex w-full flex-col items-center gap-2">
        <div className="group relative h-24 w-24 overflow-hidden rounded-full">
          <Image
            src={avatar_artyom.src}
            width={avatar_artyom.width}
            height={avatar_artyom.height}
            alt=""
            className="h-full w-full"
          />
          <button
            type="button"
            className="invisible absolute inset-0 flex h-full w-full items-center justify-center bg-white/[.7] group-hover:visible"
          >
            <CameraIcon className="h-10 w-10 stroke-1" />
          </button>
        </div>
        <PanelTitleInput title="Channel Elixor" />
        <PanelTagInput tag="Youtube" />
      </div>
      <ul className="mt-4 flex flex-row items-center justify-center gap-5">
        {buttons.map((item) => (
          <li key={item.id}>{item.button}</li>
        ))}
      </ul>
      <div className="mt-4 flex w-full items-center justify-center px-4">
        <div className="flex w-full max-w-sm flex-col gap-4">
          <InputTextWithCopy
            id="shortedVersion"
            value="https://www.sh0.su/fX6bg"
            label="Link"
          />
          <InputTextWithCopy
            id="originalVersion"
            value="https://www.youtube.com/c/Ap73MKa"
            label="Original"
          />
        </div>
      </div>
    </div>
  )
}
