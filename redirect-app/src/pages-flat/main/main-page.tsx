import { redirect } from 'next/navigation'

import { getRedirectByUrlPath } from '@/entities/redirect'

export default async function MainPage({ path }: { path: string }) {
  const record = await getRedirectByUrlPath(path)
  redirect(record.url)
}
