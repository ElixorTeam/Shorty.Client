import { MainPage } from '@/pages-flat/main'

export default async function Page(
  props: Readonly<{ params: Promise<{ path: string }> }>
) {
  console.log('load page')
  const params = await props.params
  return <MainPage path={params.path} />
}
