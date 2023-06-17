import { XMarkIcon } from '@heroicons/react/24/solid'
import { LinkRecordType } from '@/shared/LinkRecordType'
import QRGenerator from '@/components/LinksComponents/QRGenerator'
import LineChart from '@/components/Charts/LineChart'
import BrowserDoughnutChart from '@/components/Charts/BrowserDoghnutChart'
import LinkDetails from '@/components/LinksComponents/LinkDetails'
import { ReactNode } from 'react'
import LinkStats from '@/components/LinksComponents/LinkStats'
import { useAppDispatch } from '@/redux/hooks'
import { clearSelectedLink } from '@/redux/selectedLinkSlice'
import { REDIRECT_URL } from '@/shared/urls'

function LinkStickerBoardItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center rounded-2xl bg-white shadow-2xl dark:bg-[#23212e] md:block md:w-fit">
      {children}
    </div>
  )
}

export default function LinkStickerBoard({
  translate,
  linkData
}: {
  translate: { [_: string]: string }
  linkData: LinkRecordType
}) {
  const dispatch = useAppDispatch()
  const shortURL = `${REDIRECT_URL}/${linkData.innerRef}`
  const browserChartData = [
    { label: 'Chrome', value: 45 },
    { label: 'Firefox', value: 30 },
    { label: 'Safari', value: 10 },
    { label: 'Edge', value: 8 },
    { label: 'Other', value: 7 }
  ]
  const lineChartData = [100, 200, 150, 300, 250, 400, 350]
  const lineChartLabels = [
    '01.01.23',
    '02.01.23',
    '03.01.23',
    '04.01.23',
    '05.01.23',
    '06.01.23',
    '07.01.23'
  ]
  return (
    <>
      <div className="sticky flex h-16 w-full items-center justify-between bg-white px-6 shadow-md dark:bg-[#23212e] sm:hidden">
        <p className="line-clamp-1 text-lg font-bold ">
          {translate.windowTitle}
        </p>
        <button type="button" onClick={() => dispatch(clearSelectedLink)}>
          <XMarkIcon className="h-6 w-6 dark:text-white" />
        </button>
      </div>
      <div className="m-auto flex max-w-6xl flex-wrap justify-center gap-4 bg-[#eef1f6] p-2 dark:bg-[#1c1a25] sm:p-6 sm:pt-0 min-[640px]:bg-transparent">
        <div className="w-full max-w-2xl rounded-2xl bg-white px-4 py-2 shadow-lg dark:bg-[#23212e] md:px-10 md:py-6">
          <LinkDetails translate={translate} linkData={linkData} />
        </div>
        <LinkStickerBoardItem>
          <div className="m-4 h-52 w-48">
            <QRGenerator
              hrefLink={shortURL}
              toastMsg={translate.toastQRCodeCopied}
            />
          </div>
        </LinkStickerBoardItem>
        <LinkStickerBoardItem>
          <div className="m-4 h-48 w-full md:w-48">
            <BrowserDoughnutChart data={browserChartData} />
          </div>
        </LinkStickerBoardItem>
        <LinkStickerBoardItem>
          <div className="h-56 w-full md:w-56">
            <LinkStats />
          </div>
        </LinkStickerBoardItem>
        <LinkStickerBoardItem>
          <div className="m-4 h-48 w-full sm:w-96">
            <LineChart data={lineChartData} labels={lineChartLabels} />
          </div>
        </LinkStickerBoardItem>
      </div>
    </>
  )
}
