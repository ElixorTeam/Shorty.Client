import { convertDate } from '@/shared/convertDate'
import { LinkRecordType } from '@/shared/LinkRecordType'
import './LinkListItem.css'

export default function LinkListItem({
  onClick,
  linkData,
  selectedUID
}: {
  onClick: () => void
  linkData: LinkRecordType
  selectedUID: string | undefined
}) {
  return (
    <button
      type="button"
      className={`${
        selectedUID
          ? `${
              selectedUID === linkData.uid
                ? 'bg-sky-200 dark:text-black'
                : 'bg-slate-100 dark:bg-[#1f1e29]'
            }`
          : 'bg-slate-100 dark:bg-[#1f1e29]'
      } flex h-24 w-full items-center px-5 text-left transition-colors ease-linear md:px-10`}
      onClick={onClick}
    >
      <div className="linkContainer grid w-full gap-1">
        <p className="linkHeader line-clamp-1 font-semibold">
          {linkData.title}
        </p>
        <div className="linkBody flex w-40 justify-between">
          <p className="line-clamp-2 text-xs text-gray-600">{linkData.ref}</p>
        </div>
        <p className="linkDate self-center text-xs">
          {convertDate(linkData.createDt)}
        </p>
      </div>
    </button>
  )
}
