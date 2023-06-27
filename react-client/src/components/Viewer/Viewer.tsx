import QRGenerator from '@/components/Viewer/QRGenerator'
import BrowserDoughnutChart from '@/components/Charts/BrowserDoghnutChart'
import ViewerDescription from '@/components/Viewer/ViewerDescription'
import LinkStats from '@/components/Viewer/LinkStats'
import ViewerCloseButton from '@/components/Viewer/ViewerCloseButton'
import { useTranslations } from 'next-intl'
import ViewerBlock from '@/components/Viewer/ViewerBlock'
import OsDoughnutChart from '@/components/Charts/OsDoghnutChart'
import DeviceDoughnutChart from '@/components/Charts/DeviceDoghnutChart'
import ViewsLineChart from '@/components/Charts/ViewsLineChart'

export default function Viewer() {
  const t = useTranslations('app')
  const linkDetailTranslation = {
    windowDate: t('windowDate'),
    windowQR: t('windowQR'),
    toastSuccess: t('toastSuccess'),
    toastLoading: t('toastLoading'),
    toastError: t('toastError'),
    toastTitleError: t('toastTitleError'),
    toastURLCopied: t('toastURLCopied')
  }
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
        <ViewerBlock>
          <div className="m-4 h-52 w-48">
            <QRGenerator
              toastMsg={t('toastQRCodeCopied')}
              toastError={t('toastQRError')}
            />
          </div>
        </ViewerBlock>
        <ViewerBlock>
          <div className="h-56 w-full md:w-56">
            <LinkStats />
          </div>
        </ViewerBlock>
        <ViewerBlock>
          <div className="relative m-4 flex h-48 w-full items-center justify-center md:w-48">
            <p className="absolute bottom-0 right-0 text-gray-400 dark:text-gray-500">
              Browsers
            </p>
            <BrowserDoughnutChart />
          </div>
        </ViewerBlock>
        <ViewerBlock>
          <div className="relative m-4 flex h-48 w-full items-center justify-center md:w-48">
            <p className="absolute bottom-0 right-0 text-gray-400 dark:text-gray-500">
              OS
            </p>
            <OsDoughnutChart />
          </div>
        </ViewerBlock>
        <ViewerBlock>
          <div className="relative m-4 flex h-48 w-full items-center justify-center md:w-48">
            <p className="absolute bottom-0 right-0 text-gray-400 dark:text-gray-500">
              Devices
            </p>
            <DeviceDoughnutChart />
          </div>
        </ViewerBlock>
        <ViewerBlock>
          <div className="relative m-4 h-48 w-full sm:w-96">
            <p className="absolute bottom-0 right-0 text-gray-400 dark:text-gray-500">
              Weeks Views
            </p>
            <ViewsLineChart />
          </div>
        </ViewerBlock>
      </div>
    </>
  )
}
