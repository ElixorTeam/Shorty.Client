import QRGenerator from '@/components/Viewer/QRGenerator'
import ViewsLineChart from '@/components/Charts/ViewsLineChart'
import BrowserDoughnutChart from '@/components/Charts/BrowserDoghnutChart'
import ViewerDescription from '@/components/Viewer/ViewerDescription'
import { ReactNode } from 'react'
import LinkStats from '@/components/Viewer/LinkStats'
import ViewerCloseButton from '@/components/Viewer/ViewerCloseButton'
import { useTranslations } from 'next-intl'

function LinkStickerBoardItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center rounded-2xl bg-white shadow-2xl dark:bg-[#23212e] md:block md:w-fit">
      {children}
    </div>
  )
}

export default function Viewer() {
  const t = useTranslations('app')
  const linkDetailTranslation = {
    windowDate: t('windowDate'),
    windowQR: t('windowQR'),
    toastSuccess: t('toastSuccess'),
    toastLoading: t('toastLoading'),
    toastError: t('toastError'),
    toastURLCopied: t('toastURLCopied')
  }
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
        <p className="line-clamp-1 text-lg font-bold ">{t('windowTitle')}</p>
        <ViewerCloseButton />
      </div>
      <div className="m-auto flex max-w-7xl flex-wrap justify-center gap-4 bg-[#eef1f6] p-2 dark:bg-[#1c1a25] sm:p-6 sm:pt-0 min-[640px]:bg-transparent">
        <div className="w-full max-w-2xl rounded-2xl bg-white px-4 py-2 shadow-lg dark:bg-[#23212e] md:px-10 md:py-6">
          <ViewerDescription translate={linkDetailTranslation} />
        </div>
        <LinkStickerBoardItem>
          <div className="m-4 h-52 w-48">
            <QRGenerator
              toastMsg={t('toastQRCodeCopied')}
              toastError={t('toastErrorQR')}
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
            <ViewsLineChart data={lineChartData} labels={lineChartLabels} />
          </div>
        </LinkStickerBoardItem>
      </div>
    </>
  )
}
