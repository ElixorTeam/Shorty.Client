import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithAuth from '@/redux/baseQueryWithAuth'

type CheckStatusType = {
  user: string
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    checkAuthStatus: builder.query<CheckStatusType, void>({
      query: () => 'auth/status',
    }),
  }),
})

export const { useCheckAuthStatusQuery } = authApi
