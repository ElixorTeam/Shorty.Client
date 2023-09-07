import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SearchTextState = {
  text: string
}

const initialState: SearchTextState = {
  text: '',
}

const searchTextSlice = createSlice({
  name: 'searchText',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
  },
})

export const { setSearchText } = searchTextSlice.actions
export default searchTextSlice.reducer
