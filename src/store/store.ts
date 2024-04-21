import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import AsyncStorage from "@react-native-async-storage/async-storage"
import userSlice from "./slices/user.slice"
import favouriteSlice from "./slices/favourite.slice"
import offlineSlice from "./slices/offline.slice"
import songSlice from "./slices/song.slice"
import childStateSlice from "./slices/childState.slice"
import parentStateSlice from "./slices/parentState.slice"
import currentTrackSlice from "./slices/currentTrack.slice"
import themeSlice from "./slices/theme.slice."
const persistConfig = {
  key: "testTuneify",
  storage: AsyncStorage,
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
})
const persistedReducer = persistReducer(persistConfig, RootReducer)
const store = configureStore({
  reducer: { persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
