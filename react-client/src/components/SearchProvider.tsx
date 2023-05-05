'use client'

import { createContext, ReactNode, useMemo, useState } from 'react'

type SearchContextType = {
  searchString: string
  setSearchString: (searchString: string) => void
}

export const SearchContext = createContext<SearchContextType>({
  searchString: '',
  setSearchString: () => {}
})

export default function SearchProvider({ children }: { children: ReactNode }) {
  const [searchString, setSelectedString] = useState('')
  const value = useMemo(
    () => ({
      searchString,
      setSearchString: (search: string) => setSelectedString(search)
    }),
    [searchString]
  )
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  )
}
