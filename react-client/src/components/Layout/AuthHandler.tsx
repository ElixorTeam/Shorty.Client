'use client'

import { useRouter } from 'next-intl/client'
import { useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function AuthHandler() {
  const router = useRouter()
  const token = useAppSelector(state => state.authToken.token)
  useEffect(() => {
    if (!token) {
      router.push('/')
      toast.error('You should be authorized')
    }
  }, [router, token])
  return null
}
