import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { linksApi } from '@/redux/linksApi'
import selectedLinkReducer from '@/redux/Slices/selectedLinkSlice'
import searchTextReducer from '@/redux/Slices/searchTextSlice'
import linkSortReducer from '@/redux/Slices/linksSortSlice'
import authTokenReducer from '@/redux/Slices/authTokenSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authToken']
}

const rootReducer = combineReducers({
  searchText: searchTextReducer,
  selectedLink: selectedLinkReducer,
  linksSort: linkSortReducer,
  authToken: authTokenReducer,
  [linksApi.reducerPath]: linksApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(linksApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// export const store = configureStore({
//   reducer: {
//     searchText: searchTextReducer,
//     selectedLink: selectedLinkReducer,
//     linksSort: linkSortReducer,
//     authToken: authTokenSlice,
//     [linksApi.reducerPath]: linksApi.reducer
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware().concat(linksApi.middleware)
// })
//
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
