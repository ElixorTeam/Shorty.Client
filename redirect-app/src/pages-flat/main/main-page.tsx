import { getRecordByUrlPath } from '@/entities/record'

export default async function MainPage({ path }: { path: string }) {
  const record = await getRecordByUrlPath(path)
  return <h1>{record.url}</h1>
}
