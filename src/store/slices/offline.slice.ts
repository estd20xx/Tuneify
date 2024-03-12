import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {
  InitialLocalState,
  LocalFileTypes,
} from "../../Interfaces/tuneifySlice.interface"
import {RootState} from "../store"
import localI from "../../assets/images/new.png"
import {Image} from "react-native"
const localImage = Image.resolveAssetSource(localI).uri

const initialState: InitialLocalState = {
  LocalSong: [],
  isUploaded: false,
}
const offlineSong = createSlice({
  name: "offlineSongDev",
  initialState,
  reducers: {
    addLocalFiles(
      state: InitialLocalState,
      actions: PayloadAction<LocalFileTypes[]>
    ) {
      const data = actions.payload.map(cx => {
        const t: LocalFileTypes = {
          title: cx.title,
          album: cx.album,
          artist: cx.artist,
          cover: cx.cover ? cx.cover : localImage,
          duration: cx.duration,
          url: cx.url,
        }
        return t
      })
      state.LocalSong = [...data]
    },
    checkLocal(state: InitialLocalState, actions: PayloadAction<boolean>) {
      state.isUploaded = actions.payload
    },
  },
})
export const {addLocalFiles, checkLocal} = offlineSong.actions
export const tuneifyOfflines = (state: RootState) =>
  state.persistedReducer.offline
export default offlineSong.reducer
