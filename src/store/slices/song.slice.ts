import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SearchedSongs } from "../../api/service/Payload.service"
import { songServiceaction } from "../actions/song.action"
import { RootState } from "../store"
interface InitialWala {
  data: SearchedSongs | null
  isLoading: boolean
  isError: boolean
}
const initialState: InitialWala = {
  data: null,
  isLoading: false,
  isError: false
}
const songSliceNew = createSlice({
  name: "@song",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(songServiceaction.getSongs.pending, (state: InitialWala) => {
        state.isError = false
        state.isLoading = true
      })
      .addCase(
        songServiceaction.getSongs.fulfilled,
        (state: InitialWala, action: PayloadAction<SearchedSongs>) => {
          state.data = action.payload
          state.isLoading = false
        }
      )
      .addCase(
        songServiceaction.getSongs.rejected,
        (state: InitialWala, actions: PayloadAction<any>) => {
          state.isError = true
          state.isLoading = false
        }
      )
  }
})
export const testSong = (state: RootState) => state.persistedReducer.geet
export default songSliceNew.reducer
