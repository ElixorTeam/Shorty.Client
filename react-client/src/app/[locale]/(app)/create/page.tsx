import { useTranslations } from 'next-intl'
import CreateForm from '@/components/Pages/CreateForm'

export default function Create() {
  const t = useTranslations('create')
  const translation = {
    formTitle: t('formTitle'),
    urlLabel: t('urlLabel'),
    titleLabel: t('titleLabel'),
    submitButton: t('submitButton'),
    labelOptional: t('labelOptional'),
    toastURLRequiredError: t('toastURLRequiredError'),
    toastURLPatternError: t('toastURLPatternError')
  }
  return <CreateForm translate={translation} />
}
