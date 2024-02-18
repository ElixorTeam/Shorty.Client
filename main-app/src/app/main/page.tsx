import MainPage from '@/views/main'

export default function Page({
  searchParams,
}: {
  searchParams: { [_: string]: string | string[] | undefined }
}) {
  const { linkUid } = searchParams
  const linkUidAsString: string = typeof linkUid === 'string' ? linkUid : ''
  return <MainPage linkUid={linkUidAsString} />
}
