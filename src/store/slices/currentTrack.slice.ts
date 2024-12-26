import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { InitialCurrentTrackStateTypes } from "../../Interfaces/tuneifySlice.interface"
import { RootState } from "../store"

const initialState: InitialCurrentTrackStateTypes = {
  trackId: "",
  index: null,
}
const currentTrackSlice = createSlice({
  name: "cTrackdev",
  initialState,
  reducers: {
    addTrackId(
      state: InitialCurrentTrackStateTypes,
      actions: PayloadAction<string>
    ) {
      state.trackId = actions.payload
    },
    addTrackIndex(
      state: InitialCurrentTrackStateTypes,
      actions: PayloadAction<number>
    ) {
      state.index = actions.payload
    },
  },
})
export const { addTrackId, addTrackIndex } = currentTrackSlice.actions
export const tunifyCurrentTrack = (state: RootState) =>
  state.persistedReducer.currentTrack
export default currentTrackSlice.reducer
