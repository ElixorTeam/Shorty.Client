import { useTranslations } from 'next-intl'
import CreateForm from '@/components/Forms/CreateForm'

export default function CreatePage() {
  const t = useTranslations('create')
  const translation = {
    urlLabel: t('urlLabel'),
    titleLabel: t('titleLabel'),
    pathLabel: t('pathLabel'),
    submitButton: t('submitButton'),
    labelOptional: t('labelOptional'),
    tooltipRefCount: t('tooltipRefCount'),
    tooltipRefSymbols: t('tooltipRefSymbols'),
    toastLoading: t('toastLoading'),
    toastError: t('toastError'),
    toastSuccess: t('toastSuccess'),
    toastURLRequiredError: t('toastURLRequiredError'),
    toastURLPatternError: t('toastURLPatternError'),
    toastRefPatternError: t('toastRefPatternError'),
    toastTitlePatternError: t('toastTitlePatternError'),
    errorInnerRefExists: t('errorInnerRefExists'),
    errorExternalRefNotValid: t('errorExternalRefNotValid'),
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center sm:pb-[64px] sm:pr-[50px] lg:pr-[200px]">
      <div className="w-[95%] max-w-lg rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#23212e] sm:p-10">
        <p className="mb-6 w-fit text-2xl font-bold dark:text-white">
          {t('formTitle')}
        </p>
        <CreateForm translate={translation} />
      </div>
    </div>
  )
}
