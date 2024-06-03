import { redirect } from 'next/navigation'

import { RedirectTypesEnum, getRedirectByUrlPath } from '@/entities/redirect'
import GroupRecordView from '@/widgets/group-record-view'
import PasswordForm from '@/widgets/password-form'

export default async function MainPage({ path }: { path: string }) {
  const record = await getRedirectByUrlPath(path)

  if (record.type === RedirectTypesEnum.SINGLE && !record.password)
    return redirect(record.urls[0])

  if (record.type === RedirectTypesEnum.GROUP && !record.password)
    return <GroupRecordView urls={record.urls} />

  if (record.password) return <PasswordForm redirect={record} />

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1>Redirecting</h1>
    </div>
  )
}
