import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import IconButton from '@/components/Common/IconButton'
import avatar_artyom from '@/public/avatar_artyom.jpg'

export default function ProfileSection() {
  return (
    <div className="flex items-center justify-center gap-2">
      <div className="h-12 w-12 overflow-hidden rounded-full">
        <Image
          src={avatar_artyom.src}
          width={avatar_artyom.width}
          height={avatar_artyom.height}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div>
        <div className="flex items-center gap-1">
          <p className="font-semibold">Ap73MKa</p>
          <IconButton Icon={ArrowLeftOnRectangleIcon} className="mt-[1px]" />
        </div>
        <p className="text-xs text-gray-500">My account</p>
      </div>
    </div>
  )
}
