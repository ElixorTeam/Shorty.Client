import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { sortOptions, SortOptionsType } from '@/shared/SortKeyEnum'

type LinksSortState = {
  selectedSort: SortOptionsType
}

const initialState: LinksSortState = {
  selectedSort: sortOptions[1]
}

const linksSortSlice = createSlice({
  name: 'linksSort',
  initialState,
  reducers: {
    setLinksSort: (state, action: PayloadAction<SortOptionsType>) => {
      state.selectedSort = action.payload
    }
  }
})

export const { setLinksSort } = linksSortSlice.actions
export default linksSortSlice.reducer
