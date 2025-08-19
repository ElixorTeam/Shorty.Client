import { ViewLinkPage } from '@/pages-flat/links/view'

export default async function Page({
  params,
}: {
  params: Promise<{ uid: string }>
}) {
  const { uid } = await params
  return <ViewLinkPage linkUid={uid} />
}
