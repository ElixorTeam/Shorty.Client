import { ViewLinkPage } from '@/pages-flat/links/view'

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ uid: string }>
}>) {
  const { uid } = await params
  return <ViewLinkPage linkUid={uid} />
}
