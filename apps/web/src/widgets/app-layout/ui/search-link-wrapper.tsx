'use client'

import { useSidebar } from '@repo/ui/sidebar'
import { useRouter } from 'next/navigation'

import { SearchLink } from '@/features/link/search'
import { ROUTES } from '@/shared/consts/routes'

export function SearchLinkWrapper() {
  const router = useRouter()
  const { setOpenMobile } = useSidebar()

  return (
    <SearchLink
      onItemSelect={(item) => {
        router.push(ROUTES.LINK_DETAIL(item.uid))
        setOpenMobile(false)
      }}
    />
  )
}
