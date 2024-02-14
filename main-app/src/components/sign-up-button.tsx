'use client'

import { signIn } from 'next-auth/react'

import { Button } from '@/components/ui/button'

export default function SignUpButton() {
  return (
    <Button variant="outline" onClick={() => signIn('keycloak')}>
      <span className="uppercase">Sign up</span>
    </Button>
  )
}
