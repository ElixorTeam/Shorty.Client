import getRedirectByUrlPath from '../models/get-redirect-by-url-path'
import LinkView from './link-view'
import PasswordSuspense from './password-suspense'

export default async function Page({ path }: Readonly<{ path: string }>) {
  const record = await getRedirectByUrlPath(path)
  return (
    <PasswordSuspense passHash={record.password}>
      <LinkView record={record} />
    </PasswordSuspense>
  )
}
