import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { API_URL } from '@/shared/urls'
import type { RootState } from '@/redux/store'

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).authToken
    if (token) headers.set('authorization', `Bearer ${token}`)
    return headers
  },
})

export default baseQueryWithAuth
