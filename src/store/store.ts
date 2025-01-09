import AsyncStorage from "@react-native-async-storage/async-storage"
import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import albumSlice from "./slices/new/album.slice"
import childStateSlice from "./slices/new/childState.slice"
import favouriteSlice from "./slices/new/favourite.slice"
import homeSlice from "./slices/new/home.slice"
import offlineSlice from "./slices/new/offline.slice"
import playlistDetailsSlice from "./slices/new/playlistDetails.slice"
import PlayerQueue from "./slices/new/Queue.slice"
import searchedSongsSlice from "./slices/new/searchedSong.slice"
import songSliceNew from "./slices/new/song.slice"
import userSlice from "./slices/user.slice"
const persistConfig = {
  key: "@hainaholaaa",
  version: 1,
  storage: AsyncStorage,
  whitelist: ["home", "offline", "playerQueue", "geet", "favourite", "user"]
}
const RootReducer = combineReducers({
  user: userSlice,
  childState: childStateSlice,
  // new
  home: homeSlice,
  album: albumSlice,
  playlist: playlistDetailsSlice,
  geet: songSliceNew,
  searchedSong: searchedSongsSlice,
  playerQueue: PlayerQueue,
  offline: offlineSlice,
  favourite: favouriteSlice
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
