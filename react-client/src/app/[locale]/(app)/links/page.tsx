import LinksApp from '@/components/LinksApp'
import { useTranslations } from 'next-intl'

export default function Links() {
  const t = useTranslations('app')
  const translation = {
    windowTitle: t('windowTitle'),
    windowDate: t('windowDate'),
    windowQR: t('windowQR'),
    sortKeyViewed: t('sortKeyViewed'),
    sortKeyLast: t('sortKeyLast'),
    sortLabel: t('sortLabel')
  }
  return <LinksApp translate={translation} />
}
