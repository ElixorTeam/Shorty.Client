import LinksApp from '@/components/Pages/LinksApp'
import { useTranslations } from 'next-intl'

export default function Links() {
  const t = useTranslations('app')
  const translation = {
    windowTitle: t('windowTitle'),
    windowDate: t('windowDate'),
    windowQR: t('windowQR'),
    sortKeyName: t('sortKeyName'),
    sortKeyDate: t('sortKeyDate'),
    linkSearch: t('linkSearch')
  }
  return <LinksApp translate={translation} />
}
