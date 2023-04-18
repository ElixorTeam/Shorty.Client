'use client'
import { useGetLinkByRef } from '@/shared/fetcher'
import { useRouter } from 'next-intl/client'

export default function Page({ params }: { params: { ref: string } }) {
  const ref = params.ref
  const pattern: RegExp = /^[a-zA-Z0-9]{5}$/
  const { data, error, isLoading } = useGetLinkByRef(ref)
  const router = useRouter()
  if (!pattern.test(ref)) return 'Broken ref'
  if (data) location.assign(data.ref)
  return ''
}
