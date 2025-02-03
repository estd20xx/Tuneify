import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {
  InitialLocalState,
  StoreSongTypes
} from "../../Interfaces/tuneifySlice.interface"
import { RootState } from "../store"
const initialState: InitialLocalState = {
  LocalSong: [],
  isUploading: false,
  isAccepted: false
}
const offlineSong = createSlice({
  name: "offlineSongDev",
  initialState,
  reducers: {
    addLocalFiles(
      state: InitialLocalState,
      actions: PayloadAction<StoreSongTypes[]>
    ) {
      state.isUploading = true
      state.LocalSong = actions.payload
      state.isUploading = false
    },
    accepted(state: InitialLocalState, actions: PayloadAction<boolean>) {
      state.isAccepted = actions.payload
    }
  }
})
export const { addLocalFiles, accepted } = offlineSong.actions
export const tuneifyOfflines = (state: RootState) =>
  state.persistedReducer.offline
export default offlineSong.reducer
