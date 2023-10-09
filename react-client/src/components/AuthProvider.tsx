'use client'

import { ReactNode } from 'react'

export default function AuthProvider({ children }: { children: ReactNode }) {
  // const router = useRouter()
  // const token = useAppSelector((state) => state.authToken.token)
  // const dispatch = useAppDispatch()
  // const { error } = useCheckAuthStatusQuery()
  // useEffect(() => {
  //   if (!token || (error && (error as FetchBaseQueryError).status === 401)) {
  //     // router.push('/')
  //     dispatch(setAuthToken(''))
  //     toast.error('Authorization error', { id: 'authError' })
  //   }
  // }, [token, error, dispatch, router])
  return children
}
