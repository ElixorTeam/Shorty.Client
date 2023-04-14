import { LinkRecordType } from '@/shared/LinkRecordType'
import { PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/solid'
import convertDate from '@/shared/converDate'
import LinkGenerator from '@/components/LinkGenerator'

export default function LinkDescription({
  translate,
  linkData,
  hideLink
}: {
  translate: { [key: string]: string }
  linkData: LinkRecordType
  hideLink: () => void
}) {
  const data = linkData
  return (
    <>
      <div className="sticky flex h-16 w-full items-center justify-between bg-white px-6 shadow-[0px_8px_10px_0px_rgba(0,0,0,0.05)] dark:bg-[#23212e] dark:shadow-[0px_8px_10px_0px_rgba(0,0,0,0.1)] sm:hidden">
        <p className="text-lg font-bold">{translate['windowTitle']}</p>
        <button type="button" onClick={hideLink}>
          <XMarkIcon className="h-6 w-6 dark:text-white" />
        </button>
      </div>
      <div className="h-[calc(100%-64px)] bg-white px-4 py-8 dark:bg-[#23212e] sm:h-full sm:rounded-xl md:px-16">
        <div className="flex flex-row items-center justify-between">
          <p className="text-4xl font-bold">{data.title}</p>
          <div className="flex flex-row items-center space-x-4">
            <button
              type="button"
              className="transition hover:scale-105 active:scale-95"
            >
              <TrashIcon className="h-6 w-6 text-red-700" />
            </button>
            <button
              type="button"
              className="transition hover:scale-105 active:scale-95"
            >
              <PencilIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <p>
          {translate['windowDate']} {convertDate(data.createDt)}
        </p>
        <a href={data.ref} className="pt-5 text-2xl font-bold text-blue-400">
          {data.ref}
        </a>
        <LinkGenerator translate={translate} hrefLink={data.ref} />
      </div>
    </>
  )
}
