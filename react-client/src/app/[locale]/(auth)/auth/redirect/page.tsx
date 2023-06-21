'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next-intl/client'
import { useAppDispatch } from '@/redux/hooks'
import { setAuthToken } from '@/redux/Slices/authTokenSlice'

export default function Auth() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const jwt = searchParams.get('jwt')
  if (jwt) dispatch(setAuthToken(jwt))
  router.push('/links')
  return null
}
