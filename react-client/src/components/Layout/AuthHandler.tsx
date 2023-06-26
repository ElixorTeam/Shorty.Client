'use client'

import { useRouter } from 'next-intl/client'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useCheckAuthStatusQuery } from '@/redux/Api/authApi'
import { setAuthToken } from '@/redux/Slices/authTokenSlice'

export default function AuthHandler() {
  const router = useRouter()
  const token = useAppSelector(state => state.authToken.token)
  const dispatch = useAppDispatch()
  const { isSuccess, isLoading } = useCheckAuthStatusQuery()
  useEffect(() => {
    if (!token || (!isLoading && !isSuccess)) {
      router.push('/')
      dispatch(setAuthToken(''))
      toast.error('Authorization error', { id: 'authError' })
    }
  }, [token, isLoading, isSuccess, dispatch])
  return null
}
