import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { persistReducer, persistStore } from "redux-persist"
import albumSlice from "./slices/album.slice"
import audioBookSlice from "./slices/audioBook.slice"
import audioBookDetailsWithChapter from "./slices/audioBookDetails.slice"
import bottomSlice from "./slices/bottomPlayer.slice"
import childStateSlice from "./slices/childState.slice"
import favouriteSlice from "./slices/favourite.slice"
import lyricsSlice from "./slices/lyrics.slice"
import offlineSlice from "./slices/offline.slice"
import offlinePlaylist from "./slices/offlinePlaylist.slice"
import PlayerQueue from "./slices/Queue.slice"
import searchDynamics from "./slices/searchDynamic.slice"
import searchedSongsSlice from "./slices/searchedSong.slice"
import shareSlice from "./slices/share.slice"
import songSliceNew from "./slices/song.slice"
import userSlice from "./slices/user.slice"
import { reduxStorage } from "./storage.store"
const persistConfig = {
  key: "@ap",
  version: 1,
  storage: reduxStorage,
  blacklist: [
    "childState",
    "album",
    "searchedSong",
    "lyrics",
    "dynamic",
    "share",
    "audioBookDetailsWithChapter"
  ],
  whitelist: [
    "offline",
    "playerQueue",
    "geet",
    "favourite",
    "user",
    "customePlaylist",
    "audioBook",
    "bottomPlayer"
  ]
}
const RootReducer = combineReducers({
  user: userSlice,
  childState: childStateSlice,
  album: albumSlice,
  geet: songSliceNew,
  searchedSong: searchedSongsSlice,
  playerQueue: PlayerQueue,
  offline: offlineSlice,
  favourite: favouriteSlice,
  customePlaylist: offlinePlaylist,
  lyrics: lyricsSlice,
  dynamic: searchDynamics,
  share: shareSlice,
  audioBook: audioBookSlice,
  audioBookDetailsWithChapter: audioBookDetailsWithChapter,
  bottomPlayer: bottomSlice
})
const persistedReducer = persistReducer(persistConfig, RootReducer)
const store = configureStore({
  reducer: { persistedReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      ignoredPaths: [""],
      serializableCheck: false
    })
})
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
