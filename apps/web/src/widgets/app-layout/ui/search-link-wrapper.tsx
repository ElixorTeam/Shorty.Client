'use client'

import { useRouter } from 'next/navigation'

import { SearchLink } from '@/features/link/search'
import { ROUTES } from '@/shared/consts/routes'

export function SearchLinkWrapper() {
  const router = useRouter()

  return (
    <SearchLink
      onItemSelect={(item) => {
        router.push(ROUTES.LINK_DETAIL(item.uid))
      }}
    />
  )
}
