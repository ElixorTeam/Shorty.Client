import LinksApp from '@/components/LinksApp'
import { getTranslations } from 'next-intl/server'
import { LinkRecordType } from '@/shared/LinkRecordType'

async function getData() {
  const res = await fetch('http://localhost:8082/linkshortener/links/')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export default async function Links() {
  const data = (await getData()) as LinkRecordType[]
  const t = await getTranslations('app')
  const translation = {
    windowTitle: t('windowTitle'),
    windowDate: t('windowDate'),
    windowQR: t('windowQR'),
    sortKeyViewed: t('sortKeyViewed'),
    sortKeyLast: t('sortKeyLast'),
    sortLabel: t('sortLabel')
  }
  return <LinksApp linkData={data} translate={translation} />
}
