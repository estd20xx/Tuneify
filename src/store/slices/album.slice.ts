import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { AlbumDetailsResponse } from "../../api/interface/album.interface"
import { album } from "../actions/album.action"
import { RootState } from "../store"

interface InitialAlbumSongsInterface {
  data: AlbumDetailsResponse | null
  isLoading: boolean
  isError: boolean
}
const initialState: InitialAlbumSongsInterface = {
  data: null,
  isLoading: false,
  isError: false,
}
const albumSlice = createSlice({
  name: "@album",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        album.getAlbumSongs.pending,
        (state: InitialAlbumSongsInterface) => {
          state.isLoading = true
        }
      )
      .addCase(
        album.getAlbumSongs.fulfilled,
        (
          state: InitialAlbumSongsInterface,
          action: PayloadAction<AlbumDetailsResponse>
        ) => {
          state.data = action.payload
          state.isLoading = false
        }
      )
      .addCase(
        album.getAlbumSongs.rejected,
        (state: InitialAlbumSongsInterface) => {
          state.isError = true
        }
      )
  },
})
export const albumData = (state: RootState) => state.persistedReducer.album
export default albumSlice.reducer
