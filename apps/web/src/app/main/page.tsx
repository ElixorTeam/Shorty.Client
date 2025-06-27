import MainPage from '@/pages-flat/main'

export default async function Page(
  props: {
    searchParams: Promise<{ [_: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const { linkUid } = searchParams
  const linkUidAsString: string = typeof linkUid === 'string' ? linkUid : ''
  return <MainPage linkUid={linkUidAsString} />
}
