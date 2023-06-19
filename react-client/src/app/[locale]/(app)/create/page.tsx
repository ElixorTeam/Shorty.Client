import { useTranslations } from 'next-intl'
import CreatePage from '@/components/Pages/CreatePage'

export default function Create() {
  const t = useTranslations('create')
  const translation = {
    formTitle: t('formTitle'),
    urlLabel: t('urlLabel'),
    titleLabel: t('titleLabel'),
    pathLabel: t('pathLabel'),
    submitButton: t('submitButton'),
    labelOptional: t('labelOptional'),
    toastURLRequiredError: t('toastURLRequiredError'),
    toastURLPatternError: t('toastURLPatternError')
  }
  return <CreatePage translate={translation} />
}
