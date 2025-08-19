'use client'

import { useRouter } from 'next/navigation'

import { DeleteLinkButton } from '@/features/link/delete'
import { ROUTES } from '@/shared/consts/routes'

export function DeleteLinkWrapper({ linkUid }: { linkUid: string }) {
  const router = useRouter()
  return (
    <DeleteLinkButton
      linkUid={linkUid}
      onSuccess={() => {
        router.push(ROUTES.LINKS)
      }}
    />
  )
}
