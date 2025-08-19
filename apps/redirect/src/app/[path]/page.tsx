import { MainPage } from '@/pages-flat/main'

export default async function Page(props: {
  params: Promise<{ path: string }>
}) {
  const params = await props.params
  return <MainPage path={params.path} />
}
