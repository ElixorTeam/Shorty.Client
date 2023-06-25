import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { linksApi } from '@/redux/linksApi'
import selectedLinkReducer from '@/redux/Slices/selectedLinkSlice'
import searchTextReducer from '@/redux/Slices/searchTextSlice'
import linkSortReducer from '@/redux/Slices/linksSortSlice'
import authTokenReducer from '@/redux/Slices/authTokenSlice'
import { persistStore, persistReducer } from 'reduxjs-toolkit-persist'
import storage from 'reduxjs-toolkit-persist/lib/storage'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'reduxjs-toolkit-persist/es/constants'
import { authApi } from '@/redux/authApi'

const nonSerializableActionTypes = [
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
]

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
  [linksApi.reducerPath]: linksApi.reducer,
  [authApi.reducerPath]: authApi.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: nonSerializableActionTypes
      }
    })
      .concat(linksApi.middleware)
      .concat(authApi.middleware)
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
