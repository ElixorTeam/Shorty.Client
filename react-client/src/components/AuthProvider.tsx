'use client'

import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { useRouter } from 'next-intl/client'
import { ReactNode, useEffect } from 'react'
import toast from 'react-hot-toast'

import { useCheckAuthStatusQuery } from '@/redux/Api/authApi'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setAuthToken } from '@/redux/Slices/authTokenSlice'

export default function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const token = useAppSelector((state) => state.authToken.token)
  const dispatch = useAppDispatch()
  const { error } = useCheckAuthStatusQuery()
  useEffect(() => {
    if (!token || (error && (error as FetchBaseQueryError).status === 401)) {
      router.push('/')
      dispatch(setAuthToken(''))
      toast.error('Authorization error', { id: 'authError' })
    }
  }, [token, error, dispatch, router])
  return children
}
