import { configureStore } from '@reduxjs/toolkit'
import { linksApi } from '@/redux/linksApi'
import selectedLinkReducer from '@/redux/selectedLinkSlice'
import searchTextReducer from '@/redux/searchTextSlice'
import linkSortReducer from '@/redux/linksSortSlice'

export const index = configureStore({
  reducer: {
    searchText: searchTextReducer,
    selectedLink: selectedLinkReducer,
    linksSort: linkSortReducer,
    [linksApi.reducerPath]: linksApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(linksApi.middleware)
})

export type RootState = ReturnType<typeof index.getState>
export type AppDispatch = typeof index.dispatch
