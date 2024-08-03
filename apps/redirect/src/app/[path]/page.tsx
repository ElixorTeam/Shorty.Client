import MainPage from '@/pages-flat/main'

export default function Page({ params }: { params: { path: string } }) {
  return <MainPage path={params.path} />
}
