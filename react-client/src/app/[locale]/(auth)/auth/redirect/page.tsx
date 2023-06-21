'use client'

import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next-intl/client'
import { useAppDispatch } from '@/redux/hooks'
import { setAuthToken } from '@/redux/Slices/authTokenSlice'
import { useEffect } from 'react'

export default function Auth() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const jwt = searchParams.get('jwt')
  useEffect(() => {
    if (jwt) dispatch(setAuthToken(jwt))
  }, [dispatch, jwt])
  router.push('/links')
  return <p>Auth</p>
}
