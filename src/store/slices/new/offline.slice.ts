import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Image } from "react-native"
import { InitialLocalState, LocalFileTypes } from "../../../Interfaces/tuneifySlice.interface"
import tempImage from "../../../assets/images/new.png"
import { RootState } from "../../store"
const localImage = Image.resolveAssetSource(tempImage).uri

const initialState: InitialLocalState = {
  LocalSong: [],
  isUploading: false,
  isAccepted: false
}
const offlineSong = createSlice({
  name: "offlineSongDev",
  initialState,
  reducers: {
    addLocalFiles(state: InitialLocalState, actions: PayloadAction<LocalFileTypes[]>) {
      state.isUploading = true
      state.LocalSong = [
        ...actions.payload.map((cx) => {
          return {
            title: cx.title,
            album: cx.album,
            artist: cx.artist,
            cover: cx.cover ? cx.cover : localImage,
            duration: cx.duration,
            url: cx.url
          }
        })
      ]
      state.isUploading = false
    },
    accepted(state: InitialLocalState, actions: PayloadAction<boolean>) {
      state.isAccepted = actions.payload
    }
  }
})
export const { addLocalFiles, accepted } = offlineSong.actions
export const tuneifyOfflines = (state: RootState) => state.persistedReducer.offline
export default offlineSong.reducer
