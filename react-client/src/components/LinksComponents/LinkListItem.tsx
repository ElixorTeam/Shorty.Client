import { convertDate } from '@/shared/convertDate'
import { LinkRecordType } from '@/shared/LinkRecordType'
import './LinkListItem.css'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setSelectedLink } from '@/redux/selectedLinkSlice'

export default function LinkListItem({
  linkData
}: {
  linkData: LinkRecordType
}) {
  const dispatch = useAppDispatch()
  const selectedLink = useAppSelector(state => state.selectedLink.selected)
  return (
    <button
      type="button"
      className={`${
        selectedLink?.uid === linkData.uid ? 'bg-sky-200 dark:bg-[#282834]' : ''
      } flex h-24 w-full items-center px-5 text-left transition-colors ease-linear md:px-10`}
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
