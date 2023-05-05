'use client'

import { createContext, ReactNode, useState } from 'react'

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
  const handleSetSelectedString = (search: string) => setSelectedString(search)
  return (
    <SearchContext.Provider
      value={{ searchString, setSearchString: handleSetSelectedString }}
    >
      {children}
    </SearchContext.Provider>
  )
}
