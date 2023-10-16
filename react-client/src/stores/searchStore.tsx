import { create } from 'zustand'

type SearchState = {
  searchString: string
  setSearchString: (name: string) => void
}

const useSearchStore = create<SearchState>((set) => ({
  searchString: '',
  setSearchString: (name) => set({ searchString: name }),
}))

export default useSearchStore
