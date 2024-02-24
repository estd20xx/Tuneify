import {PayloadAction, createSlice} from "@reduxjs/toolkit"
import {RootState} from "../store"

export interface InitialCurrentTrackStateTypes {
  trackId: string
}
const initialState: InitialCurrentTrackStateTypes = {
  trackId: "",
}
const currentTrackSlice = createSlice({
  name: "cTrackdev",
  initialState,
  reducers: {
    addTrackId(
      state: InitialCurrentTrackStateTypes,
      actions: PayloadAction<string>,
    ) {
      state.trackId = actions.payload
    },
  },
})
export const {addTrackId} = currentTrackSlice.actions
export const tunifyCurrentTrack = (state: RootState) =>
  state.persistedReducer.currentTrack
export default currentTrackSlice.reducer
