import { useTranslations } from 'next-intl'
import CreateForm from '@/components/Pages/CreateForm'

export default function Create() {
  const t = useTranslations('create')
  const translation = {
    formTitle: t('formTitle'),
    urlLabel: t('urlLabel'),
    urlErrorRequired: t('urlErrorRequired'),
    urlErrorPattern: t('urlErrorPattern'),
    titleLabel: t('titleLabel'),
    customLabel: t('customLabel'),
    customErrorPattern: t('customErrorPattern'),
    submitButton: t('submitButton'),
    labelOptional: t('labelOptional')
  }
  return <CreateForm translate={translation} />
}
