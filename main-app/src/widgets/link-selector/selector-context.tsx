'use client'

import { createContext, useState, useContext, ReactNode } from 'react'

import { SortKey, SortKeyType } from '@/widgets/link-selector/sort-key-enum'

const useLinkSelectorStore = () => {
  const [searchingString, setSearchingString] = useState<string>('')
  const [sortKey, setSortKey] = useState<SortKeyType>(SortKey.NAME)

  return {
    searchingString,
    setSearchingString,
    sortKey,
    setSortKey,
  }
}

const LinkSelectorContext = createContext<ReturnType<
  typeof useLinkSelectorStore
> | null>(null)

export const useSearchingString = () => {
  const context = useContext(LinkSelectorContext)
  if (!context)
    throw new Error(
      'useSearchingString must be used within a LinkSelectorContextProvider'
    )
  return {
    searchingString: context.searchingString,
    setSearchingString: context.setSearchingString,
  }
}

export const useSortKey = () => {
  const context = useContext(LinkSelectorContext)
  if (!context)
    throw new Error(
      'useSortKey must be used within a LinkSelectorContextProvider'
    )
  return {
    sortKey: context.sortKey,
    setSortKey: context.setSortKey,
  }
}

export function LinkSelectorContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const store = useLinkSelectorStore()

  return (
    <LinkSelectorContext.Provider value={store}>
      {children}
    </LinkSelectorContext.Provider>
  )
}
