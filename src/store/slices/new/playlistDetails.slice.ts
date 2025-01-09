import { ActionReducerMapBuilder, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { PlaylistResponseOnce } from "../../../api/interface/module.interface"
import { playlistDetails } from "../../actions/playlist.action"
import { RootState } from "../../store"
interface InitialPlayListDetails {
  data: PlaylistResponseOnce | null
  isLoading: boolean
  isError: boolean
}
const initialState: InitialPlayListDetails = {
  data: null,
  isLoading: false,
  isError: false
}
const playlistDetailsSlice = createSlice({
  name: "playlistDetails",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<InitialPlayListDetails>) => {
    builder
      .addCase(playlistDetails.getPlaylistsSongs.pending, (state: InitialPlayListDetails) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(
        playlistDetails.getPlaylistsSongs.fulfilled,
        (state: InitialPlayListDetails, actions: PayloadAction<PlaylistResponseOnce>) => {
          state.data = actions.payload
          state.isLoading = false
        }
      )
      .addCase(
        playlistDetails.getPlaylistsSongs.rejected,
        (state: InitialPlayListDetails, actions: PayloadAction<any>) => {
          state.isLoading = false
          state.isError = true
          state.data = null
        }
      )
  }
})
export const {} = playlistDetailsSlice.actions
export const playListDetailsStore = (state: RootState) => state.persistedReducer.playlist
export default playlistDetailsSlice.reducer
