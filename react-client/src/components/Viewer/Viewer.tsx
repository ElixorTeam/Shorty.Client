import { useTranslations } from 'next-intl'
import { ReactNode } from 'react'

import BrowserDoughnutChart from '@/components/Charts/BrowserDoghnutChart'
import DeviceDoughnutChart from '@/components/Charts/DeviceDoghnutChart'
import OsDoughnutChart from '@/components/Charts/OsDoghnutChart'
import ViewsLineChart from '@/components/Charts/ViewsLineChart'
import LinkStats from '@/components/Viewer/LinkStats'
import QRGenerator from '@/components/Viewer/QRGenerator'
import ViewerBlock from '@/components/Viewer/ViewerBlock'
import ViewerCloseButton from '@/components/Viewer/ViewerCloseButton'
import ViewerDescription from '@/components/Viewer/ViewerDescription'

function DoughnutWrapper({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-2 md:w-56">
      <p className="absolute bottom-2 right-2 text-gray-400 dark:text-gray-500">
        {title}
      </p>
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
    toastTitleError: t('toastTitleError'),
    toastURLCopied: t('toastURLCopied'),
    errorLinkNotExists: t('errorLinkNotExists'),
  }
  const statTranslation = {
    statUnique: t('statUnique'),
    statTotal: t('statTotal'),
    statAverage: t('statAverage'),
  }
  return (
    <>
      <div className="sticky flex h-16 w-full items-center justify-between bg-white px-6 shadow-md dark:bg-[#23212e] sm:hidden">
        <p className="line-clamp-1 text-lg font-bold ">{t('windowTitle')}</p>
        <ViewerCloseButton />
      </div>
      <div className="m-auto flex max-w-7xl flex-wrap justify-center gap-4 bg-[#eef1f6] p-2 dark:bg-[#1c1a25] sm:p-6 sm:pt-0 min-[640px]:bg-transparent">
        <div className="h-60 w-full max-w-2xl rounded-2xl bg-white px-4 py-2 shadow-lg dark:bg-[#23212e] md:px-10 md:py-6">
          <ViewerDescription translate={linkDetailTranslation} />
        </div>
        <ViewerBlock>
          <div className="h-full w-56">
            <QRGenerator
              toastMsg={t('toastQRCodeCopied')}
              toastError={t('toastQRError')}
            />
          </div>
        </ViewerBlock>
        <ViewerBlock>
          <div className="h-full w-56">
            <LinkStats translate={statTranslation} />
          </div>
        </ViewerBlock>
        <ViewerBlock>
          <DoughnutWrapper title={t('viewerDoughnutBrowsers')}>
            <BrowserDoughnutChart noDataMsg={t('viewerDoughnutNoData')} />
          </DoughnutWrapper>
        </ViewerBlock>
        <ViewerBlock>
          <DoughnutWrapper title={t('viewerDoughnutOS')}>
            <OsDoughnutChart noDataMsg={t('viewerDoughnutNoData')} />
          </DoughnutWrapper>
        </ViewerBlock>
        <ViewerBlock>
          <DoughnutWrapper title={t('viewerDoughnutDevices')}>
            <DeviceDoughnutChart noDataMsg={t('viewerDoughnutNoData')} />
          </DoughnutWrapper>
        </ViewerBlock>
        <ViewerBlock>
          <div className="relative flex h-full w-full items-center justify-center p-2 sm:w-96">
            <p className="absolute bottom-2 right-2 text-gray-400 dark:text-gray-500">
              {t('viewerWeekViews')}
            </p>
            <ViewsLineChart />
          </div>
        </ViewerBlock>
      </div>
    </>
  )
}
