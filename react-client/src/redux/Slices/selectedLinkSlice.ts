import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { LinkRecordType } from '@/shared/LinkRecordType'

type SelectedLinkState = {
  selected: LinkRecordType | null
}

const initialState: SelectedLinkState = {
  selected: null,
}

const selectedLinkSlice = createSlice({
  name: 'selectedLink',
  initialState,
  reducers: {
    setSelectedLink: (state, action: PayloadAction<LinkRecordType>) => {
      state.selected = action.payload
    },
    clearSelectedLink: (state) => {
      state.selected = null
    },
  },
})

export const { setSelectedLink, clearSelectedLink } = selectedLinkSlice.actions
export default selectedLinkSlice.reducer
