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
    linkSearch: t('linkSearch'),
    toastLinkDelError: t('toastLinkDelError'),
    toastLinkDelSuccess: t('toastLinkDelSuccess'),
    toastLinkEditError: t('toastLinkEditError'),
    toastLinkEditSuccess: t('toastLinkEditSuccess'),
    toastQRCodeCopied: t('toastQRCodeCopied'),
    toastURLCopied: t('toastURLCopied')
  }
  return <LinksApp translate={translation} />
}
