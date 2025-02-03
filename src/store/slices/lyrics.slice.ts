import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit"
import { getSongsLyrics } from "../actions/lyrics.action"
import { RootState } from "../store"
interface LyricsResponse {
  lyrics: string
}
interface InitialLyricsInterface {
  data: LyricsResponse
  isLoading: boolean
  isError: boolean
}
const initialState: InitialLyricsInterface = {
  data: {
    lyrics: "We are working on it.! 💻"
  },
  isLoading: false,
  isError: false
}
const lyricsSlice = createSlice({
  name: "lyrics",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<InitialLyricsInterface>) => {
    builder
      .addCase(getSongsLyrics.pending, (state: InitialLyricsInterface) => {
        state.isLoading = true
        state.isError = false
      })
      .addCase(
        getSongsLyrics.fulfilled,
        (
          state: InitialLyricsInterface,
          actions: PayloadAction<LyricsResponse>
        ) => {
          state.isLoading = false
          state.data.lyrics = actions.payload.lyrics
        }
      )
      .addCase(getSongsLyrics.rejected, (state: InitialLyricsInterface) => {
        state.isLoading = false
        state.isError = true
        state.data.lyrics = "We are working on it.! 💻"
      })
  }
})
export const {} = lyricsSlice.actions
export const storedLyrics = (state: RootState) => state.persistedReducer.lyrics
export default lyricsSlice.reducer
