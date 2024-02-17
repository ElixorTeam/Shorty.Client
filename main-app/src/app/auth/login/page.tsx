'use client'

import { signIn } from 'next-auth/react'
import { useEffect } from 'react'

export default function Page() {
  useEffect(() => {
    const signInAsync = async () => {
      try {
        await signIn('keycloak')
      } catch {
        // pass error
      }
    }
    signInAsync().then()
  }, [])

  return null
}
