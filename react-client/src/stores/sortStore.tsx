import { create } from 'zustand'

import { SortKeyEnum } from '@/shared/SortKeyEnum'

type SortState = {
  sortKey: SortKeyEnum
  setSortKey: (key: SortKeyEnum) => void
}

const useSortStore = create<SortState>((set) => ({
  sortKey: SortKeyEnum.Name,
  setSortKey: (key) => set({ sortKey: key }),
}))

export default useSortStore
