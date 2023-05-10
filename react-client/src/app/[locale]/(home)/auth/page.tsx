import { useTranslations } from 'next-intl'
import AuthForm from '@/components/Pages/AuthForm'

export default function Auth() {
  const t = useTranslations('auth')
  const translation = {
    formTitle: t('formTitle'),
    noAccountText: t('noAccountText'),
    noAccountLink: t('noAccountLink'),
    emailInput: t('emailInput'),
    passwordInput: t('passwordInput'),
    enterBtn: t('enterBtn'),
    additionalEnter: t('additionalEnter'),
    toastEmailPatternError: t('toastEmailPatternError'),
    toastEmailRequiredError: t('toastEmailRequiredError'),
    toastPasswordPatternError: t('toastPasswordPatternError'),
    toastPasswordRequiredError: t('toastPasswordRequiredError')
  }
  return <AuthForm translate={translation} />
}
