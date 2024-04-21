import { redirect } from 'next/navigation'

import { getRedirectByUrlPath } from '@/entities/redirect'
import PasswordForm from '@/widgets/password-form'

export default async function MainPage({ path }: { path: string }) {
  const record = await getRedirectByUrlPath(path)

  if (record.url && !record.password) return redirect(record.url)

  if (record.password) return <PasswordForm redirect={record} />

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1>Redirecting</h1>
    </div>
  )
}
