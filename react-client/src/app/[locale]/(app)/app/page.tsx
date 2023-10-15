import AppPage from '@/components/Pages/AppPage'

export default function Page({
  searchParams,
}: {
  searchParams: { [_: string]: string | string[] | undefined }
}) {
  return <AppPage searchParams={searchParams} />
}
