'use client'

import { ReactNode } from 'react'

import useGetCurrentRecord from '@/entities/record/use-get-current-record'

export default function LinkSuspense({ children }: { children: ReactNode }) {
  const { data, isError } = useGetCurrentRecord()
  return data && !isError && children
}
