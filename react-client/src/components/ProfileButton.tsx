import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'

import avatar_artyom from '@/public/avatar_artyom.jpg'

export default function ProfileButton() {
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
          <button type="button">
            <ArrowLeftOnRectangleIcon className="mt-[1px] h-4 w-4 text-gray-500 hover:text-gray-700" />
          </button>
        </div>
        <p className="text-xs text-gray-500">My account</p>
      </div>
    </div>
  )
}
