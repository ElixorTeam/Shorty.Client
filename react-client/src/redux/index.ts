import { configureStore } from '@reduxjs/toolkit'
import { linksApi } from '@/redux/linksFetch'
import selectedLinkReducer from '@/redux/selectedLinkSlice'

export const index = configureStore({
  reducer: {
    selectedLink: selectedLinkReducer,
    [linksApi.reducerPath]: linksApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(linksApi.middleware)
})

export type RootState = ReturnType<typeof index.getState>
export type AppDispatch = typeof index.dispatch
