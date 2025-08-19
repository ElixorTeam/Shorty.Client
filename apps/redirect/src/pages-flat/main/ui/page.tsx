import getRedirectByUrlPath from '../api/get-redirect-by-url-path'
import { LinkView } from './link-view'
import { PasswordSuspense } from './password-suspense'

export async function MainPage({ path }: { path: string }) {
  const record = await getRedirectByUrlPath(path)
  return (
    <PasswordSuspense passHash={record.password}>
      <LinkView record={record} />
    </PasswordSuspense>
  )
}
