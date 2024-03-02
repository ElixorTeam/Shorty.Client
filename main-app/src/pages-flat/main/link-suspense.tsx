'use client'

import { ReactNode } from 'react'

import useGetCurrentRecord from '@/shared/api/use-get-current-record'

export default function LinkSuspense({ children }: { children: ReactNode }) {
  const { data, isError } = useGetCurrentRecord()
  return data && !isError && children
}
