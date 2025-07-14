import { redirect } from 'next/navigation'

import { getRedirectByUrlPath, RedirectTypesEnum } from '@/entities/redirect'
import GroupRecordView from '@/widgets/group-record-view'
import PasswordForm from '@/widgets/password-form'

export default async function MainPage({ path }: { path: string }) {
  const record = await getRedirectByUrlPath(path)

  if (record.urls.length == 0) return <h1>Error</h1>

  if (record.type === RedirectTypesEnum.SINGLE && !record.password)
    return redirect(record.urls.at(0) as string)

  if (record.type === RedirectTypesEnum.GROUP && !record.password)
    return <GroupRecordView urls={record.urls} />

  if (record.password) return <PasswordForm redirect={record} />

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1>Redirecting</h1>
    </div>
  )
}
