import clsx from 'clsx'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setSelectedLink } from '@/redux/Slices/selectedLinkSlice'
import { convertDate } from '@/shared/convertDate'
import { LinkRecordType } from '@/shared/LinkRecordType'

export default function NavigationListItem({
  linkData,
}: {
  linkData: LinkRecordType
}) {
  const dispatch = useAppDispatch()
  const selectedLink = useAppSelector((state) => state.selectedLink.selected)
  return (
    <button
      type="button"
      className={clsx(
        selectedLink?.uid === linkData.uid && 'bg-sky-200 dark:bg-[#282834]',
        'flex h-24 w-full items-center px-5 text-left transition-colors ease-linear md:px-10'
      )}
      onClick={() => dispatch(setSelectedLink(linkData))}
    >
      <div className="linkContainer grid w-full gap-1">
        <p className="linkHeader line-clamp-1 font-semibold">
          {linkData.title}
        </p>
        <div className="linkBody flex w-40 justify-between">
          <p className="line-clamp-2 text-xs text-gray-600">
            {linkData.externalRef}
          </p>
        </div>
        <p className="linkDate self-center text-xs">
          {convertDate(linkData.createDt)}
        </p>
      </div>
    </button>
  )
}
