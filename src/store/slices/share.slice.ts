import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"
import { ChildPlaylistInterface } from "./offlinePlaylist.slice"
const initialState: ChildPlaylistInterface = {
  name: "",
  songs: []
}
const shareSlice = createSlice({
  name: "@share",
  initialState,
  reducers: {
    sharePlaylist(
      state: ChildPlaylistInterface,
      actions: PayloadAction<ChildPlaylistInterface>
    ) {
      Object.assign(state, actions.payload)
    }
  }
})
export const { sharePlaylist } = shareSlice.actions
export const sharedPlaylist = (state: RootState) => state.persistedReducer.share
export default shareSlice.reducer
