import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '@/shared/urls'
import type { RootState } from '@/redux/store'

type CheckStatusType = {
  user: string
}

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).authToken
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  }
})

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithAuth,
  endpoints: builder => ({
    checkAuthStatus: builder.query<CheckStatusType, void>({
      query: () => 'auth/status'
    })
  })
})

export const { useCheckAuthStatusQuery } = authApi
