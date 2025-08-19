'use client'

import React, { useState } from 'react'

import { PasswordForm } from './password-form'

export function PasswordSuspense({
  children,
  passHash,
}: {
  children: React.ReactNode | undefined
  passHash: string | null
}) {
  const [isCompleted, setIsCompleted] = useState(false)
  if (!passHash || isCompleted) return <>{children}</>
  return (
    <PasswordForm
      passHash={passHash}
      onSuccess={() => {
        setIsCompleted(true)
      }}
    />
  )
}
