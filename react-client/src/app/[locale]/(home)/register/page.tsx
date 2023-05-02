import RegisterForm from '@/components/Pages/RegisterForm'
import { useTranslations } from 'next-intl'

export default function Page() {
  const t = useTranslations('register')
  const translation = {
    formTitle: t('formTitle'),
    haveAccountText: t('haveAccountText'),
    haveAccountLink: t('haveAccountLink'),
    emailInput: t('emailInput'),
    passwordInput: t('passwordInput'),
    confirmPasswordInput: t('confirmPasswordInput'),
    enterBtn: t('enterBtn')
  }
  return <RegisterForm translate={translation} />
}
