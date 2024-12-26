import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import albumSlice from "./slices/album.slice"
import childStateSlice from "./slices/childState.slice"
import currentTrackSlice from "./slices/currentTrack.slice"
import favouriteSlice from "./slices/favourite.slice"
import homeSlice from "./slices/home.slice"
import songSliceNew from "./slices/new/song.slice"
import offlineSlice from "./slices/offline.slice"
import parentStateSlice from "./slices/parentState.slice"
import songSlice from "./slices/song.slice"
import themeSlice from "./slices/theme.slice."
import userSlice from "./slices/user.slice"
const persistConfig = {
  key: "@hainahola",
  version: 1,
  storage: AsyncStorage
}
const RootReducer = combineReducers({
  user: userSlice,
  favourite: favouriteSlice,
  offline: offlineSlice,
  storeSong: songSlice,
  childState: childStateSlice,
  parentState: parentStateSlice,
  currentTrack: currentTrackSlice,
  theme: themeSlice,

  // new
  home: homeSlice,
  album: albumSlice,
  geet: songSliceNew
})
const persistedReducer = persistReducer(persistConfig, RootReducer)
const store = configureStore({
  reducer: { persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
