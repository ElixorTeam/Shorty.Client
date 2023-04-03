import { useTranslations } from 'next-intl'
import AuthForm from '@/components/Auth/AuthForm'

export default function Auth() {
  const t = useTranslations('auth')
  const translation = {
    pinTitle: t('pinTitle'),
    pinDescription: t('pinDescription'),
    pinSubmit: t('pinSubmit')
  }
  return <AuthForm translate={translation} />
}
